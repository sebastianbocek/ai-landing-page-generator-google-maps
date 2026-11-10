# Aube — coming soon page

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/coming-soon/


An elegant single-screen launch page with a live countdown, waitlist signup and a softly animated background. Plain HTML/CSS and a few lines of vanilla JS.

## Files

```
index.html              dusk (dark) variant
dawn.html               dawn (light) variant — identical markup, one class on <body>
assets/css/style.css    all styles; tokens at the top, dawn overrides under .variant-dawn
assets/js/main.js       countdown + demo form
assets/img/og-image.svg social share image (swap for a 1200x630 PNG/JPG before launch)
```

## Set your launch date

Open `assets/js/main.js` and edit the first lines:

```js
var LAUNCH_DATE = "2026-12-01T09:00:00";        // add "+01:00" etc. to pin a timezone
var LAUNCHED_MESSAGE = "We're live! Come on in.";
```

Also update the fallback text in `index.html` (the numbers inside the countdown and "Doors open …") so visitors without JavaScript see the right date.

## Colour variants

- Dark "dusk": default, no class needed.
- Light "dawn": add `class="variant-dawn"` to `<body>`.

You only need one page: pick your variant, delete the other HTML file and remove the "Dawn version / Dusk version" link in the footer. To make your own palette, override the custom properties in `:root` (`--brand`, `--accent`, `--accent-2`, `--bg`, `--bg-2`, `--surface`, `--text`, `--muted`, `--on-brand`, `--radius`, `--font-display`, `--font-body`).

## Brand and copy

- Brand name: `data-zt="brandName"`. Headline: `<h1 data-zt="heading">`.
- The logo is an inline SVG in the header; replace it with your own.

## Waitlist form

The form is a demo. Point it at your service:

- **Formspree:** `action="https://formspree.io/f/your-id"` and remove `data-demo-form`.
- **Netlify Forms:** add `name="waitlist" data-netlify="true"` and remove `data-demo-form`.
- **Mailchimp / ConvertKit / Buttondown:** use the form action URL from their embed code and rename the input `name` to what they expect.

## Motion and accessibility

The drifting gradient, twinkling stars and growing botanical line art all stop when the visitor has "reduce motion" enabled. The countdown has fallback text, so the page still makes sense without JavaScript.

## Fonts

- Cormorant Garamond (Google Fonts, SIL Open Font License)
- Manrope (Google Fonts, SIL Open Font License)

## Deploy

- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repo, then Settings → Pages.
- **Any web host:** upload the files to your public folder.

## Credits and licence

Designed and built by ZumaTools (Novpix LLC). Artwork is original. MIT licence, see `LICENSE`.
