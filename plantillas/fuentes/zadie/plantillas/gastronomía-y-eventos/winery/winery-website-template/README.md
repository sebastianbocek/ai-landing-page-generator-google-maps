# Stone Ridge Vineyards — Free Website Template

A complete, four-page website template for wineries and vineyards. Designed by [ZADIE](https://zadie.com).

## License

Free for personal and commercial use. Attribution appreciated but not required.

You may use, modify, and distribute this template freely. You may not resell it as-is without significant modification.

## What's Included

- `index.html` — Homepage with hero, wine collections, experiences, testimonials, and wine club CTA
- `about.html` — Estate story, winemaker profile, vineyard details, awards, and team
- `services.html` — Tasting options with pricing, wine club tiers, private events, and seasonal pairings
- `contact.html` — Contact form, tasting room hours, directions, map placeholder, and FAQ
- `styles.css` — Complete stylesheet with CSS custom properties, responsive design, and animations
- `README.md` — This file

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview
3. Edit the HTML files with your winery's content
4. Update the CSS variables in `styles.css` to match your brand colors
5. Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

No build tools, no JavaScript frameworks, no dependencies beyond Google Fonts and Font Awesome.

## Customization Guide

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`:

```css
:root {
  --primary: #7B2D3C;        /* Deep burgundy — main brand color */
  --primary-dark: #5A1E2A;   /* Darker burgundy for hover states */
  --primary-light: #A84D60;  /* Lighter burgundy for accents */
  --secondary: #C9A86C;      /* Aged gold — highlights and borders */
  --accent: #2C4A2E;         /* Vine green — secondary accent */
  --bg: #FAF3E8;             /* Parchment — page background */
  --gray-light: #EDE7D9;     /* Light dividers and borders */
  --gray: #9E8E7A;           /* Muted text */
  --gray-dark: #3D2E1E;      /* Dark brown for headings */
  --text: #2A1A10;           /* Body text */
}
```

Change `--primary` to your brand color and adjust `--secondary` for your accent. All other values will cascade correctly.

### Typography

The template uses:
- **Rufina** (Google Fonts) for all headings — classical serif with wine-country elegance
- **Lato** (Google Fonts) for all body copy — clean and readable

To change fonts, update the `@import` line at the top of `styles.css` and the `--font-heading` and `--font-body` variables.

### Business Information

Replace the following placeholder content throughout all HTML files:

- **Winery name**: "Stone Ridge Vineyards" / "Stone Ridge"
- **Address**: 4820 Stone Ridge Road, McMinnville, OR 97128
- **Phone**: (503) 555-0192
- **Email**: hello@stoneridgevineyards.com
- **Hours**: Thursday–Sunday 11am–5pm (and variations)
- **Founding year**: 1987
- **Acreage**: 120 acres
- **Staff names and bios**: Elena Stone, Marcus Webb, Simone Laurent
- **Wine names and tasting notes**: Adjust to your actual portfolio
- **Pricing**: Update all tasting, club, and event pricing to match your offerings
- **Awards and accolades**: Replace with your actual recognition
- **Social media links**: Update the `href="#"` values on social icons

### Images

This template uses CSS gradients as placeholder backgrounds for all image areas. To add real photos:

1. Find the element you want to replace (e.g., `.about-img-main`, `.wine-img-cab`, `.team-photo-1`)
2. Replace the CSS gradient background with an `<img>` tag, or override the background with a photo URL:

```css
.about-img-main {
  background: url('images/vineyard.jpg') center/cover no-repeat;
}
```

Or in HTML:
```html
<div class="about-img-main">
  <img src="images/vineyard.jpg" alt="Stone Ridge estate vineyard">
</div>
```

### Analytics

The template includes Google Analytics tracking (ID: `G-DBX9DKSJPZ`). Replace this with your own GA4 Measurement ID, or remove the `<!-- ZADIE-ANALYTICS-START -->` to `<!-- ZADIE-ANALYTICS-END -->` block entirely.

### Preview Banner

The preview banner (`<!-- ZADIE-PREVIEW-BANNER-START -->` to `<!-- ZADIE-PREVIEW-BANNER-END -->`) is included for the online template preview. Remove this entire block from each HTML file before publishing your live site.

## Deployment

This is a static HTML/CSS site with no server-side requirements.

**Recommended hosting options:**
- [Netlify](https://netlify.com) — Drag and drop the folder to deploy instantly (free tier available)
- [Vercel](https://vercel.com) — Connect a GitHub repo or deploy from CLI
- [GitHub Pages](https://pages.github.com) — Free hosting for public repos
- Any web host that supports static files (FTP upload works fine)

## Support

Template created by [ZADIE](https://zadie.com). For questions or custom development work, visit [zadie.com](https://zadie.com).
