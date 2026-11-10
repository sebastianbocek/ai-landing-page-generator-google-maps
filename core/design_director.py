from __future__ import annotations

import hashlib

ART_DIRECTIONS = ("editorial_premium", "luxury", "modern_minimal", "corporate_premium", "bold_creative", "organic_natural", "dark_elegant", "contemporary_local")
PHOTO_TREATMENTS = ("editorial_crop", "bento_mosaic", "film_strip", "minimal_grid")
VISUAL_EFFECTS = ("glass_surfaces", "ambient_orbits", "editorial_reveal", "kinetic_gallery", "none")
PALETTES = {
    "editorial_premium": ("#f4f0e8", "#fffdf9", "#202520", "#23675d"),
    "luxury": ("#171715", "#22211e", "#f4efe5", "#c7a66a"),
    "modern_minimal": ("#f5f7f6", "#ffffff", "#202927", "#187f78"),
    "corporate_premium": ("#edf2f5", "#ffffff", "#1d2a36", "#256b91"),
    "bold_creative": ("#f7eadc", "#fffaf3", "#22201e", "#e26c43"),
    "organic_natural": ("#eef0e7", "#fbfaf5", "#29362d", "#668363"),
    "dark_elegant": ("#151a1c", "#202729", "#f0f2ed", "#77c6b4"),
    "contemporary_local": ("#f3f6f4", "#ffffff", "#182b25", "#14785c"),
}


def local_design_spec(data: dict, family: str, variant: int = 0) -> dict:
    # Deterministic choice makes local mode reproducible while regenerated versions still change composition.
    seed = hashlib.sha256(f"{data.get('name')}:{family}:{variant}".encode()).digest()[0]
    direction = ART_DIRECTIONS[seed % len(ART_DIRECTIONS)]
    return {
        "industry": data.get("category") or family,
        "goal": "Facilitar consultas directas con información comprobada del negocio",
        "art_direction": direction,
        "layout": ("split", "editorial", "centered", "immersive")[(seed // 8) % 4],
        "photo_treatment": PHOTO_TREATMENTS[(seed // 16) % len(PHOTO_TREATMENTS)],
        "visual_effects": _local_effects(data, direction, seed),
        "sections": ["trust", "introduction", "services", "gallery", "reviews", "location", "contact"],
        "hero": {"eyebrow": data.get("category") or family, "headline": data.get("name") or "Negocio local", "description": data.get("description") or _location_line(data), "primary_cta": "Consultar por WhatsApp", "secondary_cta": "Ver ubicación", "visual_note": "Composición editorial con fotografías auténticas disponibles; no simular fotos del local."},
        "introduction": {"title": "Un primer acercamiento", "text": data.get("description") or _location_line(data)},
        "services": [],
        "contact": {"title": "Hablemos", "text": "Consultá directamente para recibir información."},
        "seo": {"title": _short(data.get("name") or "Negocio local", 60), "description": _short("Información, ubicación y contacto de " + (data.get("name") or "un negocio local") + (" en " + data.get("address", "") if data.get("address") else ""), 155)},
        "source": "local_fallback",
    }


def validate_design_spec(spec: dict) -> dict:
    required = ("industry", "goal", "art_direction", "layout", "photo_treatment", "sections", "hero", "introduction", "services", "contact", "seo")
    if not isinstance(spec, dict) or any(key not in spec for key in required):
        raise ValueError("La especificación de diseño está incompleta.")
    if spec["art_direction"] not in ART_DIRECTIONS:
        raise ValueError("La dirección artística no está permitida.")
    if spec["layout"] not in {"split", "editorial", "centered", "immersive"}:
        raise ValueError("La composición elegida no está permitida.")
    if spec["photo_treatment"] not in PHOTO_TREATMENTS:
        raise ValueError("El tratamiento de fotografía no está permitido.")
    if "visual_effects" not in spec:
        # Backward compatible with previously cached/generated JSON specs.
        spec["visual_effects"] = []
    if (not isinstance(spec["visual_effects"], list) or len(spec["visual_effects"]) > 2
            or any(effect not in VISUAL_EFFECTS for effect in spec["visual_effects"])
            or ("none" in spec["visual_effects"] and len(spec["visual_effects"]) > 1)
            or len(set(spec["visual_effects"])) != len(spec["visual_effects"])):
        raise ValueError("La selección de efectos visuales no es válida.")
    for group, keys in (("hero", ("headline", "description")), ("introduction", ("title", "text")), ("contact", ("title", "text")), ("seo", ("title", "description"))):
        if any(not isinstance(spec[group].get(k), str) for k in keys):
            raise ValueError(f"La sección {group} tiene contenido no válido.")
    if not isinstance(spec["services"], list) or not isinstance(spec["sections"], list):
        raise ValueError("La estructura de secciones no es válida.")
    return spec


def _local_effects(data: dict, direction: str, seed: int) -> list[str]:
    """Choose restrained, content-aware effects when generation runs without AI."""
    category = str(data.get("category") or "").casefold()
    photos = len(data.get("photos", []))
    effects = []
    if direction in {"modern_minimal", "dark_elegant", "bold_creative"} and seed % 3 == 0:
        effects.append("glass_surfaces")
    if direction in {"bold_creative", "dark_elegant", "contemporary_local"} and not photos:
        effects.append("ambient_orbits")
    if direction in {"editorial_premium", "luxury", "organic_natural"}:
        effects.append("editorial_reveal")
    if photos >= 4 and any(word in category for word in ("belleza", "peluquer", "restaurante", "hotel", "fotograf", "estética", "estetica")):
        effects.append("kinetic_gallery")
    return list(dict.fromkeys(effects))[:2]


def palette_for(direction: str) -> dict:
    background, surface, ink, accent = PALETTES.get(direction, PALETTES["contemporary_local"])
    return {"background": background, "surface": surface, "ink": ink, "accent": accent}


def _location_line(data: dict) -> str:
    if data.get("address"):
        return f"Encontrá la ubicación y los medios de contacto de {data.get('name', 'este negocio')} en {data['address']}."
    return "Consultá la ubicación y los medios de contacto disponibles del negocio."


def _short(value: str, length: int) -> str:
    value = " ".join(value.split())
    return value[:length].rsplit(" ", 1)[0] if len(value) > length else value
