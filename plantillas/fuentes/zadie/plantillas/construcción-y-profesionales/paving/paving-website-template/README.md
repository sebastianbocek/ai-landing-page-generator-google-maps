# BlackTop Pro Paving — Free Website Template

A complete 4-page website template for asphalt paving companies. Dark industrial aesthetic with safety orange accents. Built with pure HTML and CSS — no frameworks, no dependencies beyond Google Fonts and Font Awesome.

---

## License

This template is free to use for any personal or commercial project. You may customize it however you like. Attribution to [ZADIE](https://zadie.com) is appreciated but not required.

---

## What's Included

```
paving/
├── index.html       Home page
├── about.html       About the company and owner
├── services.html    All 8 services with detailed descriptions
├── contact.html     Quote request form and FAQ
├── styles.css       Full stylesheet
└── README.md        This file
```

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files with your business information
4. Upload to any web host (no server-side code required)

---

## Customization Guide

### Business Information

Search and replace the following placeholder values across all HTML files:

| Placeholder | Replace With |
|---|---|
| `BlackTop Pro` | Your business name |
| `Ray Kowalski` | Owner's name |
| `(555) 739-2648` | Your phone number |
| `ray@blacktoppro.com` | Your email address |
| `Detroit, MI` | Your city and state |
| `2025` | Current year |

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`. To change the primary accent color, update `--orange` and `--orange-dark`:

```css
:root {
  --orange:      #FF6B35;   /* Primary accent — change this */
  --orange-dark: #E05520;   /* Darker shade for hover states */
  --asphalt:     #111111;   /* Main background */
  --surface:     #1A1A1A;   /* Section background */
  --card:        #222222;   /* Card background */
  --concrete:    #C0B9A8;   /* Body text */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change typography, update the import URL at the top of `styles.css` and the font variables:

```css
--font-heading: 'Fjalla One', Impact, sans-serif;
--font-body:    'Barlow', system-ui, sans-serif;
```

### Services

The services grid on the home page uses 4 columns (2 rows of 4). If you have a different number of services, adjust the grid to keep complete rows. Refer to the grid comments in `styles.css`.

### Navigation

All four pages link to each other. If you add or remove pages, update the `<nav>` block on every HTML file to match.

### Google Analytics

The template includes Google Analytics tracking code with a placeholder measurement ID (`G-DBX9DKSJPZ`). Replace this with your own Google Analytics 4 measurement ID, or remove the analytics block entirely if you don't need it.

The analytics code is wrapped in comment markers for easy identification:

```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

### Preview Banner

The preview banner at the bottom of each page is for ZADIE's template preview site. It auto-hides when not viewed from a ZADIE preview URL, and only appears when viewed directly (not in iframes).

To remove it, delete everything between `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->` on each page.

---

## Deployment

This template is static HTML/CSS and runs on any web host:

- **Shared hosting** (Bluehost, SiteGround, etc.): Upload files via FTP
- **Netlify / Vercel**: Drop the folder into the deploy UI
- **GitHub Pages**: Push to a repo and enable Pages
- **Any VPS**: Copy files to the web root

No build step, no Node.js, no server-side language required.

---

## Support

Template by [ZADIE](https://zadie.com). For custom design work or full website builds, visit zadie.com.
