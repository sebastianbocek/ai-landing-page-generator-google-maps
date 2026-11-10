# Spoke & Chain Cyclery — Free Website Template

A complete 4-page website template for bike shops and cycling-focused local businesses. Built with pure HTML and CSS, no frameworks or dependencies required.

**Design by [ZADIE](https://zadie.com)**

---

## License

Free for personal and commercial use. You may use this template for any project, client or otherwise. You may modify it freely. You may not resell or redistribute the template itself as a standalone product.

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files directly with your business details
4. Update colors and fonts in `styles.css` under `:root`
5. Upload all files to your web host (no build step required)

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage with hero, services overview, brands, community, testimonials, and CTA |
| `about.html` | Shop story, mechanic team bios, workshop section, community involvement, values |
| `services.html` | Full service menu with pricing: tune-ups, repair menu, bike fitting, rentals, accessories |
| `contact.html` | Contact form, service request form, shop hours, map placeholder, FAQ accordion |
| `styles.css` | All styles. Edit CSS variables here for colors, fonts, and spacing |

---

## Customization Guide

### Business Details

Search and replace these strings across all HTML files:

| Placeholder | Replace with |
|---|---|
| `Spoke & Chain Cyclery` | Your business name |
| `Spoke &amp; Chain` | Your business name (HTML-encoded) |
| `(503) 555-0142` | Your phone number |
| `hello@spokeandchain.com` | Your email address |
| `Portland, OR` | Your city and state |
| `2847 SE Division St` | Your street address |
| `Portland, OR 97202` | Your full address |
| `Portland's neighborhood bike shop` | Your tagline or description |

### Colors

Edit these CSS custom properties at the top of `styles.css`:

```css
:root {
  --primary: #E84E10;        /* Signal orange — main brand color */
  --primary-dark: #C43D0A;   /* Darker orange for hover states */
  --primary-light: #FF6B35;  /* Lighter orange for dark backgrounds */
  --secondary: #252525;      /* Charcoal — text and dark sections */
  --accent: #8C8C8C;         /* Steel gray — muted text */
  --off-white: #F4F4F4;      /* Page background */
  --white: #FFFFFF;          /* Card backgrounds */
}
```

### Fonts

The template uses two Google Fonts loaded via CSS `@import` at the top of `styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Francois+One&family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
```

To change fonts, replace the import URL with your chosen fonts from [fonts.google.com](https://fonts.google.com) and update these variables:

```css
:root {
  --font-heading: 'Francois One', sans-serif;
  --font-body: 'Fira Sans', sans-serif;
}
```

### Photos

All image placeholder areas use background colors or gradients. To replace them with real photos:

1. Find the placeholder element (look for `background: linear-gradient(...)` in inline styles or `.hero-image-main`, `.team-photo`, `.story-image`, etc.)
2. Add your image using CSS:

```css
.hero-image-main {
  background: url('images/your-photo.jpg') center/cover no-repeat;
}
```

Or add a style attribute directly to the element:

```html
<div class="team-photo" style="background: url('images/mechanic-marcus.jpg') center/cover no-repeat;"></div>
```

### Pricing

Update all prices directly in `services.html`. Search for `$` to find all price references.

### Navigation

All pages link to each other by filename. If you rename any files, update the `<a href="...">` links in the header navigation and footer across all four pages.

### Contact Form

The forms use `action="#"` as a placeholder. To make them functional, either:

- Replace `action="#"` with your form handler URL (Formspree, Basin, etc.)
- Connect to a backend endpoint
- Use a service like [Formspree](https://formspree.io) (free tier available)

### Google Analytics

The template includes ZADIE's analytics tracking code between `ZADIE-ANALYTICS-START` and `ZADIE-ANALYTICS-END` comment markers. Remove these blocks or replace the tracking ID (`G-DBX9DKSJPZ`) with your own GA4 measurement ID.

### Preview Banner

The ZADIE preview banner appears between `ZADIE-PREVIEW-BANNER-START` and `ZADIE-PREVIEW-BANNER-END` comments. Remove these entire blocks from all pages before publishing your site.

---

## File Structure

```
bike-shop/
├── index.html        Homepage
├── about.html        About page
├── services.html     Services and pricing
├── contact.html      Contact, forms, FAQ
├── styles.css        All CSS styles
└── README.md         This file
```

---

## Browser Support

This template uses standard CSS (Custom Properties, Grid, Flexbox) and works in all modern browsers. It does not support Internet Explorer.

---

Built by [ZADIE](https://zadie.com)
