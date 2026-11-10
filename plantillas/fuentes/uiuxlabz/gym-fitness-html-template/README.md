# FITCORE - Gym & Fitness Center HTML Template

A premium, framework-free HTML template for gyms and fitness centers. Built with semantic HTML5, modern CSS (custom properties, Grid, Flexbox, clamp()), and vanilla JavaScript.

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with fitness imagery, feature cards, about section, class previews, trainer profiles, membership pricing, testimonials, CTA banner |
| About | `about.html` | Mission/Vision/Goals tabs, team profiles, facility gallery, counter stats |
| Classes | `classes.html` | Weekly schedule table, detailed class cards for all programs |
| Contact | `contact.html` | Contact info cards, message form with validation, OpenStreetMap embed, membership registration form |

---

## Design Distinction (6-Axis)

| Axis | FITCORE Approach |
|------|------------------|
| **Color System** | Energetic red `#DC2626` paired with dark `#111827` and charcoal `#1F2937`. Light accent `#FEF2F2` for soft backgrounds. High contrast for energy and authority. |
| **Typography** | Oswald (headings) for bold, condensed uppercase strength. Inter (body) for clean, modern readability. `clamp()` fluid scaling across all breakpoints. |
| **Icon Motif** | Custom SVG dumbbell logo and inline SVG icon system throughout -- no external icon libraries. Every icon is hand-drawn SVG for zero-dependency performance. |
| **Pulse Badge** | Fixed-position "Join Now" circular badge with CSS `pulse-ring` animation -- a constant, energetic CTA that never lets the user forget the primary action. |
| **Dark Dominance** | Hero, about section, and pricing featured card use deep dark backgrounds. Red accents pop against dark surfaces for visual hierarchy and gym-brand energy. |
| **Motion & Reveal** | IntersectionObserver-driven scroll animations (reveal, reveal-left, reveal-right) at 0.12 threshold. Counter animations with eased counting. Smooth transitions on all interactive elements. |

---

## Features

- **Pure HTML/CSS/JS** -- zero frameworks, zero build tools
- **CSS Custom Properties** -- complete design token system (colors, spacing, typography, shadows)
- **Responsive** -- fluid layout with breakpoints at 980px and 720px
- **Grid & Flexbox** -- modern layout throughout, no floats
- **clamp()** -- fluid typography and spacing that scales naturally
- **IntersectionObserver** -- performant scroll-triggered animations (0.12 threshold)
- **Burger Menu** -- mobile navigation with smooth slide-in
- **Active Navigation** -- auto-highlights current page
- **data-year** -- footer copyright auto-updates to current year
- **Form Validation** -- `data-form` attribute with `.form-ok` / `.form-err` message states
- **Tab System** -- Mission/Vision/Goals on About page
- **Schedule Table** -- full weekly class timetable with hover states
- **Pricing Cards** -- 3-tier membership with featured "Most Popular" highlight
- **Testimonials** -- star ratings, quotes, member avatars
- **Join Now Pulse Badge** -- fixed CTA with CSS animation
- **Back to Top** -- scroll-aware button
- **Print Styles** -- hides interactive elements for clean printing
- **Original Source Images** -- all 38 images from the source template, no placeholder services

---

## Technical Specs

- **No external dependencies** (Google Fonts for typography only)
- **No JavaScript frameworks** -- vanilla JS IIFE pattern
- **Semantic HTML5** -- `<header>`, `<nav>`, `<section>`, `<footer>`, ARIA labels
- **Accessible** -- keyboard-navigable burger, ARIA labels on icons, focus styles
- **Performance** -- lazy loading on iframe, passive scroll listeners, no layout thrash

---

## Getting Started

1. Open `index.html` in any browser -- no server required
2. All assets are relative (`assets/css/`, `assets/js/`, `assets/img/`)
3. Edit content directly in the HTML files
4. Customize colors by changing CSS custom properties in `:root`

---

## Contact

Let's Build Something Together :rocket: / https://tally.so/r/q4q1L9
