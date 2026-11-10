from __future__ import annotations

import json
import io
import re
import threading
import unicodedata
import webbrowser
import copy
import os
import shutil
import zipfile
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from tkinter import BooleanVar, StringVar, Tk, filedialog, messagebox
from tkinter import ttk
from core.maps_extractor import extract_listing
from core.pipeline import generate_site
from core.image_manager import download_listing_photos
from core.data_validator import validate_maps_url
from core.github_publisher import publish_site_folder



ROOT = Path(__file__).resolve().parent
OUT_DIR = ROOT / "salida"

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

TEMPLATES = {
    "Servicios técnicos": {}, "Automotor": {}, "Belleza y estética": {},
    "Salud y cuidado": {}, "Construcción y profesionales": {},
    "Empresas de servicios": {}, "Gastronomía y eventos": {},
    "Negocios profesionales": {},
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower() or "negocio"


TEMPLATE_SOURCES = {
    "100-free-html-templates": ROOT / "plantillas" / "fuentes" / "100-free-html-templates",
    "novpix-free-html-templates": ROOT / "plantillas" / "fuentes" / "novpix-free-html-templates",
    "spicer-designs": ROOT / "plantillas" / "fuentes" / "spicer-designs",
    "uiuxlabz": ROOT / "plantillas" / "fuentes" / "uiuxlabz",
    "zadie": ROOT / "plantillas" / "fuentes" / "zadie" / "plantillas",
    "importadas": ROOT / "plantillas" / "importadas",
}

UIUX_CATALOG = json.loads((ROOT / "plantillas" / "uiuxlabz-catalog.json").read_text(encoding="utf-8"))
ZADIE_CATALOG = json.loads((ROOT / "plantillas" / "fuentes" / "zadie" / "zadie-catalog.json").read_text(encoding="utf-8"))

AUTO_TEMPLATE = "Automática según la categoría de Google Maps"
AUTO_ART = "Automática según el rubro"
ART_LABELS = {
    AUTO_ART: "",
    "Editorial premium": "editorial_premium",
    "Luxury": "luxury",
    "Minimal moderno": "modern_minimal",
    "Corporativo premium": "corporate_premium",
    "Bold creativo": "bold_creative",
    "Orgánico natural": "organic_natural",
    "Elegante oscuro": "dark_elegant",
    "Negocio local contemporáneo": "contemporary_local",
}


def infer_template_family(category: str) -> str:
    """Map the category visible in a Google Maps listing to a relevant design family."""
    value = unicodedata.normalize("NFKD", (category or "").lower()).encode("ascii", "ignore").decode()
    rules = [
        ("Belleza y estética", ("peluquer", "barber", "salon", "hair salon", "estetic", "unas", "nail", "spa", "tattoo", "tatuaj", "depil", "cosmet")),
        ("Automotor", ("automotr", "automovil", "mecanico", "auto mechanic", "auto repair", "auto body", "taller de autom", "gomer", "neumatic", "lavadero de autos", "car wash", "concesionari", "motocic", "grua", "tire shop", "towing")),
        ("Salud y cuidado", ("kinesi", "fisioter", "physiotherap", "physical therap", "medic", "clinic", "hospital", "odont", "dent", "veterin", "vet clinic", "psycholog", "psicolog", "therapist", "terapeut", "nutrition", "nutricion", "optica", "pharmacy", "farmacia", "gimnas", "fitness", "yoga", "pilates", "masaj", "rehabilit", "guarderia de mascotas", "adiestramiento canino")),
        ("Gastronomía y eventos", ("restaur", "cafe", "cafeter", "bar ", "cervec", "panader", "pasteler", "catering", "salon de eventos", "florist", "comida", "pizzer", "helader", "bodega", "vinoteca", "food truck", "eventos", "brewery", "bakery")),
        ("Construcción y profesionales", ("arquitect", "construct", "contractor", "albanil", "carpinter", "techista", "herrero", "electric", "plomer", "plumber", "gasista", "pintor", "impermeabil", "vidrier", "soldador", "paviment", "marmoler", "roofing", "hvac", "fencing", "remodel")),
        ("Negocios profesionales", ("abogad", "law firm", "estudio jurid", "contador", "accountant", "contable", "inmobili", "real estate", "inmueble", "consultor", "consultant", "asesor", "seguros", "financier", "academia", "instituto", "escuela", "school", "tutoring", "notari", "imprenta", "diseno", "diseño", "agencia", "funeraria", "security company", "servicios informaticos")),
        ("Servicios técnicos", ("reparacion", "reparaciones", "tecnico", "cerrajer", "aire acondicion", "refrigeracion", "electrodomest", "computacion", "informatica", "alarma", "porton", "maquina", "ascensor")),
        ("Empresas de servicios", ("limpieza", "fumig", "control de plagas", "jardiner", "mudanza", "flete", "piscina", "pileta", "mantenimiento", "paisaj", "lavander", "limpieza de ventanas", "limpieza de alfombras", "residuos", "desagote", "guardamuebles", "deposito")),
    ]
    for family, keywords in rules:
        if any(keyword in value for keyword in keywords):
            return family
    return "Negocios profesionales"


def preferred_zadie_slug(category: str) -> str:
    """Prefer a Zadie layout that matches the Maps category when one exists."""
    value = unicodedata.normalize("NFKD", (category or "").lower()).encode("ascii", "ignore").decode()
    choices = [
        (("kinesi", "fisioter", "physiotherap", "physical therap", "rehabilit"), "physical-therapy"),
        (("dent", "odont"), "dental-clinic"),
        (("veterin", "mascotas"), "vet-clinic"),
        (("peluquer", "hair salon"), "hair-salon"),
        (("barber",), "barbershop"),
        (("restaur",), "restaurant"), (("cafeter", "coffee"), "coffee-shop"),
        (("panader", "pasteler"), "bakery"), (("plomer", "gasista"), "plumbing"),
        (("electric",), "electrician"), (("mecanico", "taller de autom"), "auto-mechanic"),
        (("gomer", "neumatic"), "tire-shop"), (("abogad", "jurid"), "law-firm"),
        (("contador", "contable"), "accounting"), (("inmobili", "inmueble"), "real-estate"),
        (("limpieza",), "cleaning-service"), (("fumig", "plagas"), "pest-control"),
        (("jardiner", "paisaj"), "landscaping"), (("cerrajer",), "locksmith"),
        (("aire acondicion", "refrigeracion"), "hvac"), (("construct", "contratista"), "general-contractor"),
        (("arquitect",), "architect"), (("peluquer", "estetic"), "hair-salon"),
        (("gimnas", "fitness"), "gym"), (("yoga",), "yoga-studio"),
        (("psicolog", "terapeut"), "therapist"), (("mudanza", "flete"), "moving-company"),
    ]
    for keywords, template_slug in choices:
        if any(keyword in value for keyword in keywords):
            return template_slug
    return ""

SPICER_POOLS = {
    "Servicios técnicos": ["plumber", "electrician", "hvac", "locksmith", "roofing", "painting-contractor"],
    "Automotor": ["auto-repair"],
    "Belleza y estética": ["hair-salon", "barber-shop", "med-spa"],
    "Salud y cuidado": ["dentist", "chiropractor", "veterinarian", "gym"],
    "Construcción y profesionales": ["roofing", "landscaping", "painting-contractor", "flooring"],
    "Empresas de servicios": ["pest-control", "cleaning-service", "moving-company", "tree-service", "pool-service", "garage-door"],
    "Gastronomía y eventos": ["restaurant"],
    "Negocios profesionales": ["law-firm", "real-estate-agent", "accountant", "insurance-agency"],
}

TEMPLATE_POOLS = {
    "Servicios técnicos": [
        ("100-free-html-templates", "local-services/plumber-home-services"),
        ("100-free-html-templates", "local-services/cleaning-company"),
        ("100-free-html-templates", "business/it-service-company"),
        ("novpix-free-html-templates", "templates/business"),
        ("novpix-free-html-templates", "templates/agency"),
    ],
    "Automotor": [
        ("100-free-html-templates", "local-services/auto-repair"),
        ("100-free-html-templates", "real-estate-travel/car-rental"),
        ("novpix-free-html-templates", "templates/business"),
    ],
    "Belleza y estética": [
        ("100-free-html-templates", "health-fitness/spa-salon"),
        ("novpix-free-html-templates", "templates/fitness"),
        ("novpix-free-html-templates", "templates/photography"),
    ],
    "Salud y cuidado": [
        ("100-free-html-templates", "health-fitness/physiotherapy"),
        ("100-free-html-templates", "health-fitness/medical-clinic"),
        ("100-free-html-templates", "health-fitness/dental-clinic"),
        ("novpix-free-html-templates", "templates/fitness"),
    ],
    "Construcción y profesionales": [
        ("100-free-html-templates", "local-services/construction-company"),
        ("100-free-html-templates", "portfolio/architect-portfolio"),
        ("novpix-free-html-templates", "templates/business"),
        ("novpix-free-html-templates", "templates/agency"),
    ],
    "Empresas de servicios": [
        ("100-free-html-templates", "local-services/cleaning-company"),
        ("100-free-html-templates", "local-services/moving-company"),
        ("100-free-html-templates", "local-services/pet-care-vet"),
        ("novpix-free-html-templates", "templates/business"),
    ],
    "Gastronomía y eventos": [
        ("100-free-html-templates", "restaurant/restaurant"),
        ("100-free-html-templates", "restaurant/catering"),
        ("100-free-html-templates", "restaurant/cafe-coffee-shop"),
        ("100-free-html-templates", "restaurant/bakery"),
        ("novpix-free-html-templates", "templates/restaurant"),
        ("novpix-free-html-templates", "templates/event-conference"),
    ],
    "Negocios profesionales": [
        ("100-free-html-templates", "local-services/accounting-firm"),
        ("100-free-html-templates", "local-services/law-firm"),
        ("100-free-html-templates", "business/consulting-firm"),
        ("novpix-free-html-templates", "templates/business"),
        ("novpix-free-html-templates", "templates/real-estate"),
        ("novpix-free-html-templates", "templates/agency"),
    ],
}


def available_template_pool(template_name: str, category: str = "") -> list[tuple[Path, str]]:
    found = []
    preferred_slug = preferred_zadie_slug(category) if category else ""
    zadie_items = [item for item in ZADIE_CATALOG["templates"] if item["family"] == template_name]
    if preferred_slug:
        zadie_items.sort(key=lambda item: item["slug"] != preferred_slug)
    for item in zadie_items:
        source_dir = TEMPLATE_SOURCES["zadie"] / Path(item["relative_path"]).relative_to("plantillas")
        index = next(source_dir.rglob("index.html"), None) if source_dir.exists() else None
        if index:
            found.append((index.parent, "zadie"))
    for source_id, relative in TEMPLATE_POOLS.get(template_name, []):
        source_dir = TEMPLATE_SOURCES[source_id] / Path(relative)
        index = next(source_dir.rglob("index.html"), None) if source_dir.exists() else None
        if index:
            found.append((index.parent, source_id))
    for slug_name in SPICER_POOLS.get(template_name, []):
        source_dir = TEMPLATE_SOURCES["spicer-designs"] / slug_name / f"{slug_name}-template-html"
        if (source_dir / "index.html").is_file():
            found.append((source_dir, "spicer-designs"))
    for repo_name in UIUX_CATALOG["families"].get(template_name, []):
        source_dir = TEMPLATE_SOURCES["uiuxlabz"] / repo_name
        index = next(source_dir.rglob("index.html"), None) if source_dir.exists() else None
        found.append((index.parent if index else source_dir, "uiuxlabz"))
    imported_dir = TEMPLATE_SOURCES["importadas"] / slug(template_name)
    if imported_dir.exists():
        for index in imported_dir.rglob("index.html"):
            found.append((index.parent, "importadas"))
    return found


def download_github_template(repo_name: str, target_dir: Path) -> Path:
    target_dir.parent.mkdir(parents=True, exist_ok=True)
    errors = []
    for branch in ("main", "master"):
        url = f"https://codeload.github.com/uiuxlabz/{repo_name}/zip/refs/heads/{branch}"
        try:
            request = Request(url, headers={"User-Agent": "LandingGenerator/1.0"})
            with urlopen(request, timeout=45) as response:
                archive = zipfile.ZipFile(io.BytesIO(response.read()))
            with __import__("tempfile").TemporaryDirectory() as tmp:
                temp = Path(tmp).resolve()
                for member in archive.infolist():
                    destination = (temp / member.filename).resolve()
                    if destination != temp and temp not in destination.parents:
                        raise ValueError("El ZIP contiene una ruta no válida.")
                    if member.is_dir():
                        destination.mkdir(parents=True, exist_ok=True)
                    else:
                        destination.parent.mkdir(parents=True, exist_ok=True)
                        destination.write_bytes(archive.read(member))
                roots = [p for p in temp.iterdir() if p.is_dir()]
                if not roots:
                    raise ValueError("El repositorio no contiene una carpeta de plantilla.")
                root = roots[0]
                index = next(root.rglob("index.html"), None)
                if index is None:
                    raise ValueError("No se encontró index.html en el repositorio.")
                # Keep the repository root so relative stylesheets/assets still resolve.
                shutil.copytree(root, target_dir, dirs_exist_ok=True)
            return target_dir
        except Exception as exc:
            errors.append(str(exc))
            if target_dir.exists() and not any(target_dir.iterdir()):
                target_dir.rmdir()
    raise RuntimeError(f"No se pudo descargar {repo_name}: {'; '.join(errors)}")


def prepare_template_source(source_dir: Path, source_id: str) -> Path:
    index = next(source_dir.rglob("index.html"), None) if source_dir.exists() else None
    if source_id == "uiuxlabz" and index is None:
        download_github_template(source_dir.name, source_dir)
        index = next(source_dir.rglob("index.html"), None)
    if index is None:
        raise FileNotFoundError(f"No se encontró index.html en la plantilla {source_dir}")
    return index.parent


class App:
    BG = "#080a09"
    CARD = "#101311"
    BORDER = "#292e2b"
    FG = "#f2f4f2"
    MUTED = "#a7ada9"
    GREEN = "#00cf73"

    def __init__(self):
        self.root = Tk()
        self.root.title("Landing Generator · Google Maps")
        self.root.geometry("720x780")
        self.root.minsize(620, 620)
        self.root.configure(bg=self.BG)
        self.url = StringVar()
        self.public_url = StringVar()
        self.api_key = StringVar()
        self.model = StringVar(value=os.getenv("OPENAI_MODEL", "gpt-4.1"))
        self.art_direction = StringVar(value=AUTO_ART)
        self.template = StringVar(value=AUTO_TEMPLATE)
        self.get_info = BooleanVar(value=True)
        self.get_photos = BooleanVar(value=True)
        self.configure_whatsapp = BooleanVar(value=True)
        self.status = StringVar(value="Vista previa local: no se publica automáticamente.")
        self.published_url = StringVar(value="")
        self.last_data = None
        self.variant_count = 0
        self._build()

    def _build(self):
        import tkinter as tk
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("TCombobox", fieldbackground="#080a09", background="#171a18", foreground=self.FG, bordercolor=self.BORDER, arrowcolor=self.MUTED, padding=12)
        shell = tk.Frame(self.root, bg=self.BG)
        shell.pack(fill="both", expand=True, padx=12, pady=12)
        scroll_area = tk.Frame(shell, bg=self.BG)
        scroll_area.pack(fill="both", expand=True)
        scroll_area.grid_rowconfigure(0, weight=1)
        scroll_area.grid_columnconfigure(0, weight=1)
        self.canvas = tk.Canvas(scroll_area, bg=self.BG, highlightthickness=0, borderwidth=0)
        scrollbar = ttk.Scrollbar(scroll_area, orient="vertical", command=self.canvas.yview)
        self.canvas.configure(yscrollcommand=scrollbar.set)
        self.canvas.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")
        outer = tk.Frame(self.canvas, bg=self.CARD, highlightbackground=self.BORDER, highlightthickness=1)
        canvas_window = self.canvas.create_window((0, 0), window=outer, anchor="nw")
        outer.bind("<Configure>", lambda _event: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        self.canvas.bind("<Configure>", lambda event: self.canvas.itemconfigure(canvas_window, width=event.width))
        self.canvas.bind_all("<MouseWheel>", lambda event: self.canvas.yview_scroll(-int(event.delta / 120), "units"))

        self.footer = tk.Frame(shell, bg=self.CARD, highlightbackground=self.BORDER, highlightthickness=1)
        self.footer.pack(fill="x", pady=(8, 0))
        tk.Label(outer, text="LANDING GENERATOR", bg=self.CARD, fg=self.FG, font=("Segoe UI", 12, "bold")).pack(anchor="w", padx=22, pady=(20, 3))
        tk.Label(outer, text="GENERADOR DE SITIOS WEB DESDE UNA FICHA DE MAPS", bg=self.CARD, fg=self.MUTED, font=("Segoe UI", 9)).pack(anchor="w", padx=22, pady=(0, 19))
        self._label(outer, "URL DE GOOGLE MAPS")
        tk.Entry(outer, textvariable=self.url, bg=self.BG, fg=self.FG, insertbackground=self.FG, relief="flat", highlightthickness=1, highlightbackground=self.BORDER, highlightcolor=self.GREEN, font=("Segoe UI", 10)).pack(fill="x", padx=22, ipady=13)
        self._label(outer, "URL PÚBLICA FINAL DEL SITIO (OPCIONAL)")
        tk.Entry(outer, textvariable=self.public_url, bg=self.BG, fg=self.FG, insertbackground=self.FG, relief="flat", highlightthickness=1, highlightbackground=self.BORDER, highlightcolor=self.GREEN, font=("Segoe UI", 10)).pack(fill="x", padx=22, ipady=11)
        tk.Label(outer, text="Al publicarlo, pega aquí la URL HTTPS definitiva para generar canonical, Open Graph y sitemap. Sin ella, la vista previa queda en noindex.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8), wraplength=580, justify="left").pack(anchor="w", padx=22, pady=(5, 0))
        self._label(outer, "API KEY DE OPENAI (OPCIONAL)")
        tk.Entry(outer, textvariable=self.api_key, show="●", bg=self.BG, fg=self.FG, insertbackground=self.FG, relief="flat", highlightthickness=1, highlightbackground=self.BORDER, highlightcolor=self.GREEN, font=("Segoe UI", 10)).pack(fill="x", padx=22, ipady=11)
        tk.Label(outer, text="Si queda vacía, se redacta en modo local. La clave no se guarda; al usar IA se envían los datos visibles de la ficha a OpenAI y puede haber cargos de API.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8), wraplength=580, justify="left").pack(anchor="w", padx=22, pady=(6, 0))
        self._label(outer, "MODELO DE OPENAI")
        ttk.Combobox(outer, textvariable=self.model, values=["gpt-4.1", "gpt-4.1-mini"], state="readonly").pack(fill="x", padx=22, ipady=3)
        self._label(outer, "PLANTILLA")
        combo = ttk.Combobox(outer, textvariable=self.template, values=[AUTO_TEMPLATE, *TEMPLATES], state="readonly")
        combo.pack(fill="x", padx=22, ipady=3)
        tk.Label(outer, text="En modo automático se elige una plantilla según el rubro detectado en Google Maps.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8), wraplength=580, justify="left").pack(anchor="w", padx=22, pady=(6, 0))
        self._label(outer, "DIRECCIÓN ARTÍSTICA")
        ttk.Combobox(outer, textvariable=self.art_direction, values=list(ART_LABELS), state="readonly").pack(fill="x", padx=22, ipady=3)
        tk.Label(outer, text="La IA elige una dirección o puedes fijarla manualmente para regenerar variaciones.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8), wraplength=580, justify="left").pack(anchor="w", padx=22, pady=(6, 0))
        self._label(outer, "DATOS DEL NEGOCIO Y TONO (OPCIONAL)")
        self.notes = tk.Text(outer, height=3, wrap="word", bg=self.BG, fg=self.FG, insertbackground=self.FG, relief="flat", highlightthickness=1, highlightbackground=self.BORDER, highlightcolor=self.GREEN, font=("Segoe UI", 9))
        self.notes.pack(fill="x", padx=22)
        self.notes.insert("1.0", "Ej.: servicios confirmados, público al que atiende, estilo de comunicación o detalles que no figuran en Maps.")
        self.notes.configure(fg="#79827c")
        self.notes.bind("<FocusIn>", self._clear_notes_placeholder)
        self.notes.bind("<FocusOut>", self._restore_notes_placeholder)
        tk.Label(outer, text="La IA usará estas notas junto con la ficha; escribe solo datos que hayas confirmado.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8), wraplength=580, justify="left").pack(anchor="w", padx=22, pady=(5, 0))
        self._label(outer, "DATOS")
        self._check(outer, "Extraer información visible de la ficha", self.get_info)
        self._check(outer, "Incluir fotografías disponibles en Maps", self.get_photos)
        self._check(outer, "Configurar botón de WhatsApp con el teléfono", self.configure_whatsapp)
        actions = tk.Frame(self.footer, bg=self.CARD)
        actions.pack(fill="x", padx=12, pady=(10, 0))
        self.generate_btn = tk.Button(actions, text="✧  GENERAR LANDING PAGE", command=self.generate, bg="#171a18", fg=self.FG, activebackground="#202521", activeforeground=self.GREEN, relief="flat", font=("Segoe UI", 10, "bold"), pady=13, cursor="hand2")
        self.generate_btn.pack(side="left", fill="x", expand=True, padx=(0, 7))
        self.regenerate_btn = tk.Button(actions, text="↻  REGENERAR", command=self.regenerate, bg="#123d30", fg="#dcf7e9", activebackground="#18553f", activeforeground="white", relief="flat", font=("Segoe UI", 9, "bold"), pady=13, cursor="hand2", state="disabled")
        self.regenerate_btn.pack(side="left", padx=(7, 0))
        publish_actions = tk.Frame(self.footer, bg=self.CARD)
        publish_actions.pack(fill="x", padx=12, pady=(7, 0))
        self.publish_btn = tk.Button(publish_actions, text="↑  SUBIR PÁGINA WEB", command=self.publish_page, bg="#075c43", fg="white", activebackground="#087553", activeforeground="white", relief="flat", font=("Segoe UI", 9, "bold"), pady=11, cursor="hand2")
        self.publish_btn.pack(fill="x")
        tk.Label(publish_actions, text="Crea un repositorio público y configura GitHub Pages automáticamente.", bg=self.CARD, fg="#7f8983", font=("Segoe UI", 8)).pack(anchor="w", pady=(4, 0))
        library_actions = tk.Frame(self.footer, bg=self.CARD)
        library_actions.pack(fill="x", padx=12, pady=(7, 0))
        self.download_templates_btn = tk.Button(library_actions, text="↓ Descargar referencias visuales", command=self.download_category, bg="#171a18", fg="#cde8d7", activebackground="#202521", activeforeground="white", relief="flat", font=("Segoe UI", 8, "bold"), pady=9, cursor="hand2")
        self.download_templates_btn.pack(side="left", fill="x", expand=True, padx=(0, 4))
        tk.Button(library_actions, text="＋ Importar ZIP", command=self.import_template_zip, bg="#171a18", fg="#cde8d7", activebackground="#202521", activeforeground="white", relief="flat", font=("Segoe UI", 8, "bold"), pady=9, cursor="hand2").pack(side="left", padx=4)
        tk.Button(library_actions, text="Catálogo Zadie ↗", command=lambda: webbrowser.open("https://zadie.com/templates/"), bg="#171a18", fg="#cde8d7", activebackground="#202521", activeforeground="white", relief="flat", font=("Segoe UI", 8, "bold"), pady=9, cursor="hand2").pack(side="left", padx=(4, 0))
        tk.Label(self.footer, textvariable=self.status, bg=self.CARD, fg=self.MUTED, font=("Segoe UI", 9), wraplength=580).pack(pady=(8, 1), padx=12)
        self.published_link_label = tk.Label(self.footer, textvariable=self.published_url, bg=self.CARD, fg="#69d7a5", font=("Segoe UI", 9, "underline"), cursor="hand2", wraplength=580, justify="left")
        self.published_link_label.bind("<Button-1>", lambda _event: webbrowser.open(self.published_url.get()) if self.published_url.get() else None)
        tk.Label(self.footer, text="Regenerar conserva todas las versiones", bg=self.CARD, fg="#747b76", font=("Segoe UI", 8)).pack(pady=(0, 8))

    def _label(self, parent, text):
        import tkinter as tk
        tk.Label(parent, text=text, bg=self.CARD, fg="#c4cac6", font=("Segoe UI", 9, "bold")).pack(anchor="w", padx=22, pady=(17, 7))

    def _clear_notes_placeholder(self, _event=None):
        if self.notes.get("1.0", "end").strip().startswith("Ej.:"):
            self.notes.delete("1.0", "end")
            self.notes.configure(fg=self.FG)

    def _restore_notes_placeholder(self, _event=None):
        if not self.notes.get("1.0", "end").strip():
            self.notes.insert("1.0", "Ej.: servicios confirmados, público al que atiende, estilo de comunicación o detalles que no figuran en Maps.")
            self.notes.configure(fg="#79827c")

    def _check(self, parent, text, variable):
        import tkinter as tk
        tk.Checkbutton(parent, text=text, variable=variable, bg=self.CARD, fg=self.FG, activebackground=self.CARD, activeforeground=self.GREEN, selectcolor=self.BG, font=("Segoe UI", 9), anchor="w").pack(fill="x", padx=22, pady=2)

    def generate(self):
        url = self.url.get().strip()
        if not validate_maps_url(url)[0]:
            messagebox.showerror("Enlace no válido", "Pega la URL completa de una ficha de Google Maps.")
            return
        if not self.get_info.get():
            messagebox.showinfo("Información necesaria", "Activa la extracción de información para generar una landing con los datos del negocio.")
            return
        from core.seo_generator import public_site_url
        public_url = self.public_url.get().strip()
        if public_url and not public_site_url(public_url):
            messagebox.showerror("URL pública no válida", "Usa la URL HTTPS final de la landing, por ejemplo https://www.negocio.com/.")
            return
        self.last_data = None
        self._set_busy(True, "EXTRAYENDO DATOS…")
        self.status.set("Abriendo la ficha en el navegador. Espera a que termine de cargar…")
        owner_notes = self._get_owner_notes()
        threading.Thread(target=self._work, args=(url, self.get_photos.get(), self.template.get(), self.configure_whatsapp.get(), 0, True, self.api_key.get().strip() or os.getenv("OPENAI_API_KEY", ""), owner_notes, self.model.get(), ART_LABELS[self.art_direction.get()], public_url), daemon=True).start()

    def regenerate(self):
        if not self.last_data:
            messagebox.showinfo("Primero genera una página", "Pega una URL, elige la plantilla y genera el primer borrador. Después podrás regenerarlo sin volver a extraer los datos.")
            return
        data = copy.deepcopy(self.last_data)
        data["owner_notes"] = self._get_owner_notes()
        if not self.get_photos.get():
            data["photos"] = []
        self.variant_count += 1
        self._set_busy(True, "CREANDO OTRA VERSIÓN…")
        threading.Thread(target=self._work, args=(data, self.get_photos.get(), self.template.get(), self.configure_whatsapp.get(), self.variant_count, False, self.api_key.get().strip() or os.getenv("OPENAI_API_KEY", ""), data.get("owner_notes", ""), self.model.get(), ART_LABELS[self.art_direction.get()], self.public_url.get().strip() or data.get("public_url", "")), daemon=True).start()

    def _get_owner_notes(self):
        value = self.notes.get("1.0", "end").strip()
        return "" if value.startswith("Ej.:") else value

    def download_category(self):
        family = self.template.get()
        if family == AUTO_TEMPLATE:
            if not self.last_data:
                messagebox.showinfo("Categoría automática", "Genera primero una página para obtener la categoría visible en Google Maps, o selecciona manualmente una familia.")
                return
            family = infer_template_family(self.last_data.get("category", ""))
        repos = UIUX_CATALOG["families"].get(family, [])
        if not repos:
            messagebox.showinfo("Catálogo vacío", "No hay plantillas de GitHub asociadas a esta categoría.")
            return
        self.download_btn_state(True)
        self.status.set(f"Descargando {len(repos)} plantillas de UIUXLabz para {family}…")
        threading.Thread(target=self._download_category_worker, args=(family, repos), daemon=True).start()

    def download_btn_state(self, busy):
        self.generate_btn.configure(state="disabled" if busy else "normal")
        self.regenerate_btn.configure(state="disabled" if busy or not self.last_data else "normal")
        self.publish_btn.configure(state="disabled" if busy else "normal")
        self.download_templates_btn.configure(state="disabled" if busy else "normal")

    def publish_page(self):
        initial = OUT_DIR if OUT_DIR.is_dir() else ROOT
        folder = filedialog.askdirectory(title="Selecciona la carpeta de la landing dentro de salida", initialdir=str(initial), mustexist=True)
        if not folder:
            return
        selected = Path(folder)
        if not (selected / "index.html").is_file():
            messagebox.showerror("Carpeta no válida", "Selecciona la carpeta de una página generada que tenga index.html en la raíz.")
            return
        self.published_url.set("")
        self.published_link_label.pack_forget()
        self.download_btn_state(True)
        self.status.set("Preparando la publicación en GitHub…")
        threading.Thread(target=self._publish_worker, args=(selected,), daemon=True).start()

    def _publish_worker(self, folder):
        try:
            result = publish_site_folder(
                folder,
                progress=lambda text: self.root.after(0, lambda message=text: self.status.set(message)),
            )
            self.root.after(0, lambda: self._publish_done(result))
        except Exception as exc:
            self.root.after(0, lambda error=str(exc): self._publish_error(error))

    def _publish_done(self, result):
        self.download_btn_state(False)
        site_url = result["site_url"] + "/"
        self.public_url.set(site_url)
        self.published_url.set("Abrir sitio publicado: " + site_url)
        self.published_link_label.pack(anchor="w", padx=12, pady=(0, 6))
        state = (
            "GitHub Pages publicó el sitio."
            if result["ready"] else
            "GitHub Pages reportó un error de compilación; revisa la configuración y el estado del despliegue."
            if result["build_status"] == "errored" else
            "GitHub Pages quedó configurado; el despliegue sigue en proceso."
        )
        suffix = " El nombre original ya existía, así que se creó el siguiente disponible." if result["renamed"] else ""
        self.status.set(f"{state}{suffix}\nRepositorio: {result['repo_url']}\nSitio: {result['site_url']}/")
        messagebox.showinfo(
            "Página subida a GitHub",
            f"{state}{suffix}\n\nRepositorio público:\n{result['repo_url']}\n\nPágina web:\n{result['site_url']}/\n\nLos despliegues nuevos pueden tardar unos minutos en quedar disponibles.",
        )
        webbrowser.open(result["site_url"] if result["ready"] else result["repo_url"] + "/settings/pages")

    def _publish_error(self, text):
        self.download_btn_state(False)
        self.status.set("No se pudo completar la publicación en GitHub.")
        messagebox.showerror("No se pudo subir la página", text)

    def _download_category_worker(self, family, repos):
        completed, errors = 0, []
        for number, repo_name in enumerate(repos, 1):
            target = TEMPLATE_SOURCES["uiuxlabz"] / repo_name
            if (target / "index.html").is_file():
                completed += 1
                continue
            self.root.after(0, lambda n=number, total=len(repos), name=repo_name: self.status.set(f"Descargando plantilla {n}/{total}: {name}"))
            try:
                download_github_template(repo_name, target)
                completed += 1
            except Exception as exc:
                errors.append(f"{repo_name}: {exc}")
        self.root.after(0, lambda: self._download_done(family, completed, len(repos), errors))

    def _download_done(self, family, completed, total, errors):
        self.download_btn_state(False)
        summary = f"Catálogo {family}: {completed}/{total} referencias disponibles. La generación usa el renderer propio con dirección de IA."
        if errors:
            summary += f" Fallaron {len(errors)} descargas; revisa la conexión."
        self.status.set(summary)
        if errors:
            messagebox.showwarning("Biblioteca parcialmente descargada", summary + "\n\n" + "\n".join(errors[:5]))
        else:
            messagebox.showinfo("Plantillas listas", summary)

    def import_template_zip(self):
        archive_path = filedialog.askopenfilename(title="Elige un ZIP de plantilla", filetypes=[("ZIP", "*.zip")])
        if not archive_path:
            return
        family = self.template.get()
        safe_name = slug(Path(archive_path).stem)
        target = TEMPLATE_SOURCES["importadas"] / slug(family) / safe_name
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with zipfile.ZipFile(archive_path) as archive, __import__("tempfile").TemporaryDirectory() as tmp:
                temp = Path(tmp).resolve()
                for member in archive.infolist():
                    destination = (temp / member.filename).resolve()
                    if destination != temp and temp not in destination.parents:
                        raise ValueError("El ZIP contiene una ruta no válida.")
                    if member.is_dir():
                        destination.mkdir(parents=True, exist_ok=True)
                    else:
                        destination.parent.mkdir(parents=True, exist_ok=True)
                        destination.write_bytes(archive.read(member))
                index = next(temp.rglob("index.html"), None)
                if index is None:
                    raise ValueError("No encontré un index.html dentro del ZIP.")
                template_root = index.parent
                if target.exists():
                    target = target.with_name(target.name + "-" + datetime.now().strftime("%H%M%S%f"))
                shutil.copytree(template_root, target)
            self.status.set(f"Referencia agregada al catálogo: {target}")
            messagebox.showinfo("Referencia importada", f"Se agregó a {family}. El motor no copia textos, imágenes demo ni scripts de esta plantilla; revisa su licencia si reutilizas algún recurso.\n\n{target}")
        except Exception as exc:
            messagebox.showerror("No se pudo importar", str(exc))

    def _set_busy(self, busy, text=None):
        self.generate_btn.configure(state="disabled" if busy else "normal", text=text or "✧  GENERAR OTRA LANDING PAGE")
        self.regenerate_btn.configure(state="disabled" if busy or not self.last_data else "normal")
        self.publish_btn.configure(state="disabled" if busy else "normal")
        self.download_templates_btn.configure(state="disabled" if busy else "normal")

    def _work(self, payload, get_photos, template_name, use_whatsapp, variant, should_extract, api_key="", owner_notes="", model="gpt-4.1", direction="", public_url=""):
        try:
            source_data = extract_listing(payload, get_photos) if should_extract else payload
            if owner_notes:
                source_data["owner_notes"] = owner_notes
            data = copy.deepcopy(source_data)
            if public_url:
                data["public_url"] = public_url
            if template_name == AUTO_TEMPLATE:
                template_name = infer_template_family(data.get("category", ""))
            if should_extract:
                previous = [p for p in OUT_DIR.glob(slug(data.get("name", "")) + "-*") if p.is_dir()]
                variant = max(variant, len(previous))
            self.root.after(0, lambda: self.status.set("Redactando contenido con IA…" if api_key else "Preparando landing con el contenido local…"))
            folder, data, content = generate_site(data, template_name, OUT_DIR, variant, api_key, model, use_whatsapp, download_listing_photos if get_photos else None, direction)
            self.root.after(0, lambda: self._done(folder, data, source_data, template_name, variant, content))
        except Exception as exc:
            self.root.after(0, lambda: self._error(str(exc)))

    def _done(self, folder, data, source_data, template_name, variant, content):
        self.last_data = copy.deepcopy(source_data)
        self.variant_count = variant
        self._set_busy(False)
        mode = "IA" if content.get("source") in {"openai", "openai_cache"} else ("modo local (IA no disponible)" if content.get("api_error") else "modo local")
        report = json.loads((folder / "quality_report.json").read_text(encoding="utf-8"))
        quality = "QA aprobado" if report.get("status") == "passed" else "QA requiere revisión"
        self.status.set(f"{mode} · {quality} · dirección {content.get('art_direction')}\nGuardada: {folder}\nLas versiones anteriores se conservan en salida/.")
        webbrowser.open((folder / "index.html").as_uri())
        notice = f"\n\nLa IA no respondió; se usó el modo local. Detalle: {content['api_error']}" if content.get("api_error") else ""
        messagebox.showinfo("Landing creada", f"Borrador de {data['name']} listo.\nModo: {mode}.\nControl: {quality}.{notice}\n\nNo se borró ninguna versión anterior.\n\nCarpeta:\n{folder}")

    def _error(self, text):
        self._set_busy(False, "✧  GENERAR LANDING PAGE")
        self.status.set("No se pudo extraer la ficha. Revisa la URL y vuelve a intentarlo.")
        messagebox.showerror("No se pudo generar", text)

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    App().run()
