# Graincraft Custom Woodworks — Website Template

A warm artisan website template for custom cabinet makers, woodworking shops, and fine furniture makers. Built with pure HTML5 and CSS3, no frameworks required.

## License

This template is free to use for personal and commercial projects. You may modify it freely. You may not redistribute or resell the template itself. Attribution to [ZADIE](https://zadie.com) is appreciated but not required after customization.

## What's Included

```
cabinet-woodworking/
├── index.html       — Home page
├── about.html       — About the owner and shop
├── services.html    — All 8 services with full detail
├── contact.html     — Project inquiry form and FAQ
├── styles.css       — Full stylesheet
└── README.md        — This file
```

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files to replace placeholder content with your real information
4. Upload to any web host — no build step required

## Customization Guide

### Business Information

Search and replace these strings across all HTML files:

| Placeholder | Replace with |
|---|---|
| `Graincraft Custom Woodworks` | Your business name |
| `Graincraft` | Your short name (used in logo) |
| `Owen Hartley` | Your name |
| `(555) 312-6840` | Your phone number |
| `owen@graincraftwoodworks.com` | Your email address |
| `Asheville, NC` | Your city and state |
| `1847 Merrimon Ave, Asheville, NC 28804` | Your address |
| `Western NC` | Your service area |

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --walnut: #5C3317;        /* Primary dark color */
  --walnut-light: #8B5E3C;  /* Primary mid color */
  --maple: #C4874A;          /* Accent / highlight */
  --maple-light: #E8B87D;    /* Light accent */
  --sage: #6B7C5E;           /* Icon / secondary accent */
  --bg: #FAF6F0;             /* Page background */
  --surface: #FFFFFF;        /* Card / panel background */
  --dark: #2D1B0E;           /* Headings and dark text */
  --gray: #7A6E65;           /* Body text */
  --border: #E8DDD4;         /* Borders and dividers */
}
```

### Fonts

Fonts are loaded from Google Fonts at the top of `styles.css`. To change fonts, update the import URL and the CSS variable values:

```css
@import url('https://fonts.googleapis.com/css2?family=YourHeadingFont&family=YourBodyFont&display=swap');

:root {
  --font-heading: 'YourHeadingFont', serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### Photo Placeholders

All image placeholder areas use CSS background gradients. To replace them with real photos:

1. Find the element with the placeholder class (e.g., `.work-photo-kitchen`)
2. Replace the `background: linear-gradient(...)` in the CSS with `background-image: url('your-photo.jpg'); background-size: cover; background-position: center;`

### Google Analytics

The template includes Google Analytics tracking. To use your own account:

1. Replace `G-DBX9DKSJPZ` in all four HTML files with your own GA4 Measurement ID
2. To remove tracking entirely, delete the blocks between `ZADIE-ANALYTICS-START` and `ZADIE-ANALYTICS-END`

### Removing the Preview Banner

Delete the blocks between `ZADIE-PREVIEW-BANNER-START` and `ZADIE-PREVIEW-BANNER-END` in each HTML file.

## Hosting

This template works on any static web host:

- **Netlify** — Drop the folder onto netlify.com/drop
- **GitHub Pages** — Push to a repo and enable Pages in settings
- **Cloudflare Pages** — Connect your repo and deploy
- **Traditional hosting** — Upload via FTP to your web server's public directory

No build process, no Node.js, no dependencies to install.

## Browser Support

Tested in Chrome, Firefox, Safari, and Edge. Requires CSS Grid and CSS Custom Properties support (all modern browsers).

---

Template by [ZADIE](https://zadie.com) — Free website templates for local businesses.
