from __future__ import annotations

from .data_cleaner import normalize_business, normalize_phone_ar, normalize_whatsapp_number
from .data_validator import validate_business
from .reviews_processor import process_reviews


def analyze_business(raw: dict, family: str, whatsapp_enabled: bool = True) -> dict:
    data = normalize_business(raw)
    name_override = str(data.pop("business_name_override", "") or "").strip()
    whatsapp_override = str(data.pop("whatsapp_number_override", "") or "").strip()
    if name_override:
        data["name"] = name_override
    maps_phone = data.get("phone", "")
    original = maps_phone
    normalized, phone_status = normalize_phone_ar(original)
    override_phone_normalized, override_phone_status = normalize_whatsapp_number(whatsapp_override) if whatsapp_override else ("", "missing")
    if whatsapp_override and override_phone_normalized:
        original = whatsapp_override
        normalized, phone_status = override_phone_normalized, override_phone_status
        data["phone"] = whatsapp_override
        data["phone_maps_original"] = maps_phone
    data["phone_original"] = original
    data["phone_e164"] = normalized
    data["phone_status"] = phone_status
    data["phone_for_call"] = normalized
    whatsapp_number, whatsapp_status = (override_phone_normalized, override_phone_status) if whatsapp_override else (normalized, phone_status)
    data["whatsapp_override_status"] = whatsapp_status if whatsapp_override else "using_maps_phone"
    data["whatsapp_phone"] = whatsapp_number if whatsapp_enabled else ""
    data["whatsapp_url"] = "https://wa.me/" + whatsapp_number.lstrip("+") if whatsapp_enabled and whatsapp_number else ""
    data["reviews"], data["review_validation"] = process_reviews(data.get("reviews"), data.get("source_url", ""))
    data["facts"] = {k: data.get(k) for k in ("name", "category", "address", "city", "rating", "review_count", "website", "phone_e164") if data.get(k)}
    data["missing_fields"] = [k for k in ("category", "description", "address", "coordinates", "hours_visible", "phone", "rating", "review_count", "photos") if not data.get(k)]
    data["warnings"] = []
    if original and not normalized:
        data["warnings"].append("El teléfono no se pudo validar con seguridad; no se generó enlace de WhatsApp.")
    if whatsapp_override and not whatsapp_number:
        data["warnings"].append("El número personalizado de WhatsApp no es válido; no se generó el enlace.")
    if data["review_validation"]["rejected"]:
        data["warnings"].append(f"Se descartaron {data['review_validation']['rejected']} fragmentos que no pasaron el filtro de reseñas.")
    data["warnings"].extend(validate_business(data))
    return data
