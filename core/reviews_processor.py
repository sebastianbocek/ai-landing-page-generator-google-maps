from __future__ import annotations

import re
import unicodedata
from .data_cleaner import clean_text
from .data_validator import validate_maps_url

INTERFACE_RE = re.compile(r"\b(foto de|me gusta|compartir|ver m[aá]s|see more|like|share|opiniones?\s*$|reviews?\s*$|men[uú]|m[aá]s opciones|reportar|respuesta del propietario|traducir)\b", re.I)


def is_interface_text(text: str) -> bool:
    value = clean_text(text)
    if len(value) < 18 or re.fullmatch(r"[\W_\d]+", value):
        return True
    return bool(INTERFACE_RE.search(value))


def process_reviews(reviews: list[dict] | None, source_url: str) -> tuple[list[dict], dict]:
    clean, seen = [], set()
    rejected = 0
    valid_source = validate_maps_url(source_url)[0]
    for row in reviews or []:
        if not isinstance(row, dict):
            rejected += 1; continue
        text = clean_text(row.get("text"))
        author = clean_text(row.get("author")) or "Usuario de Google"
        score = clean_text(row.get("rating"))
        try:
            rating = float(score.replace(",", "."))
        except ValueError:
            rating = 0
        # La landing muestra únicamente opiniones con una puntuación superior a 4.
        # La calificación agregada del negocio se conserva por separado como dato factual.
        if is_interface_text(text) or not 4 < rating <= 5 or not valid_source:
            rejected += 1; continue
        key = unicodedata.normalize("NFKD", text.casefold()).encode("ascii", "ignore").decode()
        if key in seen:
            rejected += 1; continue
        seen.add(key)
        clean.append({"text": text[:1200], "author": author[:100], "rating": rating, "date": clean_text(row.get("date"))[:100], "source": source_url})
    return clean, {"valid": len(clean), "rejected": rejected, "policy": "rating_above_4_comment_and_maps_source_required", "minimum_rating_exclusive": 4}
