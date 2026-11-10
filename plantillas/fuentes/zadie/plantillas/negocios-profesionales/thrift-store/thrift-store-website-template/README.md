# Second Story Consignment — Free Website Template

A complete 4-page website template for a thrift and consignment store. Designed by [ZADIE](https://zadie.com).

## License

Free for personal and commercial use. You may use this template to build a website for any business. You may not resell or redistribute the template itself as a standalone product.

Attribution ("Design by ZADIE") in the footer is appreciated but not required after customization.

---

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview.
3. Edit the HTML files to replace placeholder content with your own.
4. Update `styles.css` to change colors and fonts if needed.
5. Upload all files to your web host. No build step required.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, categories, new arrivals, mission, testimonials, CTA |
| `about.html` | About — shop story, team bios, curation philosophy, nonprofit partners |
| `services.html` | Shop & Consign — departments, pricing, consignment process, what we accept, estate services |
| `contact.html` | Contact — general form, consignment inquiry form, hours, location, FAQ |
| `styles.css` | All styles — colors, typography, layout, responsive breakpoints |

---

## Customization Guide

### 1. Business Details (find and replace)

Search every HTML file for the following placeholder values and replace them:

| Placeholder | Replace with |
|---|---|
| `Second Story Consignment` | Your business name |
| `Second Story` | Your short business name (used in logo) |
| `Consignment & Thrift` | Your tagline or business type |
| `Minneapolis, MN` | Your city and state |
| `(612) 555-0174` | Your phone number |
| `hello@secondstoryconsignment.com` | Your email address |
| `2025 Second Story Consignment` | Your copyright line |

### 2. Hours

Update the store hours table in `contact.html` (the `.hours-list` section) and the footer contact block in all four pages.

### 3. Colors

All colors are defined as CSS custom properties in the `:root` block at the top of `styles.css`. Change these values to match your brand.

```css
:root {
  --primary: #D4900A;        /* Mustard — main CTAs and accents */
  --primary-dark: #A86E07;   /* Darker mustard — hover states */
  --primary-light: #E8B040;  /* Lighter mustard */
  --secondary: #5E7E60;      /* Sage green — secondary actions */
  --accent: #B85C38;         /* Rust — accent details */
  --bg: #FAF7F2;             /* Warm off-white — page background */
  --dark: #2C2416;           /* Near-black brown — dark sections */
}
```

### 4. Fonts

Fonts are loaded from Google Fonts. To change them:

1. Replace the Google Fonts `@import` URL at the top of `styles.css` with your chosen fonts.
2. Update the font variables:

```css
:root {
  --font-heading: 'Rozha One', Georgia, serif;
  --font-body: 'Hind', 'Helvetica Neue', sans-serif;
}
```

### 5. Photos

All image areas use CSS background colors and gradients as placeholders. To add real photos:

- Find elements with classes like `.category-bg`, `.story-image`, `.team-photo`, `.arrival-image`, `.hero-bg-pattern`, etc.
- Replace the background gradient with `background-image: url('your-image.jpg'); background-size: cover; background-position: center;`

Example:
```css
/* Before (placeholder) */
.cat-furniture .category-bg {
  background: linear-gradient(135deg, #8B6914 0%, #C49A3C 50%, #7A5A10 100%);
}

/* After (real photo) */
.cat-furniture .category-bg {
  background-image: url('images/furniture.jpg');
  background-size: cover;
  background-position: center;
}
```

### 6. Consignment Terms

The consignment split, payout schedule, and consignment period are described in `services.html`. Update these to match your actual terms before launching.

### 7. Removing ZADIE Analytics

The Google Analytics code blocks are wrapped in comments (`ZADIE-ANALYTICS-START` / `ZADIE-ANALYTICS-END`). Remove those blocks entirely if you don't want ZADIE's analytics, and replace with your own tracking code if needed.

### 8. Navigation

All four pages share the same header and footer. If you add or rename pages, update the `<nav>` block and footer links in all four HTML files.

---

## Technical Notes

- Pure HTML5 and CSS3 — no JavaScript frameworks or build tools required.
- Google Fonts loaded via `@import` in `styles.css`.
- Responsive breakpoints at 768px (mobile) and 1024px (tablet).
- Mobile navigation toggle is pure JavaScript, no dependencies.
- Forms are HTML-only and require a backend or form service (Formspree, Netlify Forms, etc.) to function.

---

Built by [ZADIE](https://zadie.com) — websites for local businesses.
