from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from core.business_analyzer import analyze_business
from core.data_cleaner import business_cache_key, normalize_business, normalize_phone_ar
from core.data_validator import validate_maps_url
from core.design_director import ART_DIRECTIONS, PALETTES, local_design_spec, validate_design_spec
from core.html_renderer import render_html
from core.image_manager import download_listing_photos
from core.openai_engine import build_design_spec
from core.pipeline import generate_site
from core.quality_checker import check_site
from core.reviews_processor import is_interface_text, process_reviews
from core.maps_extractor import EXTRACTION_JS
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
FIXTURE = json.loads((ROOT / "fixtures" / "sample_business.json").read_text(encoding="utf-8"))


class DataTests(unittest.TestCase):
    def test_phone_mobile_and_fixed(self):
        self.assertEqual(normalize_phone_ar("011 15-5555-0123")[0], "+5491155550123")
        self.assertEqual(normalize_phone_ar("+54 9 11 5555 0123")[0], "+5491155550123")
        self.assertEqual(normalize_phone_ar("invalid")[0], "")
        self.assertEqual(normalize_phone_ar("+1 415 555 0100")[0], "")

    def test_social_website_is_not_business_website(self):
        result = normalize_business({**FIXTURE, "website": "https://www.instagram.com/demo"})
        self.assertEqual(result["website"], "")

    def test_review_filter_rejects_ui_and_duplicates(self):
        reviews, stats = process_reviews(FIXTURE["reviews"], FIXTURE["source_url"])
        self.assertEqual(len(reviews), 1)
        self.assertEqual(stats["rejected"], 2)
        self.assertTrue(all(item["source"] == FIXTURE["source_url"] for item in reviews))
        self.assertTrue(is_interface_text("Foto de cliente"))
        self.assertTrue(is_interface_text("Compartir"))

    def test_maps_url_validation(self):
        self.assertTrue(validate_maps_url(FIXTURE["source_url"])[0])
        self.assertFalse(validate_maps_url("https://example.com")[0])

    def test_missing_facts_are_left_blank_and_reported(self):
        data = analyze_business({"name": "Negocio de prueba", "source_url": FIXTURE["source_url"]}, "Salud y cuidado")
        spec = local_design_spec(data, "Salud y cuidado")
        html = render_html(data, spec)
        self.assertIn("description", data["missing_fields"])
        self.assertIn("phone", data["missing_fields"])
        self.assertEqual(data["whatsapp_url"], "")
        self.assertEqual(data["reviews"], [])
        self.assertEqual(spec["services"], [])
        self.assertNotIn("wa.me/", html)
        self.assertNotIn("<blockquote", html)

    def test_cache_key_stable_and_variant_sensitive(self):
        a = business_cache_key(FIXTURE, "gpt-4.1", "Salud y cuidado", 0)
        self.assertEqual(a, business_cache_key(FIXTURE, "gpt-4.1", "Salud y cuidado", 0))
        self.assertNotEqual(a, business_cache_key(FIXTURE, "gpt-4.1", "Salud y cuidado", 1))


class DesignTests(unittest.TestCase):
    def test_local_spec_matches_schema_constraints(self):
        validate_design_spec(local_design_spec(FIXTURE, "Salud y cuidado", 0))

    def test_all_art_directions_have_distinct_visual_systems(self):
        self.assertEqual(len(ART_DIRECTIONS), 8)
        self.assertEqual(len({PALETTES[name][3] for name in ART_DIRECTIONS}), 8)
        data = analyze_business(FIXTURE, "Salud y cuidado")
        rendered = [render_html(data, {**local_design_spec(data, "Salud y cuidado", i), "art_direction": direction}) for i, direction in enumerate(ART_DIRECTIONS)]
        self.assertEqual(len({html.split('class="art-', 1)[1].split('"', 1)[0] for html in rendered}), 8)

    def test_openai_design_spec_cache_avoids_second_call(self):
        from types import SimpleNamespace
        from unittest.mock import Mock
        spec = local_design_spec(FIXTURE, "Salud y cuidado", 0)
        spec.pop("source", None)
        usage = SimpleNamespace(input_tokens=123, output_tokens=45)
        response = SimpleNamespace(output_text=json.dumps(spec, ensure_ascii=False), usage=usage)
        responses = SimpleNamespace(create=Mock(return_value=response))
        with tempfile.TemporaryDirectory() as tmp, patch("openai.OpenAI", return_value=SimpleNamespace(responses=responses)):
            first = build_design_spec(FIXTURE, "Salud y cuidado", "test-key", usage_dir=Path(tmp))
            second = build_design_spec(FIXTURE, "Salud y cuidado", "test-key", usage_dir=Path(tmp))
        self.assertEqual(responses.create.call_count, 1)
        self.assertEqual(first["usage"]["input_tokens"], 123)
        self.assertEqual(second["source"], "openai_cache")

    def test_renderer_escapes_data_and_has_whatsapp(self):
        data = analyze_business(FIXTURE, "Salud y cuidado")
        data["name"] = '<script>alert("x")</script>'
        html = render_html(data, local_design_spec(data, "Salud y cuidado", 0))
        self.assertNotIn('<script>alert("x")</script>', html)
        self.assertIn("https://wa.me/5491155550123", html)
        self.assertIn("tel:+5491155550123", html)
        self.assertIn("application/ld+json", html)

    def test_renderer_keeps_valid_reviews_even_if_ai_section_plan_omits_them(self):
        data = analyze_business(FIXTURE, "Salud y cuidado")
        spec = local_design_spec(data, "Salud y cuidado")
        spec["sections"] = ["introduction", "contact"]
        html = render_html(data, spec)
        self.assertIn("La atención fue clara y amable durante la consulta.", html)
        self.assertIn("Ver opiniones originales en Google Maps", html)

    def test_renderer_prioritizes_photo_hero_and_builds_rich_local_sections(self):
        data = analyze_business(FIXTURE, "Salud y cuidado")
        data["photos"] = ["assets/photo-1.webp", "assets/photo-2.webp"]
        spec = local_design_spec(data, "Salud y cuidado")
        spec["layout"] = "centered"
        spec["sections"] = ["introduction", "contact"]
        html = render_html(data, spec)
        self.assertIn('class="art-', html)
        self.assertIn("layout-split", html)
        self.assertIn('id="ubicacion"', html)
        self.assertIn("FOTOS DEL NEGOCIO", html)
        self.assertIn("location reveal", html)
        self.assertIn("IntersectionObserver", html)
        self.assertIn("prefers-reduced-motion", html)

    def test_maps_photo_collector_accepts_square_gallery_backgrounds(self):
        markup = '''<main role="main">
          <div style="width:220px;height:180px;background-image:url('https://lh3.googleusercontent.com/p/business-photo=w120-h100')"></div>
          <div style="width:240px;height:180px;background-image:url('https://maps.googleapis.com/map-tile')"></div>
          <img alt="Foto de usuario" src="https://lh3.googleusercontent.com/p/avatar" width="40" height="40">
        </main>'''
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.set_content(markup)
            result = page.evaluate(EXTRACTION_JS)
            browser.close()
        self.assertEqual(result["images"], ["https://lh3.googleusercontent.com/p/business-photo=w120-h100"])

    def test_photo_manager_saves_maps_photo_as_local_webp(self):
        from io import BytesIO
        from unittest.mock import MagicMock
        from PIL import Image
        image_buffer = BytesIO()
        Image.new("RGB", (300, 200), "#557766").save(image_buffer, "PNG")
        response = MagicMock()
        response.__enter__.return_value = response
        response.headers.get_content_type.return_value = "image/png"
        response.read.return_value = image_buffer.getvalue()
        source = "https://lh3.googleusercontent.com/p/business=w240-h160-k-no"
        with tempfile.TemporaryDirectory() as tmp, patch("core.image_manager.urlopen", return_value=response) as opener:
            files = download_listing_photos({"photos": [source]}, Path(tmp))
            self.assertEqual(files, ["foto-01.webp"])
            self.assertTrue((Path(tmp) / files[0]).is_file())
            manifest = json.loads((Path(tmp) / "image_manifest.json").read_text(encoding="utf-8"))
        self.assertIn("=w1600-h1200", opener.call_args.args[0].full_url)
        self.assertEqual(manifest[0]["status"], "saved_maps_photo_review_rights_before_publication")

    def test_api_error_is_sanitized_and_falls_back(self):
        class BrokenResponses:
            def create(self, **_kwargs):
                raise RuntimeError("network fixture failure")
        class BrokenClient:
            responses = BrokenResponses()
        with patch("openai.OpenAI", return_value=BrokenClient()):
            with self.assertRaisesRegex(RuntimeError, "OpenAI"):
                build_design_spec(FIXTURE, "Salud y cuidado", "test-key-never-log")

    def test_pipeline_writes_output_schema_and_qa(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder, data, spec = generate_site(FIXTURE, "Salud y cuidado", Path(tmp) / "salida")
            self.assertTrue((folder / "index.html").is_file())
            self.assertTrue((folder / "business_data.json").is_file())
            self.assertTrue((folder / "design_spec.json").is_file())
            report = json.loads((folder / "quality_report.json").read_text(encoding="utf-8"))
            self.assertEqual(len(report["viewport_checks"]), 5)
            self.assertEqual(report["status"], "passed", report["critical_errors"])
            self.assertTrue(all(not item["horizontal_overflow"] for item in report["viewport_checks"].values()))
            self.assertTrue(report["interactive_checks"].get("mobile_menu"))
            self.assertTrue(data["test_data"])
            self.assertIn(spec["art_direction"], {"editorial_premium", "luxury", "modern_minimal", "corporate_premium", "bold_creative", "organic_natural", "dark_elegant", "contemporary_local"})

    def test_broken_image_is_critical(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            data = analyze_business(FIXTURE, "Salud y cuidado")
            spec = local_design_spec(data, "Salud y cuidado")
            data["photos"] = ["file:///nonexistent-test-photo.webp"]
            (folder / "index.html").write_text(render_html(data, spec), encoding="utf-8")
            report = check_site(folder, data, screenshots=False)
            self.assertEqual(report["status"], "failed")
            self.assertIn("Hay imágenes rotas.", report["critical_errors"])


if __name__ == "__main__":
    unittest.main()
