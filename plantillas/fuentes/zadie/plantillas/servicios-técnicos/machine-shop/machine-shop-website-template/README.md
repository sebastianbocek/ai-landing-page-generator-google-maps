# Precision Works Machine Shop — Website Template

A free website template for CNC machining shops, precision manufacturers, and industrial fabrication businesses. Built with pure HTML and CSS — no frameworks, no build tools, no dependencies beyond a CDN font and icon library.

## Demo

Preview this template at: [zadie.com/templates/free-machine-shop-website-template](https://zadie.com/templates/free-machine-shop-website-template)

## What's Included

```
machine-shop/
├── index.html       — Home page
├── about.html       — Company history, team, certifications, quality commitment
├── services.html    — Detailed capabilities: milling, turning, EDM, grinding, fabrication, inspection
├── contact.html     — RFQ form, contact info, FAQ, map
├── styles.css       — Complete stylesheet
└── README.md        — This file
```

## Design

**Aesthetic:** Technical blueprint / industrial precision. Sharp angles, monospaced type, blueprint grid CSS patterns, orange precision indicators on deep navy steel backgrounds.

**Fonts (Google Fonts):**
- Oxanium — headings, display
- IBM Plex Sans — body text
- IBM Plex Mono — specs, tolerances, data tables, labels

**Color Palette:**
| Variable | Value | Use |
|---|---|---|
| `--primary` | `#0F2537` | Dark navy — headers, cards |
| `--primary-mid` | `#1E3A5F` | Steel blue — gradients |
| `--accent` | `#FF6B00` | Precision orange — CTAs, specs, highlights |
| `--accent-light` | `#FF9500` | Light orange — hover states |
| `--bg` | `#F4F6F8` | Cool light gray — page background |
| `--surface` | `#FFFFFF` | White — cards, forms |
| `--dark` | `#0A1628` | Near black — footer, dark sections |

**Icons:** Font Awesome 6.5.0 (CDN, no download required)

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser — it works immediately with no build step
3. Edit the placeholder text and colors to match your business
4. Replace the gradient photo placeholders with real photos (see Customization below)
5. Connect the contact form to your preferred form handler (Formspree, Netlify Forms, etc.)
6. Upload to any static host

## Customization

### Business Information

Search and replace the following placeholder values across all four HTML files:

| Placeholder | Replace With |
|---|---|
| `Precision Works Machine Shop` | Your shop name |
| `Precision Works` | Your shop name (short form) |
| `Dale Horton` | Owner/contact name |
| `(555) 392-7840` | Your phone number |
| `quotes@precisionworks.com` | Your email address |
| `4820 Spring Grove Ave` | Your street address |
| `Cincinnati, OH 45209` | Your city, state, ZIP |

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`. Change them in one place and they update everywhere:

```css
:root {
  --primary:      #0F2537;  /* Change to your brand color */
  --accent:       #FF6B00;  /* Change to your highlight color */
  --bg:           #F4F6F8;  /* Page background */
}
```

### Photo Placeholders

Photo placeholder areas use CSS background gradients (no images required). To replace with real photos:

1. Find the placeholder element in the HTML (look for classes like `.about-image`, `.team-photo`, `.service-image-block`)
2. Add a `style` attribute with your image:

```html
<!-- Before -->
<div class="about-image"></div>

<!-- After -->
<div class="about-image" style="background-image: url('images/shop-floor.jpg'); background-size: cover; background-position: center;"></div>
```

Or add the background-image in `styles.css` by targeting the class directly.

### Services

The `services.html` page has six service sections. Each follows this pattern:

```html
<section class="service-section" id="your-service">
  <div class="container">
    <div class="service-section-grid">
      <div class="service-details">
        <!-- Badge, title, description, specs table, materials, CTA -->
      </div>
      <div class="service-visual">
        <!-- Image placeholder + highlight points -->
      </div>
    </div>
  </div>
</section>
```

Add or remove sections to match your actual capabilities. The sticky services nav at the top links to each section by `id`.

### RFQ Form

The contact form is built with plain HTML. To make it functional, connect it to a form service:

**Formspree** (simplest):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Netlify Forms** (if hosting on Netlify):
```html
<form name="rfq" method="POST" data-netlify="true">
```

**EmailJS** (client-side, no server needed):
Add the EmailJS SDK and send on form submit.

### Google Analytics

The template ships with a placeholder GA4 tracking ID (`G-DBX9DKSJPZ`). Replace it with your own ID in the `<head>` section of all four HTML files:

```html
gtag('config', 'G-XXXXXXXXXX');  // Replace with your GA4 ID
```

The analytics code is wrapped in `ZADIE-ANALYTICS-START` / `ZADIE-ANALYTICS-END` comment markers, which allow it to be stripped automatically when downloaded through the ZADIE platform.

## Certifications Shown

The template displays these certifications in the header bar and footer. Edit or remove the ones that don't apply to your shop:

- ISO 9001:2015
- AS9100D Aerospace
- ITAR Registered

These appear in the `.cert-bar` section on `index.html` and as `.cert-badge` elements in all footers.

## Hosting

This template is pure static HTML and CSS — it works on any host that serves files.

**Free options:**
- [Netlify](https://netlify.com) — drag and drop your folder to deploy
- [GitHub Pages](https://pages.github.com) — push to a repository
- [Cloudflare Pages](https://pages.cloudflare.com) — fast global CDN

**Paid options (recommended for business):**
- Any shared hosting (GoDaddy, SiteGround, Bluehost, etc.)
- VPS (DigitalOcean, Linode, Vultr)
- AWS S3 + CloudFront

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses CSS Grid, CSS Custom Properties, and `clamp()`. No IE support.

## License

Free for commercial and personal use. Attribution to [ZADIE](https://zadie.com) in the footer is appreciated but not required after customization.

## Credits

- **Fonts:** [Google Fonts](https://fonts.google.com) — Oxanium, IBM Plex Sans, IBM Plex Mono
- **Icons:** [Font Awesome 6.5.0](https://fontawesome.com)
- **Template by:** [ZADIE](https://zadie.com)

---

**Need a custom version built for your shop?** [zadie.com](https://zadie.com)
