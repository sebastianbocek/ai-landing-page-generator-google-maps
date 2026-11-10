# Groundbreak Excavation — Free Website Template

A complete 4-page website template for heavy excavation and site work contractors. Built by [ZADIE](https://zadie.com).

## License

This template is free to use for personal and commercial projects. You may customize it freely. You may not resell it as a standalone template.

**Attribution**: A "Design by ZADIE" link in the footer is appreciated but not required after you customize the template for your business.

## What's Included

- `index.html` — Home page with hero, stats bar, 8 service cards, featured equipment, process steps, and testimonials
- `about.html` — Owner story, full 12-piece fleet list, safety record, values, and service area
- `services.html` — All 8 services with full descriptions, typical project sizes, equipment, and timelines
- `contact.html` — Detailed bid request form, contact info, and 5 FAQ questions
- `styles.css` — Full dark industrial stylesheet with CSS variables
- `README.md` — This file

## Quick Start

1. Download and unzip the template files
2. Open `index.html` in a browser to preview locally
3. Replace all placeholder content with your business information (see Customization Guide below)
4. Upload all files to your web host — no build step required

## Customization Guide

### Business Information

Search and replace the following across all HTML files:

| Placeholder | Replace With |
|---|---|
| `Groundbreak` | Your business name |
| `Excavation` | Your trade or subtitle |
| `Todd Brannigan` | Your name |
| `Columbus, OH` | Your city and state |
| `Central Ohio` | Your service area |
| `(555) 483-7291` | Your phone number |
| `bids@groundbreakexc.com` | Your email address |
| `1847 Industrial Parkway` | Your address |
| `2004` | Your founding year |

### Colors

Open `styles.css` and update the CSS variables in the `:root` block at the top of the file:

```css
:root {
  --primary:      #FFC107;   /* Main accent color (safety yellow) */
  --primary-dark: #E6A800;   /* Darker variant for hover states */
  --orange:       #FF6D00;   /* Secondary accent */
  --bg:           #121212;   /* Page background */
  --surface:      #1E1E1E;   /* Section backgrounds */
  --card:         #252525;   /* Card backgrounds */
}
```

### Fonts

The template uses Google Fonts. To change fonts, update the `@import` line at the top of `styles.css` and the `--font-heading` and `--font-body` CSS variables.

### Services

The 8 service cards on the home page use a 4-column grid. If you add or remove services, update `grid-template-columns` in the `.services-grid` rule in `styles.css` to maintain complete rows.

### Google Analytics

Remove the `<!-- ZADIE-ANALYTICS-START -->` block from all HTML files, or replace `G-DBX9DKSJPZ` with your own Google Analytics measurement ID.

## File Structure

```
excavation/
├── index.html
├── about.html
├── services.html
├── contact.html
├── styles.css
└── README.md
```

## Browser Support

Built with standard HTML5 and CSS3. Works in all modern browsers (Chrome, Firefox, Safari, Edge). No JavaScript frameworks or build tools required.

## Credits

Template designed and built by [ZADIE](https://zadie.com) — website design for small businesses.

Icons: [Font Awesome 6.5](https://fontawesome.com) (Free tier, CDN)
Fonts: [Google Fonts](https://fonts.google.com) — Black Ops One, Public Sans
