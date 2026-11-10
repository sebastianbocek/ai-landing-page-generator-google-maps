# Dental Clinic HTML Template — DENTCARE

Premium, framework-free dental clinic template. Outfit + Inter typography, teal (#0EA5A0) primary, clinical-white aesthetic. Four pages, zero dependencies beyond Google Fonts.

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero with appointment card, 6 treatment cards, reassure strip, team preview, testimonials, booking form |
| About | `about.html` | Brand story, reassure band, 5-person team grid, 4-principle approach section |
| Services | `services.html` | Full 6-card treatment grid, reassure strip, booking form |
| Contact | `contact.html` | Info + booking split layout, 5-item FAQ accordion |

---

## Design Distinction — 6-axis

| Axis | Decision |
|------|----------|
| **Color** | Teal `#0EA5A0` primary, clinical white, soft sky accents — warm but credible |
| **Typography** | Outfit (display/headings) + Inter (body) — geometric warmth meets clinical legibility |
| **Layout** | Tight 3-column grids, 1180px max, generous white space — breath without drift |
| **Cards** | Rounded `22px` corners, 1px border, scale-on-hover reveal — approachable and tactile |
| **Booking** | Teal gradient banner with inline form — high-contrast CTA embedded in content flow |
| **Detail** | Pulse dot on availability, eyebrow pills, check icons — micro-signals that say "this is alive" |

---

## Features

- Pure HTML/CSS/JS — no frameworks, no build step
- Responsive down to 320px (3 breakpoints: 980px, 720px, mobile)
- Sticky header with backdrop blur
- Burger menu with smooth open/close animation
- IntersectionObserver reveal animations (respects `prefers-reduced-motion`)
- FAQ accordion with `[data-faq]`
- Client-side form validation with `.form-ok` / `.form-err` feedback
- Active nav state via `location.pathname`
- Dynamic `[data-year]` in footer
- All images are local (`assets/img/`) — no external dependencies

---

## File Structure

```
dental-clinic-html-template/
├── index.html
├── about.html
├── services.html
├── contact.html
├── README.md
├── assets/
│   ├── css/
│   │   └── base.css          (all styles — tokens, reset, components)
│   ├── js/
│   │   └── main.js           (burger, nav, reveals, FAQ, forms)
│   └── img/
│       ├── about.jpg
│       ├── carousel-1.jpg
│       ├── carousel-2.jpg
│       ├── service-1.jpg
│       ├── service-2.jpg
│       ├── service-3.jpg
│       ├── service-4.jpg
│       ├── team-1.jpg
│       ├── team-2.jpg
│       ├── team-3.jpg
│       ├── team-4.jpg
│       └── team-5.jpg
```

---

## Getting Started

1. Open `index.html` in any browser — no server required
2. All pages link to each other via the nav bar
3. Edit `assets/css/base.css` to change the teal primary or any token
4. Replace images in `assets/img/` — keep filenames to avoid href changes

---

## Let's Build Something Together

[https://tally.so/r/q4q1L9](https://tally.so/r/q4q1L9)
