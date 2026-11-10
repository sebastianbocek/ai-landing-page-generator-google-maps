# Mara — Designer & Illustrator Portfolio

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/designer-portfolio/


A free, editorial-style portfolio template by [ZumaTools](https://zumatools.com). Plain HTML, CSS and a
little vanilla JavaScript — no build step, no frameworks.

## Pages
- `index.html` — hero, selected work grid (hover reveals), about, services, clients & testimonial, contact form
- `project.html` — case study layout (facts, cover, challenge/approach, gallery, results, next project)

## Editing
- **Text:** open the HTML files in any editor and replace the copy. Your name appears in elements marked
  `data-zt="brandName"`; the main headline is marked `data-zt="heading"`.
- **Colours & fonts:** all theme values live in CSS custom properties at the top of `assets/css/style.css`
  (`--brand`, `--accent`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`).
- **Images:** the artwork in `assets/img/` is original placeholder SVG. Replace `work-*.svg` with your own
  project images (JPG/WebP work too — just update the `src`, `width`/`height` and `alt`), and
  `portrait.svg` with your photo.
- **Add a project:** duplicate a `<li class="work">` block in `index.html`, and copy `project.html` for the case study.
- **Contact form:** set the form `action` to a [Formspree](https://formspree.io) endpoint, or add
  `data-netlify="true"` and `name="contact"` when hosting on Netlify. Then remove the demo handler in
  `assets/js/main.js` (the `data-demo-form` block).

## Fonts
- Fraunces (SIL Open Font License) — Google Fonts
- Inter (SIL Open Font License) — Google Fonts

## Deploy
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repository, then Settings → Pages → deploy from branch.
- **Any host:** upload the files via FTP/SFTP; all paths are relative.

## Credits & license
Design, code and illustrations © 2026 Novpix LLC (ZumaTools), released under the MIT License (see `LICENSE`).
