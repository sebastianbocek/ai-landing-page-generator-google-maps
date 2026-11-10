# ClearPane Glass & Mirror — Website Template

A clean, light, and glass-inspired website template for custom glass and mirror businesses. Built with pure HTML5 and CSS3. No frameworks or build tools required.

## License

This template is free to download and use for personal and commercial projects. You may customize it for your own business. You may not resell the template as a standalone product.

**Attribution**: A "Design by ZADIE" link is included in the footer of each page. You're welcome to remove it once you've customized the template for your business.

---

## What's Included

```
glass-window/
  index.html      — Home page
  about.html      — About page (owner bio, showroom, glass types)
  services.html   — All 8 services with detailed descriptions
  contact.html    — Quote form, FAQ, hours, service area
  styles.css      — Full stylesheet with CSS custom properties
  README.md       — This file
```

---

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview.
3. Edit the HTML files with your business name, contact details, and content.
4. Update the CSS variables in `styles.css` if you want to adjust colors or fonts.
5. Upload the folder to your web host or deploy to a static hosting service.

No build step. No dependencies. Just open and edit.

---

## Customization Guide

### Business Details

Search and replace the following placeholder values across all HTML files:

| Placeholder | Replace With |
|---|---|
| `ClearPane Glass & Mirror` | Your business name |
| `Diane Reeves` | Owner's name |
| `(555) 274-9130` | Your phone number |
| `hello@clearpanego.com` | Your email address |
| `Phoenix, AZ` | Your city and state |
| `4820 N 19th Ave` | Your street address |

### Colors

Colors are defined as CSS custom properties at the top of `styles.css`. To change the primary brand color, update these values:

```css
:root {
  --crystal-blue: #0284C7;   /* Primary brand color */
  --blue-light: #38BDF8;     /* Accent / highlights */
  --navy-dark: #0F172A;      /* Dark backgrounds, headings */
  --silver: #94A3B8;         /* Secondary text */
}
```

### Fonts

The template uses Mulish (headings) and DM Sans (body) from Google Fonts, loaded via the `@import` at the top of `styles.css`. To change fonts, replace the import URL and update the font family variables:

```css
--font-heading: 'Mulish', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

### Services

The services page (`services.html`) includes 8 service detail cards. Each card has an anchor ID (`#custom-mirrors`, `#shower-enclosures`, etc.) that the services overview grid links to. Add, remove, or rename services by editing the card HTML and the corresponding navigation links.

### Contact Form

The contact form in `contact.html` uses a standard HTML `<form>` element with `action="#"`. To make it functional, you'll need to connect it to a form backend. Options include:

- **Netlify Forms** — Add `netlify` attribute to the `<form>` tag if hosting on Netlify
- **Formspree** — Change `action="#"` to your Formspree endpoint
- **EmailJS** — Add the EmailJS script and configure form submission
- **Custom backend** — Update the form action to your server endpoint

### Google Analytics

Each page includes Google Analytics tracking with ID `G-DBX9DKSJPZ` (the ZADIE template tracking ID). Replace this with your own GA4 measurement ID in all four HTML files, or remove the analytics block entirely.

The analytics code is wrapped in `<!-- ZADIE-ANALYTICS-START -->` and `<!-- ZADIE-ANALYTICS-END -->` comment markers for easy identification.

### Preview Banner

The preview banner that appears at the bottom of each page is wrapped in `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->` markers. Remove the entire block (including the script tag) when deploying your site.

---

## Hosting

This is a static website with no server-side requirements. It can be hosted on:

- **Netlify** (free tier, drag-and-drop deploy)
- **Vercel** (free tier, simple CLI deploy)
- **GitHub Pages** (free for public repositories)
- **Any standard web host** with HTML/CSS support (cPanel, etc.)

---

## Browser Support

Tested and working in:

- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

The `backdrop-filter` CSS property (used for frosted glass card effects) requires Safari 9+ or Chrome 76+. On older browsers, cards will display with a solid white background instead of the blur effect. Everything else degrades gracefully.

---

## Template by ZADIE

Built by [ZADIE](https://zadie.com) — a small team that makes websites and web tools for people who need to get things done.

Download more free templates at [zadie.com/templates](https://zadie.com/templates).
