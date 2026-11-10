from __future__ import annotations

import os
import subprocess
import tempfile
import zipfile
from pathlib import Path, PurePosixPath
from urllib.request import Request, urlopen


REPOSITORY = "sebastianbocek/ai-landing-page-generator-google-maps"
ARCHIVE_URL = f"https://github.com/{REPOSITORY}/archive/refs/heads/main.zip"
PRESERVED_TOP_LEVEL = {".git", ".venv", "venv", "salida", "usage", "__pycache__", ".codex-gsap-tmp"}
PRESERVED_FILES = {".env"}


def update_project(root: Path) -> tuple[int, int]:
    """Install the latest public main-branch files, preserving user output/config.

    Returns (updated file count, locally modified tracked files skipped).
    """
    root = root.resolve()
    with tempfile.TemporaryDirectory(prefix="landing-generator-update-") as temp_name:
        temp = Path(temp_name)
        archive = temp / "project.zip"
        request = Request(ARCHIVE_URL, headers={"User-Agent": "LandingGenerator-Updater"})
        with urlopen(request, timeout=90) as response, archive.open("wb") as destination:
            while True:
                chunk = response.read(1024 * 1024)
                if not chunk:
                    break
                destination.write(chunk)

        with zipfile.ZipFile(archive) as bundle:
            members = [name for name in bundle.namelist() if name and not name.endswith("/")]
            if not members:
                raise ValueError("GitHub devolvió un archivo vacío.")
            prefix = members[0].split("/", 1)[0] + "/"
            staged = temp / "staged"
            staged.mkdir()
            for member in members:
                if not member.startswith(prefix):
                    continue
                relative = PurePosixPath(member[len(prefix):])
                if not relative.parts or relative.parts[0] in PRESERVED_TOP_LEVEL or relative.name in PRESERVED_FILES:
                    continue
                if any(part in {"..", "."} for part in relative.parts):
                    continue
                destination = staged.joinpath(*relative.parts)
                destination.parent.mkdir(parents=True, exist_ok=True)
                with bundle.open(member) as source, destination.open("wb") as target:
                    target.write(source.read())

        modified = _locally_modified_files(root)
        updated = 0
        for source in staged.rglob("*"):
            if not source.is_file():
                continue
            relative = source.relative_to(staged)
            if relative.as_posix() in modified:
                continue
            target = root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            replacement = target.with_name(target.name + ".update-tmp")
            replacement.write_bytes(source.read_bytes())
            os.replace(replacement, target)
            updated += 1
        return updated, len(modified)


def _locally_modified_files(root: Path) -> set[str]:
    if not (root / ".git").exists():
        return set()
    try:
        result = subprocess.run(
            ["git", "-C", str(root), "status", "--porcelain", "--untracked-files=no"],
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
    except (OSError, subprocess.SubprocessError):
        return set()
    if result.returncode:
        return set()
    paths = set()
    for line in result.stdout.splitlines():
        item = line[3:].strip()
        if " -> " in item:
            item = item.split(" -> ", 1)[1]
        if item:
            paths.add(item.replace("\\", "/"))
    return paths
