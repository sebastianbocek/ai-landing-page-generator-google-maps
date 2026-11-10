from __future__ import annotations

from urllib.parse import urlparse


def validate_maps_url(value: str) -> tuple[bool, str]:
    parsed = urlparse((value or "").strip())
    host = (parsed.hostname or "").lower()
    allowed = host in {"maps.app.goo.gl", "goo.gl", "google.com", "google.com.ar"} or host.endswith(".google.com") or host.endswith(".google.com.ar") or (host.startswith("maps.google.") and len(host.split(".")) >= 3)
    if parsed.scheme not in {"http", "https"} or not allowed:
        return False, "La URL debe ser un enlace público de Google Maps."
    return True, ""


def validate_business(data: dict) -> list[str]:
    issues = []
    if not data.get("name"):
        issues.append("No se pudo confirmar el nombre del negocio.")
    if data.get("rating"):
        try:
            if not 1 <= float(str(data["rating"]).replace(",", ".")) <= 5:
                issues.append("La puntuación detectada no está entre 1 y 5.")
        except ValueError:
            issues.append("La puntuación detectada no es numérica.")
    if data.get("source_url"):
        ok, _ = validate_maps_url(data["source_url"])
        if not ok:
            issues.append("El enlace de origen no parece pertenecer a Google Maps.")
    return issues
