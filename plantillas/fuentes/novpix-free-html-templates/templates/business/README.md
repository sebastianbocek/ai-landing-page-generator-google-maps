# Meridian — Corporate & consulting website template

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/business/


A trustworthy, crisp four-page site for consulting firms, agencies, accountants, law and other
professional-services businesses. Free from [ZumaTools](https://zumatools.com/).
Plain HTML + CSS + a little vanilla JS — no build step.

## Pages
- `index.html` — value proposition, client logos, services, stats band, process, case studies, testimonials, team, CTA
- `services.html` — four service practices with deliverables, engagement/pricing models, FAQ
- `about.html` — story, numbers, values, timeline, partners
- `contact.html` — contact form (with service chips; `contact.html?service=digital` pre-selects one), contact details, office map blocks

## Editing
- **Colours & fonts:** custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--navy`, `--bg`, `--font-display`, `--font-body`).
- **Brand & headline:** search for `data-zt="brandName"` and `data-zt="heading"`. The header/footer are repeated in each page — update all four.
- **Stats:** numbers use `data-count` and count up when scrolled into view (disabled with reduced motion).
- **Images:** portraits, case-study art and service illustrations in `assets/img/` are original SVG placeholders — swap in your own photos with the same filenames.
- **Client logos:** the logo row uses fictional wordmarks; replace with logos you have permission to use.

## Forms
Forms use `action="#"` with `data-demo` and show a friendly demo message. To receive submissions:
- **Formspree:** set `action="https://formspree.io/f/your-id"` and remove `data-demo`.
- **Netlify Forms:** add `data-netlify="true"` and a `name`, and remove `data-demo`.

## Fonts
Plus Jakarta Sans and Inter from Google Fonts (SIL Open Font License).

## Deploy
Netlify Drop (drag the folder to https://app.netlify.com/drop), GitHub Pages, or any static host — all URLs are relative.

## Credits & licence
Design, code and illustrations © 2026 Novpix LLC (ZumaTools), MIT licence (see `LICENSE`).
