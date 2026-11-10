# Volt — gym & fitness website

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/fitness/


A bold, dark one-page website for gyms, boxes, studios and personal trainers.

**Sections:** sticky nav with mobile menu · hero with stats · programs · weekly class timetable (tabs by day) · coaches · membership pricing (monthly/yearly toggle) · BMI calculator · transformation stories · free-trial signup · footer.

## Editing

- **Colours & fonts** — change the custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`). Everything else derives from them.
- **Brand name** — search for `data-zt="brandName"`.
- **Timetable** — each day is a `.panel` inside `[data-tabs]`. Each class is an `<li class="cls">` with a time, name, coach/room, duration and intensity (`lv1` easy, `lv2` moderate, `lv3` intense). Without JavaScript all days are listed in order; with JavaScript they become tabs (arrow keys supported) that open on today.
- **Pricing** — the monthly and yearly prices live in `data-m` and `data-y` on each price number.
- **Coach portraits** — replace `assets/img/coach-*.svg` with your own photos (6:7 ratio works best). The hero illustration is `assets/img/hero-athlete.svg`.
- **Forms** — the trial form has `action="#"`. Point it at Formspree (`https://formspree.io/f/xxxx`) or add `data-netlify="true" name="trial"` for Netlify Forms, then remove `data-demo` so the demo handler in `main.js` stops intercepting it.
- **BMI** — calculated in the browser only; nothing is sent anywhere. Keep the "not medical advice" note.

## Fonts

Anton (display) and Manrope (body) from Google Fonts, both SIL Open Font License.

## Deploy

- **Netlify Drop** — drag the folder onto https://app.netlify.com/drop.
- **GitHub Pages** — push to a repository and enable Pages.
- **Any static host** — upload the files as-is. No build step; all paths are relative.

## Credits

Design, illustrations and code by ZumaTools (Novpix LLC). MIT License — see `LICENSE`. All people, reviews and addresses are fictional placeholders.
