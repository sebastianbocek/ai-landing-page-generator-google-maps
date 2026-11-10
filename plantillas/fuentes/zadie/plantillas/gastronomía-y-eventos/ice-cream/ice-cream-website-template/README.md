# Scoops & Swirls Creamery — Free Website Template

A playful, colorful website template designed for local ice cream shops, creameries, and dessert businesses. Built with pure HTML and CSS — no frameworks, no dependencies beyond Font Awesome and Google Fonts.

**Template by [ZADIE](https://zadie.com)**

---

## License

This template is free to use for personal and commercial projects. You may customize it however you like. You may not resell it as a template. Attribution ("Design by ZADIE") must remain in the footer.

---

## What's Included

```
ice-cream/
├── index.html      — Home page
├── about.html      — Owner story, process, sourcing, community
├── services.html   — Full menu: flavors, sundaes, shakes, cakes, catering
├── contact.html    — Contact form, FAQ, hours, catering inquiry
├── styles.css      — All styles
└── README.md       — This file
```

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview
3. Replace all placeholder text with your real business information
4. Update colors in `styles.css` under `:root` if needed
5. Upload the folder to your web host

No build step required. No npm. No dependencies to install.

---

## Customization Guide

### Business Information

Search for the following placeholder values and replace them throughout all HTML files:

| Placeholder | Replace With |
|---|---|
| `Scoops & Swirls Creamery` | Your business name |
| `Patty & Jim Holloway` | Your name(s) |
| `412 Broughton Street, Savannah, GA 31401` | Your address |
| `(555) 847-2293` | Your phone number |
| `hello@scoopsandswirls.com` | Your email address |
| `2009` | Your founding year |

### Colors

All colors are defined as CSS variables at the top of `styles.css`. Change them in one place and they update everywhere:

```css
:root {
  --strawberry: #FF6B9D;      /* Primary brand color */
  --strawberry-dark: #E0508A; /* Hover states */
  --mint: #3DAA6E;            /* Secondary / accent */
  --mint-light: #6EC991;
  --vanilla: #FFF8F0;         /* Warm cream background */
  --chocolate: #3D2B1F;       /* Dark text / footer */
  --yellow: #FFD166;          /* Accent highlights */
  --blueberry: #5E4B8B;       /* Tertiary accent */
  --bg: #FFF8F0;              /* Page background */
}
```

### Fonts

This template uses two Google Fonts:

- **Bubblegum Sans** — headings, logo, card titles. Gives the playful retro feel.
- **Nunito** — body text, navigation, form labels. Friendly and highly legible.

To change fonts, update the Google Fonts `@import` URL at the top of `styles.css` and the font variables:

```css
--font-heading: 'Bubblegum Sans', cursive;
--font-body: 'Nunito', sans-serif;
```

### Flavor Cards

The `services.html` page includes 24 flavor pills. Add or remove flavors by editing the `.flavor-full-grid` section. Mark seasonal flavors with the `seasonal-pill` class:

```html
<div class="flavor-pill">Georgia Strawberry</div>
<div class="flavor-pill seasonal-pill">Blood Orange Sorbet *</div>
```

### Pricing

All pricing is hardcoded in `services.html`. Update it directly in the HTML. The pricing table uses standard HTML `<table>` with the `.pricing-table` class.

---

## Removing the Preview Banner

The preview banner and analytics code are wrapped in comment markers. Remove everything between the markers (inclusive) before publishing:

```html
<!-- ZADIE-ANALYTICS-START -->
... remove this block ...
<!-- ZADIE-ANALYTICS-END -->

<!-- ZADIE-PREVIEW-BANNER-START -->
... remove this block ...
<!-- ZADIE-PREVIEW-BANNER-END -->
```

---

## Hosting

This is a static HTML site. It works on any web host that serves HTML files:

- **Netlify** (recommended) — drag and drop the folder at app.netlify.com
- **Vercel** — import the folder via the Vercel dashboard
- **GitHub Pages** — push to a repo and enable Pages in settings
- **Traditional hosting** — upload via FTP to your `public_html` folder

---

## Browser Support

Tested and working in:
- Chrome 110+
- Firefox 110+
- Safari 16+
- Edge 110+
- iOS Safari 16+
- Android Chrome 110+

---

## Need a Custom Version?

ZADIE builds custom websites for local businesses. If you want this template customized with your branding, content, and a contact form that actually works — [get in touch at zadie.com](https://zadie.com).
