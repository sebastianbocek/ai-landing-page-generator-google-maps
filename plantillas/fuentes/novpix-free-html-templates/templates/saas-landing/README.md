# Pulse — SaaS landing page

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/saas-landing/


A dark, modern landing page for a software product. Plain HTML, CSS and a tiny bit of vanilla JS: no build step, no framework.

## What's inside

```
index.html              the page
assets/css/style.css    all styles (theme tokens at the top)
assets/js/main.js       mobile menu, pricing toggle, scroll reveals, stat counters, demo form
assets/img/og-image.svg social share image (swap for a 1200x630 PNG/JPG before launch)
```

Sections: sticky nav with mobile menu, hero with a dashboard mockup (drawn in HTML/CSS/SVG), logo cloud (fictional brands), features grid, stats, how it works, pricing with monthly/yearly toggle, testimonials, FAQ accordion, CTA sign-up, footer.

## Customise

- **Colours and fonts:** edit the custom properties in `:root` at the top of `assets/css/style.css` (`--brand`, `--brand-2`, `--accent`, `--bg`, `--surface`, `--text`, `--muted`, `--radius`, `--font-display`, `--font-body`). Everything derives from them.
- **Brand name:** search for `data-zt="brandName"` in `index.html`.
- **Headline:** the `<h1 data-zt="heading">` in the hero.
- **Prices:** each price has `data-monthly` and `data-yearly` attributes; the toggle swaps the text.
- **Product mock:** the `.mock` block is pure markup. Replace it with an `<img>` of your real product screenshot if you prefer.
- **Logos:** the logo cloud uses made-up brands. Replace them with your customers' logos (with permission).
- **Social image and meta:** update `<title>`, the meta description and the `og:` tags in the `<head>`.

## Forms

The CTA form is a demo: `main.js` prevents submission and shows a friendly message. To collect real sign-ups:

- **Formspree:** set `action="https://formspree.io/f/your-id"` and remove `data-demo-form`.
- **Netlify Forms:** add `name="signup" data-netlify="true"` to the `<form>` and remove `data-demo-form`.

## Fonts

- Space Grotesk (Google Fonts, SIL Open Font License)
- Inter (Google Fonts, SIL Open Font License)

## Deploy

It's a static site, so any host works:

- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → deploy from branch.
- **Any web host:** upload the files over FTP/SFTP to your public folder.

## Credits and licence

Designed and built by ZumaTools (Novpix LLC). All illustrations, icons and brand marks are original. Released under the MIT licence, see `LICENSE`.
