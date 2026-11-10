# Trattoria Bella — Italian Restaurant HTML Template

A premium, framework-free HTML template for authentic Italian restaurants. Built with semantic HTML, custom CSS design tokens, and vanilla JavaScript. No dependencies required.

**Brand:** Trattoria Bella — "Authentic Italian, Made with Love."

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | [index.html](index.html) | Hero with background image, menu highlights, about teaser, testimonials, reservation CTA, hours, footer |
| About | [about.html](about.html) | Restaurant story timeline, chef team profiles, core values |
| Menu | [menu.html](menu.html) | Filterable menu grid with category tabs + full dotted-line menu display with prices |
| Contact | [contact.html](contact.html) | Reservation form with validation, info cards, hours, location details |

## Features

- **Responsive Design** — Mobile-first layout with breakpoints at 980px, 720px, and 480px
- **Burger Navigation** — Animated mobile menu toggle with aria-expanded accessibility
- **Scroll Reveal** — IntersectionObserver-powered animations (respects prefers-reduced-motion)
- **Form Validation** — Client-side validation with `.form-ok` / `.form-err` feedback (no alerts)
- **Active Navigation** — Current page highlighted via location.pathname
- **Auto Year** — `[data-year]` elements auto-populated with current year
- **Menu Filtering** — Category tabs filter menu cards on the Menu page
- **20 Images** — Stock photos included in `assets/img/`

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Design System

- **Typography:** Playfair Display (headings) + Lato (body) via Google Fonts
- **Colors:** Terracotta `#C2410C` + Olive `#3F6212` + Cream `#FFFBEB` + Dark `#1C1917`
- **CSS Tokens:** All colors, fonts, and spacing defined as CSS custom properties in `:root`
- **Framework-Free:** Pure HTML, CSS, and vanilla JavaScript — no build step needed

## File Structure

```
italian-restaurant-html-template/
├── index.html
├── about.html
├── menu.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── img/
        ├── about-us.jpg
        ├── credit-cards.png
        ├── logo.png
        ├── menu-1.jpg ... menu-9.jpg
        ├── team-1.jpg ... team-4.jpg
        ├── testimonial-1.jpg ... testimonial-3.jpg
        └── testimonial-bg.jpg
```

## Getting Started

1. Open `index.html` in any modern browser — no server required
2. Replace images in `assets/img/` with your own photography
3. Edit text content directly in the HTML files
4. Customize colors by updating CSS tokens in `assets/css/style.css`

## Customization

All design tokens are defined at the top of `style.css`:

```css
:root {
  --terracotta: #C2410C;
  --olive: #3F6212;
  --cream: #FFFBEB;
  --dark: #1C1917;
  /* ... */
}
```

Swap these values to rebrand the entire template in seconds.

---

## Let's Build Something Together

Looking for a custom version of this template or a tailored design for your restaurant?

[Let's Build Something Together 🚀](https://tally.so/r/q4q1L9)
