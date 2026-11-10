# Sprout — mobile app landing page

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/app-landing/


A bright, playful landing page for an iOS/Android app. Plain HTML, CSS and a little vanilla JS. No build step, no framework.

## What's inside

```
index.html              the page
assets/css/style.css    all styles (theme tokens at the top)
assets/js/main.js       mobile menu, header on scroll, scroll reveals, carousel buttons
assets/img/og-image.svg social share image (swap for a 1200x630 PNG/JPG before launch)
```

Sections: nav with mobile menu, hero with two phone mockups and floating notification cards, stats strip, three alternating feature rows, feature grid, screenshots carousel, reviews, FAQ, download CTA with QR placeholder, footer.

## Customise

- **Colours and fonts:** edit the custom properties in `:root` at the top of `assets/css/style.css` (`--brand`, `--brand-dark`, `--accent`, `--accent-2`, `--sun`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`). `--brand-dark` is used behind white text, so keep it dark enough for contrast.
- **Brand name:** search for `data-zt="brandName"`. **Headline:** `<h1 data-zt="heading">`.
- **Phone screens:** each `.phone > .screen` is plain HTML. The easiest way to use your real app is to replace the `.screen` contents with `<img src="assets/img/screen-1.webp" alt="" style="width:100%;height:100%;object-fit:cover">`. Screens are 248 x 538 px (export at 2x or 3x).
- **Download buttons:** the buttons say "Get it for iPhone / Android" and are drawn generically. Point the `href`s at your store listings. If you want to use the official store badges, download them from Apple and Google and follow their badge guidelines.
- **QR code:** the QR graphic is a decorative placeholder. Generate a real one for your download link (for example with the ZumaTools QR code generator) and replace the inline SVG.

## Fonts

- Bricolage Grotesque (Google Fonts, SIL Open Font License)
- Plus Jakarta Sans (Google Fonts, SIL Open Font License)

## Deploy

It's a static site, so any host works:

- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → deploy from branch.
- **Any web host:** upload the files to your public folder.

## Credits and licence

Designed and built by ZumaTools (Novpix LLC). All illustrations, mockups and icons are original. MIT licence, see `LICENSE`. iPhone is a trademark of Apple Inc. and Android is a trademark of Google LLC; they are mentioned only to describe platform compatibility.
