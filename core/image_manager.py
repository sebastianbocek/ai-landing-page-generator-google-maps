from __future__ import annotations

import io
import json
import re
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from PIL import Image

ALLOWED_IMAGE_HOSTS = ("googleusercontent.com", "ggpht.com", "googleapis.com")
MAX_IMAGE_BYTES = 8 * 1024 * 1024
MAX_PIXELS = 24_000_000


def download_listing_photos(data: dict, output_dir: Path, limit: int = 5) -> list[str]:
    files, manifest = [], []
    for index, source in enumerate(data.get("photos", [])[:limit], 1):
        host = (urlparse(source).hostname or "").lower()
        if not any(host == allowed or host.endswith("." + allowed) for allowed in ALLOWED_IMAGE_HOSTS):
            manifest.append({"source": source, "status": "skipped_untrusted_host"})
            continue
        try:
            download_url = re.sub(r"=w\d+-h\d+(?:-[a-z0-9-]*)?", "=w1600-h1200", source, count=1, flags=re.I)
            download_url = re.sub(r"=s\d+(?:-[a-z0-9-]*)?", "=s1600", download_url, count=1, flags=re.I)
            req = Request(download_url, headers={"User-Agent": "Mozilla/5.0", "Referer": "https://www.google.com/maps/"})
            with urlopen(req, timeout=15) as response:
                if not response.headers.get_content_type().startswith("image/"):
                    raise ValueError("No es una respuesta de imagen.")
                payload = response.read(MAX_IMAGE_BYTES + 1)
            if not payload or len(payload) > MAX_IMAGE_BYTES:
                raise ValueError("Imagen vacía o mayor al límite configurado.")
            with Image.open(io.BytesIO(payload)) as image:
                if image.width * image.height > MAX_PIXELS:
                    raise ValueError("La imagen excede el límite de píxeles.")
                image.verify()
            with Image.open(io.BytesIO(payload)) as image:
                image = image.convert("RGB")
                image.thumbnail((1800, 1400), Image.Resampling.LANCZOS)
                filename = f"foto-{index:02d}.webp"
                image.save(output_dir / filename, "WEBP", quality=84, method=5)
            files.append(filename)
            manifest.append({"file": filename, "source": source, "status": "saved_maps_photo_review_rights_before_publication"})
        except Exception as exc:
            manifest.append({"source": source, "status": "unavailable", "reason": type(exc).__name__})
    (output_dir / "image_manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return files


def save_user_images(paths: list[str], output_dir: Path, prefix: str, limit: int = 12) -> list[str]:
    """Validate and optimize user-selected images into portable WebP assets."""
    output_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = output_dir / "image_manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.is_file() else []
    except (OSError, json.JSONDecodeError):
        manifest = []
    files = []
    for index, raw_path in enumerate(paths[:limit], 1):
        source = Path(raw_path).expanduser()
        try:
            if not source.is_file():
                raise ValueError("No se encontró el archivo seleccionado.")
            if source.stat().st_size > MAX_IMAGE_BYTES:
                raise ValueError("La imagen supera el límite de 8 MB.")
            with Image.open(source) as image:
                if image.width * image.height > MAX_PIXELS:
                    raise ValueError("La imagen supera el límite de resolución.")
                image.seek(0)
                image.load()
                has_alpha = image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info)
                image = image.convert("RGBA" if has_alpha else "RGB")
                image.thumbnail((1800, 1400), Image.Resampling.LANCZOS)
                filename = f"{prefix}-{index:02d}.webp"
                image.save(output_dir / filename, "WEBP", quality=88, method=5)
            files.append(filename)
            manifest.append({"file": filename, "source": "user_selected", "status": "saved_user_image"})
        except Exception as exc:
            manifest.append({"source": source.name, "status": "unavailable", "reason": str(exc)[:240]})
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return files
