from __future__ import annotations

import re
import unicodedata
import math
from urllib.parse import urlparse

SOCIAL_HOSTS = {"instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com", "m.facebook.com", "fb.com", "www.fb.com", "tiktok.com", "www.tiktok.com", "linkedin.com", "www.linkedin.com"}


def clean_text(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def normalize_url(value: str) -> str:
    value = clean_text(value)
    if not value:
        return ""
    parsed = urlparse(value if "://" in value else "https://" + value)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        return ""
    return parsed.geturl()


def is_social_url(value: str) -> bool:
    host = (urlparse(normalize_url(value)).hostname or "").lower()
    return host in SOCIAL_HOSTS or any(host.endswith("." + item.removeprefix("www.")) for item in SOCIAL_HOSTS)


def normalize_business(data: dict) -> dict:
    result = dict(data)
    raw_rating = clean_text(result.get("rating"))
    raw_review_count = clean_text(result.get("review_count") or result.get("rating_count"))
    raw_website = clean_text(result.get("website"))
    for key in ("name", "category", "description", "address", "phone", "website", "source_url", "city"):
        result[key] = clean_text(result.get(key))
    result["source_url"] = normalize_url(result["source_url"])
    result["website"] = "" if is_social_url(result["website"]) else normalize_url(result["website"])
    result["photos"] = list(dict.fromkeys(clean_text(x) for x in result.get("photos", []) if clean_text(x)))[:20]
    result["rating"] = clean_text(result.get("rating"))
    result["review_count"] = clean_text(result.get("review_count") or result.get("rating_count"))
    try:
        rating = float(result["rating"].replace(",", "."))
        result["rating"] = f"{rating:.1f}" if math.isfinite(rating) and 1 <= rating <= 5 else ""
    except ValueError:
        result["rating"] = ""
    count = result["review_count"]
    if re.fullmatch(r"\d[\d.,]*", count):
        result["review_count"] = re.sub(r"\D", "", count)
    elif count:
        result["review_count"] = ""
    result["reviews"] = result.get("reviews") if isinstance(result.get("reviews"), list) else []
    result["provenance"] = result.get("provenance") or {}
    for key in ("name", "category", "address", "phone", "website", "rating", "review_count", "source_url"):
        if key not in result["provenance"]:
            result["provenance"][key] = {"status": "confirmed" if result.get(key) else "not_found", "source": "google_maps_visible" if result.get(key) else None}
    if raw_rating and not result["rating"]:
        result["provenance"]["rating"] = {"status": "questionable", "source": "google_maps_visible", "raw_value": raw_rating}
    if raw_review_count and not result["review_count"]:
        result["provenance"]["review_count"] = {"status": "questionable", "source": "google_maps_visible", "raw_value": raw_review_count}
    if raw_website and is_social_url(raw_website):
        result["provenance"]["website"] = {"status": "questionable", "source": "social_profile_excluded_from_business_website", "raw_value": raw_website}
    return result


def business_cache_key(data: dict, model: str, family: str, variant: int) -> str:
    import hashlib, json
    relevant = {k: data.get(k) for k in ("name", "category", "address", "phone_e164", "rating", "review_count", "reviews", "owner_notes")}
    relevant["photo_count"] = len(data.get("photos", []))
    relevant.update(model=model, family=family, variant=variant)
    payload = json.dumps(relevant, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def normalize_phone_ar(raw: str) -> tuple[str, str]:
    """Return validated Argentina E.164 and a short reason; never invent an area code."""
    digits = re.sub(r"\D", "", raw or "")
    if not digits:
        return "", "missing"
    explicit_international = str(raw).strip().startswith("+") or digits.startswith("00")
    if digits.startswith("00"):
        digits = digits[2:]
    if explicit_international and not digits.startswith("54"):
        return "", "unsupported_country"
    international = digits.startswith("54")
    if international:
        national = digits[2:]
        if national.startswith("9"):
            national = national[1:]
        if national.startswith("0"):
            national = national[1:]
    else:
        national = digits[1:] if digits.startswith("0") else digits
        # Google Maps frequently formats Argentine mobile numbers as 0 + area + 15 + local number.
        if national.startswith("15"):
            return "", "ambiguous_local_mobile"
        for area_len in (2, 3, 4):
            if len(national) == 12 and national[area_len:area_len + 2] == "15":
                national = national[:area_len] + national[area_len + 2:]
                break
    if not national.isdigit() or not (10 <= len(national) <= 11):
        return "", "invalid_length"
    mobile = international and digits.startswith("549") or (not international and "15" in digits)
    return ("+549" if mobile else "+54") + national, "validated_argentina_mobile" if mobile else "validated_argentina_number"


def normalize_whatsapp_number(raw: str) -> tuple[str, str]:
    """Validate an explicitly international number, or normalize an Argentine local number."""
    value = clean_text(raw)
    digits = re.sub(r"\D", "", value)
    if not digits:
        return "", "missing"
    explicit = value.startswith("+") or digits.startswith("00")
    if explicit:
        if digits.startswith("00"):
            digits = digits[2:]
        if not 8 <= len(digits) <= 15:
            return "", "invalid_international_length"
        return "+" + digits, "validated_international_number"
    return normalize_phone_ar(value)
