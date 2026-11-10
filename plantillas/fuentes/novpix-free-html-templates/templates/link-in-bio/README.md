# Linkly — link in bio page

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/link-in-bio/


A tiny, mobile-first "link in bio" page for creators, shops and freelancers. Three ready-made styles share one stylesheet:

| File | Style |
| --- | --- |
| `index.html` | Soft — warm cream, serif name, rounded cards |
| `variant-glass.html` | Glass — deep gradient with frosted-glass buttons |
| `variant-bold.html` | Bold — neo-brutalist yellow with hard shadows |

Pick one, rename it to `index.html`, delete the others and the `.variants` switcher in the footer.

## Editing

- **Name, bio, links** — plain HTML in the `.profile` and `.links` sections. Each link is an `<a class="link">` with an icon, a title (`<strong>`) and a subtitle (`<small>`). Add `is-featured` to highlight one.
- **Avatar & video thumbnail** — replace `assets/img/avatar.svg` and `assets/img/video.svg` with your own images (square ~400 px for the avatar, 16:9 for the thumbnail; WebP/JPG are fine).
- **Icons** — simple generic SVG glyphs live in the `<symbol>` sprite at the top of each page. Reuse them with `<svg><use href="#i-ig"/></svg>`.
- **Colours & fonts** — edit the CSS custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`). Variants override them in `.v-glass` / `.v-bold`.
- **Newsletter form** — set `action` to your Formspree endpoint or add `data-netlify="true"` for Netlify Forms, then remove `data-demo` from the `<form>` (the demo handler in `main.js` only shows a message).

## Fonts

Fraunces, Inter, Plus Jakarta Sans, Space Grotesk and Archivo Black — all from Google Fonts under the SIL Open Font License. Each page loads only the fonts it uses.

## Deploy

- **Netlify Drop** — drag the folder onto https://app.netlify.com/drop.
- **GitHub Pages** — push the folder to a repo and enable Pages for the branch.
- **Any host** — upload the files; everything uses relative URLs, no build step.

## Credits

Design, illustrations and code by ZumaTools (Novpix LLC). Released under the MIT License — see `LICENSE`. Social icons are simple generic glyphs, not official brand marks.
