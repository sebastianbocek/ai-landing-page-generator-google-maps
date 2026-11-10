# Ironweld Fabrication — Free Website Template

A dark, industrial website template for custom metal fabrication and welding businesses. Built with pure HTML and CSS. No frameworks, no build tools, no dependencies beyond a Google Fonts import and Font Awesome via CDN.

**Demo:** [zadie.com/templates/free-welding-website-template](https://zadie.com/templates/free-welding-website-template)

---

## What's Included

```
welding/
├── index.html        Home page
├── about.html        About / team / shop equipment
├── services.html     Full service detail pages
├── contact.html      Quote form, FAQ, service area
├── styles.css        Complete stylesheet
└── README.md         This file
```

### Pages

- **Home** — Hero with diagonal orange accent stripe, stats bar, 6-service grid, 4-step process, portfolio grid, testimonials, CTA
- **About** — Founder bio, certifications, team cards, detailed equipment list, materials section
- **Services** — Full detail card for each of the 6 services with capabilities, materials, lead times, and per-service quote CTA
- **Contact** — Detailed quote form (9 fields including project type, material, deadline, budget), contact info sidebar, 5-question FAQ accordion, service area section

---

## Design

**Theme:** Raw industrial. Forge orange on near-black. Heavy slab typography. No gradients on white. No soft pastels.

| Token | Value |
|---|---|
| Background | `#111111` |
| Surface | `#1C1C1C` |
| Card background | `#242424` |
| Primary (forge orange) | `#FF4500` |
| Secondary (weld gold) | `#F5A623` |
| White | `#FFFFFF` |
| Gray | `#9CA3AF` |
| Gray dark | `#6B7280` |

**Fonts:** Squada One (headings) + Barlow (body) — both from Google Fonts

**Icons:** Font Awesome 6.5.0 via CDN

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files with your business information
4. Update `styles.css` if you want to change colors or fonts
5. Host on any static hosting provider (Netlify, Vercel, GitHub Pages, cPanel)

No build step required. No npm install. Open and edit.

---

## Customization Guide

### Business Information

Search and replace these placeholder values across all four HTML files:

| Placeholder | Replace with |
|---|---|
| `Ironweld Fabrication` | Your business name |
| `Marcus Vega` | Your name |
| `(555) 763-4182` | Your phone number |
| `shop@ironweldfab.com` | Your email address |
| `Houston, TX` | Your city and state |
| `North Houston, TX` | Your specific location |
| `Est. 2006` | Your founding year |
| `18 Years` / `18 years` | Your years of experience |
| `500+` | Your project count |
| `8,000 sq ft` / `8,000 Sq Ft` | Your shop size |

### Colors

All colors are CSS custom properties in `styles.css`. Change them in the `:root` block at the top of the file:

```css
:root {
  --bg: #111111;           /* Page background */
  --surface: #1C1C1C;      /* Section backgrounds */
  --card-bg: #242424;      /* Card backgrounds */
  --primary: #FF4500;      /* Forge orange — main accent */
  --primary-dark: #CC3700; /* Darker orange for hover states */
  --secondary: #F5A623;    /* Weld gold — secondary accent */
  --white: #FFFFFF;
  --gray: #9CA3AF;
  --gray-dark: #6B7280;
}
```

### Fonts

Fonts are imported from Google Fonts in `styles.css`. To change:

1. Go to [fonts.google.com](https://fonts.google.com) and select your fonts
2. Replace the `@import` line at the top of `styles.css`
3. Update `--font-heading` and `--font-body` in the `:root` block

### Services

The template is built around 6 services. To modify:

- Add or remove service cards in `index.html` (the services grid section)
- Add or remove full service detail cards in `services.html`
- Update the services list in all four page footers to match

Keep the service grid in `index.html` at 3 or 6 items for clean layout (3-column grid).

### Portfolio / Work Samples

The portfolio section in `index.html` uses CSS gradient placeholders. To add real images:

```html
<!-- Replace the gradient placeholder div with an img tag -->
<div class="portfolio-card">
  <img
    src="images/your-project-photo.jpg"
    alt="Description of project"
    class="portfolio-placeholder"
    style="object-fit:cover;"
  />
  <div class="portfolio-overlay">
    <span class="portfolio-label">Project Name</span>
    <span class="portfolio-sub">Material / Type</span>
  </div>
</div>
```

### Team Photos

Same approach as portfolio. The team photo placeholders are `div` elements with CSS gradient backgrounds. Replace with `img` tags using real photos at an aspect ratio of 4:3.

### FAQ

Five questions are included on the contact page. The accordion is powered by a small inline JavaScript block. Add or remove `.faq-item` elements freely.

---

## Technical Notes

- Pure HTML5 and CSS3. No JavaScript frameworks.
- Mobile responsive with breakpoints at 1024px, 768px, and 480px.
- Mobile hamburger menu included on all pages.
- FAQ accordion uses vanilla JS (no library required).
- Google Analytics tracking code included (remove before launch if you use a different analytics platform — look for the `ZADIE-ANALYTICS-START` / `ZADIE-ANALYTICS-END` comment markers).
- Preview banner included for template demo purposes. Remove before launch — look for `ZADIE-PREVIEW-BANNER-START` / `ZADIE-PREVIEW-BANNER-END` comment markers.
- All internal navigation links are relative and work locally without a server.
- Photo placeholders use CSS gradients only. No external image dependencies.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

CSS custom properties and `clip-path` are used. IE11 is not supported.

---

## License

Free to use for personal and commercial projects. Attribution to ZADIE appreciated but not required. You may not resell this template as a standalone product.

---

## Built by ZADIE

[zadie.com](https://zadie.com) — We build websites and web applications for small businesses and startups.

If you need this template customized, set up on hosting, or want a fully custom design built from scratch, [get in touch](https://zadie.com/contact).
