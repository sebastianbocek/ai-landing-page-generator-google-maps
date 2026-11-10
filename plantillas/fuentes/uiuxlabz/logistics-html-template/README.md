# LOGISTICA — Logistics & Supply Chain HTML Template

> Delivering Tomorrow, Today

A premium logistics, freight, and supply chain HTML template. Built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no dependencies -- just clean, fast, production-ready code.

## Pages

| Page | Description | Link |
|------|-------------|------|
| Home | Hero with animated stats, service cards, tracking demo, testimonials, CTA | [index.html](index.html) |
| About | Company story, core values, fleet capabilities, leadership team | [about.html](about.html) |
| Services | Six detailed service sections with alternating image-text layouts | [services.html](services.html) |
| Contact | Quote request form, contact info cards, shipment tracking, map | [contact.html](contact.html) |

## Features

- Fully responsive -- mobile-first with breakpoints at 720px and 980px
- Scroll reveal animations via IntersectionObserver (respects `prefers-reduced-motion`)
- Animated counters for stats and fleet numbers
- Interactive shipment tracking demo with step indicators
- Quote request form with client-side validation and success/error states
- Newsletter subscription in footer
- Back-to-top button with scroll visibility
- Sticky header with blur backdrop and scroll shadow
- Mobile hamburger nav with overlay
- Font Awesome 6.5.1 icon set included
- Google Fonts: Barlow (headings) + Inter (body)
- All images are original -- no external stock photo services

## Quick Start

1. Download or clone the project
2. Open `index.html` in any modern browser
3. No build step, no server required -- everything runs statically

```bash
# Optional: serve locally
npx serve .
# or
python3 -m http.server 8000
```

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Design System

**Colors**

| Token | Value | Usage |
|-------|-------|-------|
| `--orange` | `#F97316` | Primary brand, CTAs, accents |
| `--orange-dark` | `#EA580C` | Hover states |
| `--orange-50` | `#FFF7ED` | Light backgrounds |
| `--navy` | `#1E293B` | Secondary, dark sections |
| `--dark` | `#0F172A` | Footer, stats bar, page heroes |

**Typography**

| Role | Font | Weights |
|------|------|---------|
| Headings | Barlow | 400-900 |
| Body | Inter | 300-700 |

**Spacing scale:** 0.25rem through 8rem (CSS custom properties)

## File Structure

```
logistics-html-template/
  index.html              Home page
  about.html              About page
  services.html           Services page
  contact.html            Contact / Quote page
  README.md               This file
  assets/
    css/
      style.css           Complete design system + all component styles
    js/
      main.js             Vanilla JS: nav, forms, counters, reveals, tracking
    img/
      carousel-1.jpg      Hero background
      carousel-2.jpg      Consulting section
      about.jpg           About / warehouse operations
      feature.jpg         Customs clearance section
      map.png             Contact page map
      service-1.jpg       Air freight
      service-2.jpg       Ocean freight
      service-3.jpg       Road freight
      service-4.jpg       Warehousing
      service-5.jpg       Customs
      service-6.jpg       Consulting
```

## Customization

- **Colors:** Edit CSS custom properties in `:root` at the top of `style.css`
- **Fonts:** Swap the Google Fonts `<link>` in each HTML `<head>` and update `--font-heading` / `--font-body`
- **Content:** All text is plain HTML -- edit directly in each `.html` file
- **Images:** Replace files in `assets/img/` keeping the same filenames, or update `src` attributes
- **Forms:** Forms use `data-form` attribute (`contact`, `quote`, `tracking`). The JS handles validation and status messages via `.form-ok` / `.form-err` classes -- no `alert()` calls
- **Animations:** Toggle reveal classes (`reveal`, `reveal-left`, `reveal-right`, `stagger`) on sections

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

Uses modern CSS (custom properties, clamp, grid, backdrop-filter) and ES6 JavaScript. No polyfills needed for target browsers.

---

[![Build Something Together](https://img.shields.io/badge/Let's_Build_Something_Together-🚀-F97316)](https://tally.so/r/q4q1L9)
