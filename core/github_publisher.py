from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
import unicodedata
from pathlib import Path
from typing import Callable


Progress = Callable[[str], None]
EXCLUDED_NAMES = {
    ".git", ".env", "business_data.json", "design_spec.json",
    "quality_report.json", "image_manifest.json", "generated-by.txt",
    "screenshots", "__pycache__",
}
MAX_FILE_BYTES = 100 * 1024 * 1024
MAX_SITE_BYTES = 1_000 * 1024 * 1024


def _run(args: list[str], *, cwd: Path | None = None, input_text: str | None = None,
         timeout: int = 300) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        args, cwd=str(cwd) if cwd else None, input=input_text,
        capture_output=True, text=True, encoding="utf-8", errors="replace",
        timeout=timeout, check=False,
    )
    if result.returncode:
        detail = (result.stderr or result.stdout or "El comando terminó con error.").strip()
        raise RuntimeError(detail[-3500:])
    return result


def _repo_slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9-]+", "-", value.lower()).strip("-")
    value = re.sub(r"-+", "-", value)[:100].rstrip("-")
    if not value:
        raise ValueError("No pude obtener un nombre válido para el repositorio a partir del negocio.")
    return value


def _business_name(source: Path) -> str:
    metadata = source / "business_data.json"
    try:
        value = json.loads(metadata.read_text(encoding="utf-8")).get("name")
        if isinstance(value, str) and value.strip():
            return value.strip()
    except (OSError, ValueError, AttributeError):
        pass
    name = re.sub(r"-landing\d+-\d{8}-\d{6}-\d+.*$", "", source.name, flags=re.I)
    return name.replace("-", " ").strip() or source.name


def _excluded(name: str) -> bool:
    lowered = name.casefold()
    return (
        lowered in EXCLUDED_NAMES
        or lowered.startswith(".env.")
        or lowered.endswith((".pem", ".key", ".p12", ".pfx"))
        or lowered in {"id_rsa", "id_ed25519", "credentials.json", "secrets.json"}
    )


def _copy_public_site(source: Path, stage: Path, site_url: str) -> int:
    total = 0
    for current, dirs, files in os.walk(source, followlinks=False):
        here = Path(current)
        rel = here.relative_to(source)
        dirs[:] = [name for name in dirs if not _excluded(name) and not (here / name).is_symlink()]
        destination = stage / rel
        destination.mkdir(parents=True, exist_ok=True)
        for filename in files:
            source_file = here / filename
            if _excluded(filename) or source_file.is_symlink():
                continue
            size = source_file.stat().st_size
            if size > MAX_FILE_BYTES:
                raise ValueError(f"El archivo {source_file.name} supera el límite de 100 MB de GitHub.")
            total += size
            if total > MAX_SITE_BYTES:
                raise ValueError("El sitio supera el límite de 1 GB admitido por este publicador.")
            shutil.copy2(source_file, destination / filename)

    index = stage / "index.html"
    if not index.is_file():
        raise FileNotFoundError("La carpeta seleccionada debe tener index.html en la raíz.")
    html = index.read_text(encoding="utf-8")
    robots_tag = '<meta name="robots" content="index,follow,max-image-preview:large">'
    if re.search(r'<meta\s+name=["\']robots["\']', html, re.I):
        html = re.sub(r'<meta\s+name=["\']robots["\'][^>]*>', robots_tag, html, count=1, flags=re.I)
    else:
        html = html.replace("</head>", robots_tag + "</head>", 1)
    canonical_tag = f'<link rel="canonical" href="{site_url}/">'
    if re.search(r'<link\s+rel=["\']canonical["\']', html, re.I):
        html = re.sub(r'<link\s+rel=["\']canonical["\'][^>]*>', canonical_tag, html, count=1, flags=re.I)
    else:
        html = html.replace("</head>", canonical_tag + "</head>", 1)
    og_tag = f'<meta property="og:url" content="{site_url}/">'
    if re.search(r'<meta\s+property=["\']og:url["\']', html, re.I):
        html = re.sub(r'<meta\s+property=["\']og:url["\'][^>]*>', og_tag, html, count=1, flags=re.I)
    else:
        html = html.replace("</head>", og_tag + "</head>", 1)
    index.write_text(html, encoding="utf-8")
    (stage / ".nojekyll").write_text("", encoding="utf-8")
    (stage / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {site_url}/sitemap.xml\n", encoding="utf-8"
    )
    (stage / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"<url><loc>{site_url}/</loc></url></urlset>\n",
        encoding="utf-8",
    )
    return total


def _available_repo(gh: str, owner: str, base: str) -> tuple[str, int]:
    for suffix in range(1, 100):
        name = base if suffix == 1 else f"{base}-{suffix}"
        check = subprocess.run(
            [gh, "api", f"repos/{owner}/{name}"], capture_output=True,
            text=True, encoding="utf-8", errors="replace", timeout=45,
        )
        if check.returncode == 0:
            continue
        diagnostic = (check.stderr or check.stdout or "").casefold()
        if "404" in diagnostic or "not found" in diagnostic:
            return name, suffix
        raise RuntimeError(f"No pude comprobar si existe el repositorio {owner}/{name}: {diagnostic[-1200:]}")
    raise RuntimeError("Ya existen demasiados repositorios con este nombre. No se creó ni sobrescribió ninguno.")


def _ensure_github_auth(gh: str, report: Progress) -> None:
    auth = subprocess.run([gh, "auth", "status"], capture_output=True, text=True,
                          encoding="utf-8", errors="replace", timeout=30)
    if auth.returncode == 0:
        return

    report("Se abrirá GitHub en el navegador para autorizar la publicación. Completa los pasos en la consola que aparecerá…")
    flags = getattr(subprocess, "CREATE_NEW_CONSOLE", 0)
    try:
        login = subprocess.Popen([
            gh, "auth", "login", "--web", "--hostname", "github.com", "--git-protocol", "https",
        ], creationflags=flags)
        login.wait(timeout=600)
    except subprocess.TimeoutExpired as exc:
        login.terminate()
        raise RuntimeError("La autorización de GitHub superó los 10 minutos. Vuelve a pulsar «Subir página web» para intentarlo otra vez.") from exc
    except OSError as exc:
        raise RuntimeError(f"No pude abrir la consola de autorización de GitHub: {exc}") from exc

    auth = subprocess.run([gh, "auth", "status"], capture_output=True, text=True,
                          encoding="utf-8", errors="replace", timeout=30)
    if auth.returncode:
        raise RuntimeError("No se completó la autorización. Vuelve a pulsar «Subir página web» y termina el inicio de sesión en la consola de GitHub.")


def publish_site_folder(source_folder: str | Path, progress: Progress | None = None) -> dict[str, str | bool]:
    """Publish a generated static site to a new public repo and enable Pages."""
    report = progress or (lambda _message: None)
    source = Path(source_folder).expanduser().resolve()
    if not source.is_dir():
        raise FileNotFoundError("No se encontró la carpeta seleccionada.")
    if not (source / "index.html").is_file():
        raise FileNotFoundError("Selecciona una carpeta de salida que contenga index.html en la raíz.")

    gh = shutil.which("gh")
    if not gh:
        raise RuntimeError(
            "No se encontró GitHub CLI (gh). Instálalo desde https://cli.github.com/ y vuelve a abrir el generador."
        )
    if not shutil.which("git"):
        raise RuntimeError("No se encontró Git. Instala Git for Windows y vuelve a abrir el generador.")
    _ensure_github_auth(gh, report)
    owner = _run([gh, "api", "user", "--jq", ".login"], timeout=30).stdout.strip()
    user_data = json.loads(_run([gh, "api", "user"], timeout=30).stdout)
    if not owner:
        raise RuntimeError("GitHub no devolvió el nombre de la cuenta autenticada.")

    business = _business_name(source)
    base = _repo_slug(business)
    repo, suffix = _available_repo(gh, owner, base)
    site_url = f"https://{owner}.github.io/{repo}"
    repo_url = f"https://github.com/{owner}/{repo}"
    report(f"Preparando el sitio público {owner}/{repo}…")

    with tempfile.TemporaryDirectory(prefix="landing-pages-publish-") as temporary:
        stage = Path(temporary) / "site"
        stage.mkdir()
        file_bytes = _copy_public_site(source, stage, site_url)
        report(f"Preparando rama main ({file_bytes / (1024 * 1024):.1f} MB de archivos del sitio)…")
        init = subprocess.run(["git", "init", str(stage)], capture_output=True, text=True, timeout=45)
        if init.returncode:
            raise RuntimeError("No se encontró Git o no se pudo inicializar el repositorio local. Instala Git for Windows.")
        _run(["git", "-C", str(stage), "checkout", "-B", "main"], timeout=45)
        _run(["git", "-C", str(stage), "add", "--all"], timeout=60)
        login_id = str(user_data.get("id", ""))
        author_email = f"{login_id}+{owner}@users.noreply.github.com" if login_id else "noreply@github.com"
        _run([
            "git", "-C", str(stage), "-c", "user.name=Landing Generator",
            "-c", f"user.email={author_email}", "commit", "-m", "Publish generated business website",
        ], timeout=120)

        report("Creando el repositorio público y subiendo los archivos a main…")
        description = f"Sitio web de {business}"[:350]
        try:
            _run([gh, "repo", "create", f"{owner}/{repo}", "--public", "--description", description,
                  "--source", str(stage), "--remote", "origin", "--push"], timeout=600)
        except Exception as exc:
            raise RuntimeError(f"No se pudo crear el repositorio o subir la rama main: {exc}") from exc

        _run([gh, "repo", "edit", f"{owner}/{repo}", "--default-branch", "main"], timeout=60)

        report("Configurando GitHub Pages desde main / (raíz)…")
        pages_endpoint = f"repos/{owner}/{repo}/pages"
        try:
            _run([gh, "api", "--method", "POST", pages_endpoint,
                  "-f", "source[branch]=main", "-f", "source[path]=/"], timeout=90)
        except Exception as exc:
            raise RuntimeError(
                f"El repositorio y los archivos ya se subieron: {repo_url}. "
                f"No pude activar Pages automáticamente. Revisa {repo_url}/settings/pages y selecciona main / (root). "
                f"Detalle: {exc}"
            ) from exc

        ready = False
        build_status = "building"
        for attempt in range(18):
            report("GitHub Pages está publicando el sitio…")
            status = subprocess.run([gh, "api", pages_endpoint, "--jq", ".status"], capture_output=True,
                                    text=True, encoding="utf-8", errors="replace", timeout=30)
            if status.returncode == 0:
                build_status = status.stdout.strip().strip('"') or "building"
                if build_status == "built":
                    ready = True
                    break
                if build_status == "errored":
                    break
            if attempt < 17:
                import time
                time.sleep(5)

    return {
        "owner": owner, "repo": repo, "business": business,
        "repo_url": repo_url, "site_url": site_url,
        "ready": ready, "build_status": build_status, "renamed": suffix > 1,
    }
