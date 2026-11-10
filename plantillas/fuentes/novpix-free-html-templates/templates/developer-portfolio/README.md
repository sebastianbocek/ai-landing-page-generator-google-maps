# Terminal — Developer Résumé & Portfolio

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/developer-portfolio/


A free one-page résumé site for developers by [ZumaTools](https://zumatools.com). Plain HTML, CSS and a
little vanilla JavaScript — no build step, no frameworks.

## What's inside
- Terminal-style hero with download / print buttons
- Summary with KPIs, experience timeline, project cards with tech tags, skills, open-source stats and a
  (static) contribution heatmap, education, contact form
- Light/dark toggle — follows the system setting until the visitor chooses, then remembers it in `localStorage`
- **Print stylesheet:** `Ctrl/Cmd + P` (or the "Print this CV" button) produces a clean 1–2 page A4 CV —
  navigation, terminal and contact form are hidden, colours switch to ink-friendly.

## Editing
- **Text:** edit `index.html`. Your handle appears in elements marked `data-zt="brandName"`, the headline is
  `data-zt="heading"`. Update the hidden `<p class="print-name">` too — it's the name printed at the top of the CV.
- **Résumé PDF:** drop your PDF next to `index.html` as `resume.pdf` (or change the link's `href`).
- **Colours & fonts:** CSS custom properties at the top of `assets/css/style.css`. Light values are in `:root`,
  dark values in `:root[data-theme="dark"]` and the `prefers-color-scheme` block — change both.
- **Heatmap:** generated from a fixed seed in `assets/js/main.js`; delete the `.heatmap-card` figure if you
  don't want it.
- **Contact form:** set `action` to a [Formspree](https://formspree.io) endpoint or add `data-netlify="true"`
  and `name="contact"` on Netlify, then remove the `data-demo-form` handler in `main.js`.

## Fonts
Space Grotesk, Inter and JetBrains Mono — all SIL Open Font License, served by Google Fonts.

## Deploy
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repository (e.g. `username.github.io`), then Settings → Pages.
- **Any host:** upload the files; all paths are relative.

## License
© 2026 Novpix LLC (ZumaTools). MIT License — see `LICENSE`.
