from __future__ import annotations

from pathlib import Path


VIEWPORTS = {"mobile_375": (375, 812), "mobile_390": (390, 844), "tablet_768": (768, 1024), "laptop_1024": (1024, 768), "desktop_1440": (1440, 1000)}


def check_site(folder: Path, data: dict, screenshots: bool = True) -> dict:
    from playwright.sync_api import sync_playwright
    file = folder / "index.html"
    report = {"status": "failed", "critical_errors": [], "warnings": [], "missing_fields": data.get("missing_fields", []), "viewport_checks": {}, "broken_images": [], "empty_links": [], "console_errors": [], "screenshots": [], "interactive_checks": {}}
    if not file.is_file():
        report["critical_errors"].append("No se generó index.html")
        return report
    shots = folder / "screenshots"
    if screenshots:
        shots.mkdir(exist_ok=True)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.on("pageerror", lambda error: report["console_errors"].append(str(error)[:300]))
            page.goto(file.resolve().as_uri(), wait_until="networkidle", timeout=45000)
            # Let the entrance choreography finish before measuring or capturing
            # the page; otherwise screenshots can show an invisible hero midway
            # through its clip-path reveal.
            page.wait_for_timeout(2800)
            report["title"] = page.title()
            report["h1_count"] = page.locator("h1").count()
            if report["h1_count"] != 1:
                report["critical_errors"].append(f"Se esperaba un único H1, hay {report['h1_count']}.")
            # Eagerly load offscreen photos before checking naturalWidth. Without
            # this, browser lazy-loading can be reported as a broken local file.
            page.locator("img:not(.viewer-image)").evaluate_all("els => els.forEach(img => img.loading = 'eager')")
            page.evaluate("Promise.all([...document.querySelectorAll('img:not(.viewer-image)')].map(img => img.decode().catch(() => null)))")
            # The lightbox contains an intentionally empty image until a visitor opens it.
            image_results = page.locator("img").evaluate_all("els => els.filter(i => !(i.classList.contains('viewer-image') && !i.closest('dialog')?.open)).map(i => ({src:i.currentSrc||i.src, ok:i.complete && i.naturalWidth>0}))")
            report["broken_images"] = [item["src"] for item in image_results if not item["ok"]]
            if report["broken_images"]:
                report["critical_errors"].append("Hay imágenes rotas.")
            report["expected_photos"] = len(data.get("photos", []))
            report["rendered_business_photos"] = page.locator(".hero-photo,.gallery-grid img").count()
            if report["expected_photos"] != report["rendered_business_photos"]:
                report["critical_errors"].append("La cantidad de fotografías de negocio renderizadas no coincide con las guardadas.")
            report["expected_reviews"] = len(data.get("reviews", []))
            report["rendered_reviews"] = page.locator(".review-card blockquote").count()
            if report["expected_reviews"] != report["rendered_reviews"]:
                report["critical_errors"].append("La cantidad de reseñas validadas renderizadas no coincide con los datos guardados.")
            report["empty_links"] = page.locator("a").evaluate_all("els => els.filter(a => !a.getAttribute('href') || a.getAttribute('href').trim()==='').map(a=>a.outerHTML.slice(0,160))")
            if report["empty_links"]:
                report["critical_errors"].append("Hay enlaces sin destino.")
            whatsapp_links = page.locator("a[href^='https://wa.me/']").evaluate_all("els => els.map(a=>a.href)")
            expected = (data.get("whatsapp_phone") or "").lstrip("+")
            if expected and any(expected not in href for href in whatsapp_links):
                report["critical_errors"].append("El destino de WhatsApp no coincide con el teléfono validado.")
            if expected and not whatsapp_links:
                report["critical_errors"].append("Falta el botón WhatsApp con teléfono validado.")
            for key, (width, height) in VIEWPORTS.items():
                page.set_viewport_size({"width": width, "height": height})
                page.wait_for_timeout(80)
                metrics = page.evaluate("({scroll:document.documentElement.scrollWidth, client:document.documentElement.clientWidth})")
                overflow = metrics["scroll"] > metrics["client"] + 1
                report["viewport_checks"][key] = {"width": width, "height": height, "horizontal_overflow": overflow}
                if overflow:
                    report["critical_errors"].append(f"Desbordamiento horizontal a {width}px.")
                if width <= 500 and page.locator(".menu").count():
                    page.locator(".menu").click()
                    opened = page.locator("nav.open").count() == 1
                    report["interactive_checks"]["mobile_menu"] = opened
                    if not opened:
                        report["critical_errors"].append("El menú móvil no se abre.")
                    page.locator(".menu").click()
                if screenshots and key in {"mobile_375", "desktop_1440"}:
                    # Trigger each reveal and allow its GSAP entrance to settle.
                    for section in page.locator(".reveal").all():
                        section.scroll_into_view_if_needed(timeout=3000)
                        page.wait_for_timeout(520)
                    page.evaluate("window.scrollTo(0, 0)")
                    page.wait_for_timeout(450)
                    page.screenshot(path=str(shots / ("mobile.png" if width < 500 else "desktop.png")), full_page=True)
                    report["screenshots"].append(str(Path("screenshots") / ("mobile.png" if width < 500 else "desktop.png")))
            browser.close()
    except Exception as exc:
        report["critical_errors"].append(f"Playwright: {type(exc).__name__}: {str(exc)[:300]}")
    if report["console_errors"]:
        report["critical_errors"].append("La página produjo errores JavaScript.")
    report["status"] = "passed" if not report["critical_errors"] else "failed"
    report["warnings"].extend(data.get("warnings", []))
    return report
