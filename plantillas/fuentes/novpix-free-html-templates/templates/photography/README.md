# Halvorsen — Photographer Portfolio

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/photography/


A free, immersive photography portfolio template by [ZumaTools](https://zumatools.com). Plain HTML, CSS and
vanilla JavaScript — no build step, no frameworks.

## Pages
- `index.html` — full-screen hero, intro, full-bleed "recent work" gallery, gallery cards, testimonial, CTA
- `galleries.html` — index of all collections
- `gallery.html` — a single collection (duplicate it for each gallery)
- `about.html` — story, process, recognition, gear
- `booking.html` — packages, FAQ and booking form

## Replacing the photos
Every image in `assets/img/photo-*.svg` is a **placeholder** (gradient landscapes with a small camera mark).
Export your photos as JPG or WebP (around 2000px on the long edge, quality ~80) and either:
1. overwrite the files and update extensions, or
2. change each gallery item — the link `href` is the full-size image the lightbox opens, the `<img src>` is
   the thumbnail (can be a smaller file):
   ```html
   <li><a class="lb-item" href="assets/img/iceland-01-large.jpg" data-caption="Tromsø, February">
     <img src="assets/img/iceland-01-small.jpg" alt="Describe the photo" width="1500" height="1000" loading="lazy">
     <span class="tile-cap">Tromsø, February</span></a></li>
   ```
Always set real `width`/`height` so the masonry doesn't jump, and write meaningful `alt` text.

## Lightbox
Opens on click/tap; ← / → keys or swipe to navigate, Esc or swipe down to close. Focus is trapped while
open and returned afterwards. Without JavaScript the links simply open the full image.

## Editing
- **Name / headline:** elements marked `data-zt="brandName"` and `data-zt="heading"`.
- **Colours & fonts:** CSS custom properties at the top of `assets/css/style.css`.
- **Booking form:** set `action` to a [Formspree](https://formspree.io) endpoint, or add
  `data-netlify="true"` and `name="booking"` on Netlify, then remove the `data-demo-form` handler in `main.js`.

## Fonts
Cormorant Garamond and Manrope — SIL Open Font License, via Google Fonts.

## Deploy
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repository, then Settings → Pages.
- **Any host:** upload the files; all paths are relative.

## License
© 2026 Novpix LLC (ZumaTools). MIT License — see `LICENSE`. Placeholder artwork is original and included under the same license.
