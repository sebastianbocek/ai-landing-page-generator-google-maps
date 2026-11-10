from __future__ import annotations

import re
from urllib.parse import urlparse, urlunparse


def seo_text(name: str, category: str = "", address: str = "") -> dict:
    place = locality_from_address(address)
    title = " | ".join(part for part in (name, f"{category} en {place}" if category and place else category or place) if part)
    description = f"Conocé {name}: {category.lower() if category else 'información y contacto'}{f' en {place}' if place else ''}. Consultá ubicación y medios de contacto." if name else "Información y contacto del negocio."
    return {"title": _trim(title or "Negocio local", 60), "description": _trim(description, 155)}


def locality_from_address(address: str) -> str:
    parts = [part.strip() for part in str(address or "").split(",") if part.strip()]
    if parts and parts[-1].casefold() in {"argentina", "united states", "usa", "españa", "spain"}:
        parts.pop()
    candidate = parts[-2] if len(parts) >= 3 else (parts[-1] if parts else "")
    candidate = re.sub(r"^\s*(?:[A-Z]\d{4}[A-Z]{3}|[A-Z]\d{4}|\d{4,5})\s*", "", candidate, flags=re.I)
    return candidate.strip()


def public_site_url(value: str) -> str:
    value = str(value or "").strip()
    if not value:
        return ""
    parsed = urlparse(value)
    if parsed.scheme.lower() != "https" or not parsed.hostname or any(char.isspace() for char in parsed.netloc) or parsed.username or parsed.password:
        return ""
    try:
        parsed.port
    except ValueError:
        return ""
    return urlunparse(("https", parsed.netloc, parsed.path.rstrip("/"), "", "", ""))


def _trim(value: str, limit: int) -> str:
    value = " ".join(value.split())
    return value if len(value) <= limit else value[:limit].rsplit(" ", 1)[0].rstrip(" |,.-")
