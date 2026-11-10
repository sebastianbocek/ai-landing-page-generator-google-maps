from __future__ import annotations

from .data_cleaner import normalize_business, normalize_phone_ar
from .data_validator import validate_business
from .reviews_processor import process_reviews


def analyze_business(raw: dict, family: str, whatsapp_enabled: bool = True) -> dict:
    data = normalize_business(raw)
    original = data.get("phone", "")
    normalized, phone_status = normalize_phone_ar(original)
    data["phone_original"] = original
    data["phone_e164"] = normalized
    data["phone_status"] = phone_status
    data["phone_for_call"] = normalized
    data["whatsapp_phone"] = normalized if whatsapp_enabled else ""
    data["whatsapp_url"] = "https://wa.me/" + normalized.lstrip("+") if whatsapp_enabled and normalized else ""
    data["reviews"], data["review_validation"] = process_reviews(data.get("reviews"), data.get("source_url", ""))
    data["facts"] = {k: data.get(k) for k in ("name", "category", "address", "city", "rating", "review_count", "website", "phone_e164") if data.get(k)}
    data["missing_fields"] = [k for k in ("category", "description", "address", "coordinates", "hours_visible", "phone", "rating", "review_count", "photos") if not data.get(k)]
    data["warnings"] = []
    if original and not normalized:
        data["warnings"].append("El teléfono no se pudo validar con seguridad; no se generó enlace de WhatsApp.")
    if data["review_validation"]["rejected"]:
        data["warnings"].append(f"Se descartaron {data['review_validation']['rejected']} fragmentos que no pasaron el filtro de reseñas.")
    data["warnings"].extend(validate_business(data))
    return data
