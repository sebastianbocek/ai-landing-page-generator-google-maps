# SHIFT/26 — tech conference & event website

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/event-conference/


A dark, modern one-page site for conferences, summits, meetups and hackathons.

**Sections:** sticky nav with mobile menu · hero with date, venue and live countdown · stats · speakers · multi-track schedule (tabs by day) · ticket tiers · sponsors · venue & travel · FAQ · newsletter CTA · footer.

## Editing

- **Colours & fonts** — edit the custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--accent-2`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`, `--font-mono`).
- **Event name** — search for `data-zt="brandName"`; the headline is `<h1 data-zt="heading">`.
- **Countdown** — set the start time in `data-countdown="2026-11-12T09:00:00Z"` (ISO format, UTC). Update the static numbers inside too; they show when JavaScript is off.
- **Speakers** — each `<li class="spk">` has an avatar, name, role and talk title. Replace `assets/img/speaker-*.svg` with square photos.
- **Schedule** — each day is a `.panel`; each time slot is an `<li class="slot">` holding up to three `.sess` cards. Use classes `t-main`, `t-build`, `t-design` for track colours, `s-wide` for plenary sessions and `s-break` for breaks. Without JavaScript both days are listed one after another.
- **Tickets** — edit prices, notes and the `.bar` width for the "sold" indicator. Link the buttons to your ticketing provider.
- **Sponsors** — the logos are fictional inline SVG wordmarks; swap in your sponsors' SVG or PNG logos.
- **Venue map** — `assets/img/venue-map.svg` is an illustration. You can replace it with a static map image or an embedded map of your choice.
- **Newsletter form** — set `action` to Formspree or add `data-netlify="true"`, then remove `data-demo`.

## Fonts

Unbounded, Inter and JetBrains Mono from Google Fonts (SIL Open Font License).

## Deploy

- **Netlify Drop** — drag the folder onto https://app.netlify.com/drop.
- **GitHub Pages** — push to a repository and enable Pages.
- **Any static host** — upload as-is. No build step; all paths are relative.

## Credits

Design, illustrations and code by ZumaTools (Novpix LLC). MIT License — see `LICENSE`. All speakers, sponsors, prices and the venue are fictional.
