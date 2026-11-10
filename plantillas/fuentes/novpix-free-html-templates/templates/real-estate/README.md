# Haven — Real estate agency website template

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/real-estate/


A calm, modern site for estate agents, realtors and property managers: searchable listings,
a detailed property page with a mortgage calculator, agent profiles and lead-capture forms.
Free from [ZumaTools](https://zumatools.com/). Plain HTML + CSS + vanilla JS — no build step.

## Pages
- `index.html` — hero, search bar (buy/rent, keyword, type, beds, max price), filterable + sortable listings grid, seller benefits, agents, reviews, valuation form
- `listing.html` — property detail: photo gallery, key facts, description, specs table, features, mortgage estimate, floor plan, map block, agent card with enquiry form, similar homes. Open `listing.html?id=3` to show any listing.

## Editing listings
All demo properties live in the `LISTINGS` array at the top of `assets/js/main.js`
(`id, title, address, city, type, status ("sale" | "rent"), price, beds, baths, area, year, lot, garage, img, isNew`).
The grid in `index.html` is also pre-rendered as static HTML so it shows without JavaScript — if you change the data,
update those cards too (or delete them and let JS render the grid).

## Mortgage calculator
Monthly principal & interest uses the standard amortisation formula
`M = P · r(1+r)^n / ((1+r)^n − 1)` with `r` = annual rate ÷ 12 and `n` = years × 12.
Property tax (1.1%/yr) and insurance (0.35%/yr) are rough estimates — adjust them in `main.js`.

## Customising
- **Colours & fonts:** custom properties at the top of `assets/css/style.css` (`--brand`, `--accent`, `--bg`, `--font-display`…).
- **Brand & headline:** `data-zt="brandName"` and `data-zt="heading"`.
- **Images:** replace the SVG illustrations in `assets/img/` with your own photos (4:3 works best).

## Forms
Forms use `action="#"` and show a demo message (`data-demo`). To receive leads, point `action` to Formspree
(`https://formspree.io/f/your-id`) and remove `data-demo`, or add `data-netlify="true"` with a `name` on Netlify.

## Fonts
Instrument Serif and Manrope from Google Fonts (SIL Open Font License).

## Deploy
Netlify Drop (drag the folder to https://app.netlify.com/drop), GitHub Pages, or any static host — all URLs are relative.

## Credits & licence
Design, code and illustrations © 2026 Novpix LLC (ZumaTools), MIT licence (see `LICENSE`).
