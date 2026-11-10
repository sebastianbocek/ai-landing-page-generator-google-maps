# Ember & Olive — Restaurant & café website template

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/restaurant/


A warm, appetising two-page site for restaurants, cafés, bistros and wine bars.
Free from [ZumaTools](https://zumatools.com/). Plain HTML + CSS + a little vanilla JS — no build step.

## Pages
- `index.html` — hero, story, signature dishes, gallery, reviews, reservations + opening hours, map/visit block, private-dining CTA
- `menu.html` — full menu with category tabs, dietary tags (V, VG, GF, DF, spicy) and filter buttons

## Editing
- **Colours & fonts:** change the custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--bg`, `--dark`, `--font-display`…). Everything derives from them.
- **Name & headline:** search for `data-zt="brandName"` and `data-zt="heading"`.
- **Menu items:** each dish is an `<li class="menu-item" data-tags="v gf">`. The `data-tags` values drive the filter buttons.
- **Images:** the food art in `assets/img/` is original SVG. Replace with your own photos (keep the same filenames or update the `src`). Square images work best.
- **Opening hours:** edit the `#hours` list; `data-day` is 0 (Sunday) – 6 (Saturday) and is used to highlight today.
- **Map:** the map is a static illustration (no tracking). Swap it for an embed if you like.

## Forms
Forms use `action="#"` and show a demo message. To receive submissions:
- **Formspree:** set `action="https://formspree.io/f/your-id"` and remove the JS `preventDefault` block in `main.js`.
- **Netlify Forms:** add `data-netlify="true"` and a `name` attribute to the `<form>`.

## Fonts
Fraunces and DM Sans from Google Fonts (SIL Open Font License).

## Deploy
- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repo, enable Pages on the main branch
- **Any host:** upload the files — all URLs are relative.

## Credits & licence
Design, code and illustrations © 2026 Novpix LLC (ZumaTools), released under the MIT licence (see `LICENSE`).
