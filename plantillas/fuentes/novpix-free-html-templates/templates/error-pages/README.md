# Detour — error page pack

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/error-pages/


Six friendly error pages for any website, plus a small gallery (`index.html`) to preview them. Plain HTML/CSS and a little vanilla JS. No build step, no framework.

| File | What it is |
| --- | --- |
| `404-minimal.html` | Clean type, site search, popular links |
| `404-illustrated.html` | Lost hiker and signposts illustration |
| `404-playful.html` | "Catch the runaway zero" mini game (20-second rounds, best score saved) |
| `404-dark.html` | Glitch "404" and a terminal log |
| `500.html` | Unplugged cable, retry button, status list, copyable reference ID |
| `maintenance.html` | Rotating gears, progress bar, ETA in the visitor's local time |
| `index.html` | Preview gallery (you don't need to deploy this) |

## Customise

- **Colours and fonts:** edit `:root` at the top of `assets/css/style.css` (`--brand`, `--accent`, `--accent-2`, `--bg`, `--surface`, `--text`, `--muted`, `--line`, `--radius`, `--font-display`, `--font-body`, `--font-mono`). Each page also has a body class (`.p-minimal`, `.p-illustrated`, `.p-playful`, `.p-dark`, `.p-500`, `.p-maint`) where it tweaks a few tokens; edit those to restyle one page only.
- **Brand name:** `data-zt="brandName"`. **Headline:** `data-zt="heading"`.
- **Links:** the demo links point at `index.html`; change them to `/`, `/blog`, `/help` and so on.
- **Search (404 minimal):** set the form `action` to your search URL (for example `/search`, input name `q`) and remove `data-demo-search`.
- **Maintenance ETA:** change `MINUTES_LEFT` in `assets/js/main.js`, or hard-code the time in `maintenance.html`.
- **Game length:** change `GAME_SECONDS` in `assets/js/main.js`.

## Using them as real error pages

Error pages are served at whatever URL was requested (for example `/blog/missing/post`), so **relative asset paths break**. Before deploying, either:

1. put the `assets` folder at your site root and change `assets/...` to `/assets/...` in the page you use, or
2. paste the CSS into a `<style>` tag and the JS into a `<script>` tag so the page is self-contained.

Then tell your host about the file:

- **Netlify / Cloudflare Pages / GitHub Pages:** save it as `404.html` in the site root.
- **Vercel (static):** `404.html` in the output folder.
- **Apache:** `ErrorDocument 404 /404.html` and `ErrorDocument 500 /500.html` in `.htaccess`.
- **Nginx:** `error_page 404 /404.html;` and `error_page 500 502 503 504 /500.html;`
- **Maintenance mode:** serve `maintenance.html` with HTTP status 503 and a `Retry-After` header.

All error pages include `<meta name="robots" content="noindex">`.

## Fonts

- Outfit (Google Fonts, SIL Open Font License)
- JetBrains Mono (Google Fonts, SIL Open Font License)

## Deploy the preview

- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages / any host:** upload the folder as-is.

## Credits and licence

Designed and built by ZumaTools (Novpix LLC). All illustrations are original. MIT licence, see `LICENSE`.
