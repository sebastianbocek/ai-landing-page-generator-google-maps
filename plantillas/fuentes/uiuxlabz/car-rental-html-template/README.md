# Cental -- Car Rental HTML Template

A premium, framework-free car rental website template with a bespoke navy and teal design system.

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Design Distinction

**Cental** is built from the ground up as a zero-dependency, framework-free HTML template. Every pixel is hand-crafted with a purpose-built CSS design system -- no Bootstrap, no Tailwind, no jQuery.

### Color System
- **Navy `#0F2340`** -- Deep, authoritative backgrounds for the navbar, hero, features, and footer. Conveys trust and professionalism.
- **Teal `#00C2A8`** -- Vibrant accent for CTAs, highlights, icons, and interactive elements. Adds energy and modernity.
- **Neutral Palette** -- A carefully tuned range of grays from `#F4F7FA` to `#3D4D61` for text hierarchy and subtle backgrounds.

### Typography
- **Plus Jakarta Sans** (800, 700, 600, 500) -- Headings and brand elements. Geometric, modern, and highly legible.
- **Inter** (400-700) -- Body text. Designed for screens with excellent readability at all sizes.
- **DM Mono** (400, 500) -- Badges, labels, and monospace accents. Adds technical credibility.

### Signature Elements
1. **Booking Widget** -- A floating card overlaid on the hero with pickup/return location selects, date picker, and animated search CTA. The centerpiece of the homepage.
2. **Car Price Badges** -- Each fleet card features a floating teal price badge and category tag, creating clear visual hierarchy.
3. **Road-Sweep Animation** -- Custom `data-animate="road-sweep"` transitions with a subtle translateY + rotation that evoke forward motion.
4. **Staggered Reveals** -- Children of `.stagger-children` animate in sequence using CSS transition-delay, no JS library needed.
5. **SVG Car Logo** -- Custom inline SVG brand mark with a car silhouette and teal accent dot.
6. **Feature Icon Cards** -- Glowing teal icon containers with hover-to-fill transitions on the navy background.
7. **Counter Animation** -- Numbers animate from 0 to target using `requestAnimationFrame` with cubic easing when scrolled into view.

### Motion Design
- All animations are pure CSS + Intersection Observer (vanilla JS)
- `data-animate` attribute system: `fade-left`, `fade-right`, `road-sweep`, `scale-up`
- Stagger children with `.stagger-children` parent class
- Smooth transitions with custom cubic-bezier easing (`--ease-out`, `--ease-spring`)

---

## Template Structure

```
car-rental-html-template/
  index.html          -- Homepage (hero + booking + fleet + how-it-works + about + team + testimonials + CTA)
  about.html           -- About page (story + values + team)
  services.html        -- Services page (offerings + fleet showcase + advantages)
  contact.html         -- Contact page (form + info cards + map)
  README.md            -- This file
  assets/
    css/
      base.css         -- Complete bespoke design system (no frameworks)
    js/
      main.js          -- Vanilla JS: navbar, scroll animations, booking widget, counters
    img/
      banner-1.jpg     -- Hero background
      car-1..4.png     -- Fleet vehicle images
      team-1..4.jpg    -- Team member photos
      testimonial-1..3.jpg -- Customer avatars
      about-img.jpg, about-img-1.jpg -- About section images
      about-icon-1.png, about-icon-2.png -- Vision/Mission icons
      + more
```

## Pages

| Page | Sections |
|------|----------|
| **index.html** | Topbar, Navbar, Hero with Booking Widget, Fleet Grid, How It Works, About, Features, Stats, Team, Testimonials, CTA, Footer |
| **about.html** | Page Header, Story, Values, Team, CTA, Footer |
| **services.html** | Page Header, Services Grid, Fleet Showcase, Advantages, CTA, Footer |
| **contact.html** | Page Header, Contact Form, Info Cards, Map, Footer |

## Key Features

- **100% Framework-Free** -- Pure HTML, CSS, and vanilla JavaScript
- **Responsive** -- Fluid layouts from 320px to 1440px+
- **Accessible** -- Semantic HTML, ARIA labels, keyboard navigation
- **Performance** -- No render-blocking dependencies, lazy-loaded map
- **Custom Properties** -- Full CSS variable system for easy theming
- **Scroll Animations** -- Intersection Observer powered, no libraries

## How to Use

1. Open `index.html` in any modern browser
2. Replace placeholder content with your own
3. Swap images in `assets/img/` (keep filenames or update references)
4. Customize colors by editing CSS variables in `base.css` `:root` block

## Color Customization

Change the brand colors in `assets/css/base.css`:

```css
:root {
  --navy:  #0F2340;  /* Primary dark */
  --teal:  #00C2A8;  /* Accent / CTA */
}
```

---

**Let's Build Something Together**

[https://tally.so/r/q4q1L9](https://tally.so/r/q4q1L9)
