from __future__ import annotations

import re
import unicodedata
from .data_cleaner import clean_text
from .data_validator import validate_maps_url

INTERFACE_RE = re.compile(r"\b(foto de|me gusta|compartir|ver m[aá]s|see more|like|share|opiniones?\s*$|reviews?\s*$|men[uú]|m[aá]s opciones|reportar|respuesta del propietario|traducir)\b", re.I)
REVIEW_METADATA_RE = re.compile(
    r"\b(?:local\s+guide|gu[ií]a\s+local|\d[\d.,]*\s+(?:opiniones?|reseñas?|reviews?)|\d+\s+fotos?|hace\s+\d+\s+(?:d[ií]as?|semanas?|meses?|a[nñ]os?)|\d+\s+(?:days?|weeks?|months?|years?)\s+ago)\b",
    re.I,
)


def clean_review_text(value: str, author: str = "", date: str = "") -> str:
    """Remove reviewer metadata and Maps icon glyphs accidentally read with a card."""
    text = clean_text(value)
    for label in (author, date):
        label = clean_text(label)
        if label:
            text = re.sub(rf"^{re.escape(label)}\s*[·•|–—-]?\s*", "", text, flags=re.I)
    text = REVIEW_METADATA_RE.sub(" ", text)
    # Maps uses private-use icon fonts; when copied into text they appear as
    # opaque characters (or empty square glyphs) beside the actual comment.
    text = re.sub(r"[\ue000-\uf8ff\ufffd\u25a0\u25a1\u25a3\u25af]", " ", text)
    text = re.sub(r"(?:★|☆|⭐|✰|✭|✮|✯|✩|✪||)+", " ", text)
    text = re.sub(r"\s*[·•|]\s*", " ", text)
    return clean_text(text).strip(" -–—")


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
        author = clean_text(row.get("author")) or "Usuario de Google"
        date = clean_text(row.get("date"))
        text = clean_review_text(row.get("text"), author, date)
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
        clean.append({"text": text[:1200], "author": author[:100], "rating": rating, "date": date[:100], "source": source_url})
    return clean, {"valid": len(clean), "rejected": rejected, "policy": "rating_above_4_comment_and_maps_source_required", "minimum_rating_exclusive": 4}
