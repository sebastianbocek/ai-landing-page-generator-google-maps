from __future__ import annotations

import re
from datetime import datetime
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import Error as PlaywrightError, TimeoutError as PlaywrightTimeoutError, sync_playwright


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


EXTRACTION_JS = r"""() => {
  const text = (el) => (el?.innerText || el?.getAttribute?.('aria-label') || '').trim();
  const main = document.querySelector('[role="main"]') || document.body;
  const allText = (main.innerText || '').split('\n').map(x => x.trim()).filter(Boolean);
  const title = document.querySelector('h1')?.innerText?.trim() || document.title.replace(/\s*- Google Maps.*$/i, '').trim();
  const anchors = [...main.querySelectorAll('a[href]')].map(a => ({href:a.href, label:text(a)}));
  const buttons = [...main.querySelectorAll('button,[role="button"]')].map(b => ({label:b.getAttribute('aria-label')||text(b), text:text(b)}));
  const photoCandidates = [...main.querySelectorAll('img,[style*="background-image"],[role="img"]')].flatMap(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 120 || rect.height < 100) return [];
    const alt = (el.getAttribute('alt') || el.getAttribute('aria-label') || '').toLowerCase();
    if (/avatar|profile|foto de usuario|user photo|profile picture/.test(alt)) return [];
    if (el.tagName === 'IMG' && el.complete && el.naturalWidth === 0) return [];
    const sources = [el.currentSrc, el.src, el.getAttribute('srcset'), getComputedStyle(el).backgroundImage]
      .filter(Boolean).join(' ');
    const urls = sources.match(/https?:[^\s,'"()]+/g) || [];
    return urls.filter(src => /googleusercontent\.com|ggpht\.com/i.test(src));
  });
  const images = [...new Set(photoCandidates)];
  const heading = [...main.querySelectorAll('[aria-label]')].map(e=>e.getAttribute('aria-label')).filter(Boolean);
  const reviews = [...main.querySelectorAll('[data-review-id],.jftiEf,[role="article"]')].map(card => {
    const textNode = card.querySelector('.wiI7pd,[data-expandable-section]') || card;
    const authorNode = card.querySelector('.d4r55,[class*="author"],[class*="name"]');
    const ratingNode = card.querySelector('[role="img"][aria-label*="estrellas"],[role="img"][aria-label*="star"],[aria-label*="estrella"],[aria-label*="star"]');
    const dateNode = card.querySelector('.rsqaWe,[class*="date"]');
    const ratingLabel = ratingNode?.getAttribute('aria-label') || '';
    const score = ratingLabel.match(/([1-5])\s*(?:de\s*5|star|estrella)/i)?.[1] || '';
    return {author:text(authorNode), text:text(textNode), rating:score, date:text(dateNode)};
  }).filter(row => row.text);
  return {title, allText, anchors, buttons, images, heading, reviews, finalUrl:location.href};
}"""

PHOTO_TAB_JS = r"""() => {
  const root = document.querySelector('[role="main"]') || document.body;
  const button = [...root.querySelectorAll('button,[role="button"],[role="tab"]')].find(el => {
    const label = (el.innerText || el.getAttribute('aria-label') || '').trim();
    return /ver fotos|\b\d+ fotos?\b|see photos|photos|fotos/i.test(label);
  });
  if (!button) return false;
  button.click(); return true;
}"""

NEXT_PHOTO_JS = r"""() => {
  const root = document.querySelector('[role="dialog"]') || document.querySelector('[role="main"]') || document.body;
  const button = [...root.querySelectorAll('button,[role="button"]')].find(el =>
    /siguiente foto|next photo|next|siguiente/i.test(el.getAttribute('aria-label') || '')
  );
  if (!button) return false;
  button.click(); return true;
}"""



def _stable_evaluate(page, script: str, purpose: str, log=None, attempts: int = 4):
    """Re-run a Maps DOM read after SPA redirects destroy the JS execution context."""
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            return page.evaluate(script)
        except PlaywrightError as exc:
            last_error = exc
            message = str(exc).casefold()
            navigation_race = any(token in message for token in (
                "execution context was destroyed", "most likely because of a navigation",
                "frame was detached", "cannot find context with specified id",
            ))
            if not navigation_race or attempt == attempts or page.is_closed():
                raise
            if log:
                log("WARN", f"Google Maps navegó durante {purpose}; reintentando ({attempt}/{attempts - 1}).")
            try:
                page.wait_for_load_state("domcontentloaded", timeout=12000)
            except PlaywrightTimeoutError:
                pass
            try:
                page.locator('[role="main"]').wait_for(timeout=12000)
            except PlaywrightTimeoutError:
                pass
            page.wait_for_timeout(450 * attempt)
    raise RuntimeError(f"Google Maps no estabilizó la página durante {purpose}: {last_error}")


def _dismiss_optional_sign_in_prompt(page, log=None) -> bool:
    """Close an optional Maps sign-in dialog without signing in or bypassing a gate."""
    try:
        dismissed = page.evaluate(r"""() => {
          const dialogs = [...document.querySelectorAll('[role="dialog"],[aria-modal="true"]')];
          for (const dialog of dialogs) {
            if (!/iniciar sesi[oó]n|sign in|acceder a tu cuenta/i.test(dialog.innerText || '')) continue;
            const close = [...dialog.querySelectorAll('button,[role="button"]')].find(button =>
              /cerrar|close|ahora no|no gracias|not now|no thanks/i.test(
                `${button.getAttribute('aria-label') || ''} ${button.innerText || ''}`
              )
            );
            if (close) { close.click(); return true; }
          }
          return false;
        }""")
        if dismissed and log:
            log("INFO", "Se cerró el aviso opcional de inicio de sesión de Google Maps; se continúa como visitante.")
        return bool(dismissed)
    except PlaywrightError:
        return False


def extract_listing(url: str, get_photos: bool, log=None) -> dict:
    with sync_playwright() as p:
        # Use the installed Chrome channel first. Google Maps can present an
        # unnecessary sign-in prompt in Playwright's bundled Chromium even for
        # public listings. This still opens a fresh, logged-out browser session.
        try:
            browser = p.chromium.launch(headless=False, channel="chrome")
        except PlaywrightError:
            if log:
                log("WARN", "No se pudo iniciar Chrome instalado; se usará Chromium de Playwright.")
            browser = p.chromium.launch(headless=False)
        try:
            page = browser.new_page(locale="es-AR")
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(900)
            _dismiss_optional_sign_in_prompt(page, log)
            try:
                page.locator("h1").first.wait_for(timeout=25000)
                page.wait_for_timeout(2200)
            except PlaywrightTimeoutError:
                pass
            _dismiss_optional_sign_in_prompt(page, log)
            if "accounts.google.com" in page.url:
                raise RuntimeError("Google Maps redirigió la ficha pública a la pantalla de acceso. No se inició sesión; comprueba que el enlace pueda abrirse como visitante.")
            data = _stable_evaluate(page, EXTRACTION_JS, "la lectura de la ficha", log)
            listing_url = data.get("finalUrl") or page.url
            if get_photos:
                image_sources = list(data.get("images", []))
                opened_photos = _stable_evaluate(page, PHOTO_TAB_JS, "la apertura de fotos", log)
                if opened_photos:
                    page.wait_for_timeout(800)
                    for photo_index in range(8):
                        current = _stable_evaluate(page, EXTRACTION_JS, "la lectura de fotos", log)
                        image_sources.extend(current.get("images", []))
                        if photo_index == 7 or not _stable_evaluate(page, NEXT_PHOTO_JS, "la navegación de fotos", log):
                            break
                        page.wait_for_timeout(300)
                    page.keyboard.press("Escape")
                    page.wait_for_timeout(200)
                data["images"] = list(dict.fromkeys(image_sources))[:24]

            # Load the actual review cards, even when the listing overview already exposed some snippets.
            opened_reviews = _stable_evaluate(page, r"""() => {
              const root = document.querySelector('[role="main"]') || document.body;
              const tab = [...root.querySelectorAll('button,[role="tab"],[role="button"]')]
                .find(el => /opiniones|reseñas|reviews|avis/i.test((el.innerText || el.getAttribute('aria-label') || '').trim()));
              if (!tab) return false;
              tab.click(); return true;
            }""", "la apertura de reseñas", log)
            if opened_reviews:
                page.wait_for_timeout(800)
                collected = list(data.get("reviews", []))
                for _ in range(8):
                    current = _stable_evaluate(page, EXTRACTION_JS, "la lectura de reseñas", log)
                    collected.extend(current.get("reviews", []))
                    _stable_evaluate(page, r"""() => {
                      const card = document.querySelector('[data-review-id],.jftiEf');
                      let node = card?.parentElement;
                      while (node && node !== document.body) {
                        if (node.scrollHeight > node.clientHeight + 200 && getComputedStyle(node).overflowY !== 'visible') {
                          node.scrollTop = node.scrollHeight; return true;
                        }
                        node = node.parentElement;
                      }
                      return false;
                    }""", "el desplazamiento de reseñas", log)
                    page.wait_for_timeout(300)
                seen = set()
                data["reviews"] = []
                for review in collected:
                    key = (review.get("author", ""), review.get("text", ""))
                    if key not in seen:
                        seen.add(key); data["reviews"].append(review)
            data["finalUrl"] = listing_url
        finally:
            browser.close()

    lines = [clean(x) for x in data.get("allText", []) if clean(x)]
    buttons = data.get("buttons", [])
    anchors = data.get("anchors", [])
    labels = [clean(x) for x in data.get("heading", [])]

    phone = ""
    for anchor in anchors:
        if anchor["href"].lower().startswith("tel:"):
            phone = clean(anchor["href"][4:])
            break
    if not phone:
        for item in buttons:
            match = re.search(r"(?:tel[eé]fono|phone|llamar|call)\D{0,15}(\+?[\d][\d\s().-]{6,})", item["label"], re.I)
            if match:
                phone = clean(match.group(1))
                break
    if not phone:
        for line in lines:
            match = re.search(r"(?:\+?\d[\d\s().-]{7,}\d)", line)
            if match:
                phone = clean(match.group(0))
                break

    website = ""
    for anchor in anchors:
        href = anchor["href"]
        label = anchor["label"].lower()
        if href.startswith("http") and "google." not in href and not any(x in href for x in ("g.page", "goo.gl", "googleusercontent")) and ("sitio" in label or "website" in label or "web" in label):
            website = href
            break

    address = ""
    for phrase in ("dirección", "address", "ubicación", "location"):
        found = next((x for x in labels + [b["label"] for b in buttons] if phrase in x.lower()), "")
        if found:
            address = re.sub(r"^(dirección|address|ubicación|location)\s*:?\s*", "", found, flags=re.I)
            if address and address.lower() not in ("dirección", "address", "ubicación", "location"):
                break
            address = ""
    if not address:
        for idx, line in enumerate(lines):
            if line.lower() in ("dirección", "address") and idx + 1 < len(lines):
                address = lines[idx + 1]
                break

    rating = ""
    for item in buttons:
        match = re.search(r"\b([1-5][,.]\d)\b", item["label"])
        if match:
            rating = match.group(1).replace(",", ".")
            break
    if not rating:
        rating_match = next((re.match(r"^([1-5][,.]\d)\b", line) for line in lines if re.match(r"^[1-5][,.]\d\b", line)), None)
        if rating_match:
            rating = rating_match.group(1).replace(",", ".")
    review_count = ""
    for line in lines:
        review_match = re.search(r"\(?([\d.,]+)\)?\s*(?:opiniones?|reseñas?|reviews?)\b", line, re.I)
        if review_match:
            review_count = review_match.group(1)
            break
    category = ""
    if data.get("title"):
        title_idx = next((i for i, x in enumerate(lines) if x == data["title"]), -1)
        if title_idx >= 0:
            for candidate in lines[title_idx + 1:title_idx + 7]:
                candidate = re.sub(r"[\ue000-\uf8ff]", "", candidate).strip()
                if (not candidate or candidate == rating or re.match(r"^[1-5][,.]\d\b", candidate)
                        or re.fullmatch(r"\(?\d[\d,.]*\)?", candidate)
                        or re.search(r"\b\d+\s+reseñas?\b", candidate, re.I)
                        or candidate.lower() in {"descripción general", "opiniones", "acerca de", "overview", "reviews", "about"}):
                    continue
                category = re.sub(r"\s*[·•].*$", "", candidate).strip()
                if category:
                    break
    photos = []
    if get_photos:
        seen_photos = set()
        for src in data.get("images", []):
            parsed = urlparse(src)
            query = parse_qs(parsed.query)
            identity = (query.get("panoid") or query.get("photoid") or [parsed.path.split("=w")[0]])[0]
            if identity not in seen_photos:
                seen_photos.add(identity)
                photos.append(src)
            if len(photos) >= 8:
                break
    current_url = data.get("finalUrl") or url
    coordinates = re.search(r"@(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)", current_url)
    hours = [line for line in lines if re.search(r"\b(lun|mar|mi[eé]|jue|vie|s[aá]b|dom|mon|tue|wed|thu|fri|sat|sun)\b.{0,50}\b\d{1,2}(:\d{2})?\s*(a\.?m\.?|p\.?m\.?)?", line, re.I)]
    return {
        "name": clean(data.get("title", "")), "phone": phone, "address": address,
        "website": website, "rating": rating, "review_count": review_count, "category": category,
        "photos": photos, "source_url": current_url, "captured_at": datetime.now().isoformat(timespec="minutes"),
        "coordinates": {"latitude": float(coordinates.group(1)), "longitude": float(coordinates.group(2))} if coordinates else None,
        "hours_visible": hours[:14],
        "reviews": data.get("reviews", []),
        "provenance": {"name": {"status": "confirmed", "source": "google_maps_visible"}, "category": {"status": "confirmed" if category else "not_found", "source": "google_maps_visible" if category else None}, "address": {"status": "confirmed" if address else "not_found", "source": "google_maps_visible" if address else None}, "phone": {"status": "confirmed" if phone else "not_found", "source": "google_maps_visible" if phone else None}, "website": {"status": "confirmed" if website else "not_found", "source": "google_maps_visible" if website else None}, "rating": {"status": "confirmed" if rating else "not_found", "source": "google_maps_visible" if rating else None}, "review_count": {"status": "confirmed" if review_count else "not_found", "source": "google_maps_visible" if review_count else None}},
        "visible_text": lines[:80],
    }


