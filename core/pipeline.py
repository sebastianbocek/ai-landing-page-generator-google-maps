from __future__ import annotations

import copy
import json
import shutil
from datetime import datetime
from pathlib import Path

from .business_analyzer import analyze_business
from .html_renderer import render_html
from .openai_engine import build_design_spec, fallback_after_api_error
from .quality_checker import check_site


def generate_site(raw_data: dict, family: str, output_root: Path, variant: int = 0, api_key: str = "", model: str | None = None, whatsapp_enabled: bool = True, photo_saver=None, art_direction: str = "") -> tuple[Path, dict, dict]:
    data = analyze_business(raw_data, family, whatsapp_enabled)
    try:
        spec = build_design_spec(data, family, api_key, model, variant, usage_dir=output_root.parent / "usage", art_direction_override=art_direction)
    except Exception as exc:
        if not api_key:
            raise
        spec = fallback_after_api_error(data, family, exc, variant)
        if art_direction:
            spec["art_direction"] = art_direction
    # Only show services explicitly present in the user's confirmed notes verbatim.
    notes = (data.get("owner_notes") or "").casefold()
    if not notes:
        spec["services"] = []
    else:
        spec["services"] = [item for item in spec.get("services", []) if item.get("title", "").casefold() in notes or item.get("description", "").casefold() in notes]
    folder = output_root / f"{_slug(data.get('name') or 'negocio')}-landing{variant + 1}-{datetime.now():%Y%m%d-%H%M%S-%f}"
    folder.mkdir(parents=True, exist_ok=False)
    page_data = copy.deepcopy(data)
    assets_dir = folder / "assets"
    assets_dir.mkdir(exist_ok=True)
    if photo_saver:
        page_data["photo_sources"] = list(data.get("photos", []))
        saved = photo_saver(data, assets_dir)
        page_data["photos"] = [f"assets/{item}" for item in saved]
        manifest = assets_dir / "image_manifest.json"
        if manifest.is_file():
            shutil.copy2(manifest, folder / "image_manifest.json")
    elif data.get("photos"):
        page_data["photo_sources"] = list(data.get("photos", []))
        page_data["photos"] = []
    if page_data.get("photos"):
        page_data["missing_fields"] = [field for field in page_data.get("missing_fields", []) if field != "photos"]
    elif "photos" not in page_data.get("missing_fields", []):
        page_data.setdefault("missing_fields", []).append("photos")
    if not (folder / "image_manifest.json").is_file():
        (folder / "image_manifest.json").write_text("[]", encoding="utf-8")
    (folder / "index.html").write_text(render_html(page_data, spec), encoding="utf-8")
    if page_data.get("public_url"):
        from .seo_generator import public_site_url
        public_url = public_site_url(page_data["public_url"])
        if public_url:
            sitemap_url = public_url + "/sitemap.xml"
            sitemap = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{_xml_escape(public_url)}</loc></url></urlset>\n'
            robots = f"User-agent: *\nAllow: /\nSitemap: {sitemap_url}\n"
            (folder / "sitemap.xml").write_text(sitemap, encoding="utf-8")
            (folder / "robots.txt").write_text(robots, encoding="utf-8")
    (folder / "business_data.json").write_text(json.dumps({**page_data, "test_data": bool(page_data.get("test_data"))}, ensure_ascii=False, indent=2), encoding="utf-8")
    (folder / "design_spec.json").write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding="utf-8")
    (folder / "GENERATED-BY.txt").write_text("Sitio estático generado desde datos visibles de Google Maps. Diseño y código generados localmente. Revisa hechos, textos y permisos de imágenes antes de publicar.\n", encoding="utf-8")
    report = check_site(folder, page_data, screenshots=True)
    (folder / "quality_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return folder, page_data, spec


def _slug(value: str) -> str:
    import re, unicodedata
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower() or "negocio"


def _xml_escape(value: str) -> str:
    from xml.sax.saxutils import escape
    return escape(value, {"\"": "&quot;", "'": "&apos;"})
