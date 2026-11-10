# Evermore — Wedding website template

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/wedding/


An elegant one-page wedding site: couple names with a live countdown, love-story timeline,
weekend schedule, venue & travel, RSVP, registry, FAQ and a photo gallery.
Free from [ZumaTools](https://zumatools.com/). Plain HTML + CSS + a little vanilla JS — no build step.

## Editing
- **Names & date:** edit the `<h1 data-zt="heading">` in the hero, the footer names (`data-zt="brandName"`) and the `<title>`/meta tags.
- **Countdown:** set `data-date="2027-06-12T16:00:00"` on `#countdown` to your ceremony date and local time.
- **Colours & fonts:** change the custom properties at the top of `assets/css/style.css` (`--brand` sage, `--accent` rose, `--blush`, `--bg`, `--font-display`, `--font-script`).
- **Photos:** placeholders live in `assets/img/photo-*.svg`. Replace them with your own JPG/WebP images (portrait for the arch and tall gallery slots).
- **Florals:** `floral-corner.svg` and `floral-divider.svg` are original vector art — recolour them in any editor.
- **Meal choices:** edit the `<option>`s of `#meal-1`; extra guests copy that list automatically.

## RSVP form
The form uses `action="#"` and shows a friendly demo message. To collect replies:
- **Formspree:** set `action="https://formspree.io/f/your-id"` and remove the submit handler in `assets/js/main.js`.
- **Netlify Forms:** add `data-netlify="true"` and `name="rsvp"` to the `<form>`.
- **Google Forms / Sheets:** link the RSVP button to your form instead.

## Fonts
Cormorant Garamond, Pinyon Script and Jost from Google Fonts (SIL Open Font License).

## Deploy
- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repository and enable Pages
- **Any host:** upload the files — all URLs are relative.

## Credits & licence
Design, code and illustrations © 2026 Novpix LLC (ZumaTools), MIT licence (see `LICENSE`).
