# Iris — Personal Blog

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/personal-blog/


A free, typography-first blog template by [ZumaTools](https://zumatools.com). Plain HTML, CSS and a little
vanilla JavaScript — no build step, no frameworks.

## Pages
- `index.html` — intro, featured essay, post list with tags, topics (tag filter), most-read, newsletter
- `post.html` — article layout: table of contents, reading time, progress bar, code blocks with copy button,
  pull quote, figure, blockquote, callout, share links, author box, previous/next, related posts
- `about.html` — about page with facts and newsletter

## Writing a new post
1. Duplicate `post.html` and rename it (e.g. `my-new-essay.html`).
2. Replace the title, dek, date, cover and the content inside `<div class="prose" data-prose>`.
3. Give every `<h2>` an `id` and list them in the `.toc` — the scroll-spy highlights them automatically.
4. Reading time is calculated from the text (≈230 words/min); the static value is the no-JS fallback.
5. Add the post to the list on `index.html`. `data-tags` on each `.post-row` (space-separated, lowercase)
   powers the topic filter — `index.html?tag=css` shows only CSS posts.

Code blocks use simple `<span class="tk-…">` classes for colouring; you can also leave code uncoloured or
use any static highlighter output.

## Customising
- **Name / headline:** elements marked `data-zt="brandName"` and `data-zt="heading"`.
- **Colours & fonts:** CSS custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`,
  `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`, `--measure`).
  Dark-mode values are under `:root[data-theme="dark"]` and the `prefers-color-scheme` block — edit both.
- **Dark mode:** follows the reader's system setting until they use the toggle; the choice is saved in `localStorage`.
- **Newsletter:** point the form `action` at your provider (Buttondown, ConvertKit…), Formspree, or Netlify
  Forms (`data-netlify="true"`), then remove the `data-demo-form` handler in `assets/js/main.js`.
- **Images:** covers in `assets/img/` are original SVG illustrations — swap in your own (1200×675 works well).

## Fonts
Newsreader and Inter — SIL Open Font License, via Google Fonts. Code uses your system monospace font.

## Deploy
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repository, then Settings → Pages.
- **Any host:** upload the files; all paths are relative.

## License
© 2026 Novpix LLC (ZumaTools). MIT License — see `LICENSE`.
