# CAR SERV — Auto Repair / Garage HTML Template

A framework-free, premium HTML template for auto repair shops, garages, and mechanic businesses. Built with vanilla HTML, CSS, and JavaScript. No dependencies, no build step.

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## Pages

| Page | Description |
|------|-------------|
| [index.html](index.html) | Homepage — hero, stats, service cards, why-us band, team, testimonial, CTA |
| [about.html](about.html) | About — story, process steps, team grid, testimonial |
| [services.html](services.html) | Services — 6 service cards with add-to-quote, process steps, CTA |
| [contact.html](contact.html) | Contact — form with validation, info column, map placeholder |

## Design Distinction

How CAR SERV differs from sibling templates:

| Axis | CAR SUCRE | FORGE | MERIDIAN | CHEFER | DENTCARE | **CAR SERV** |
|------|-----------|-------|----------|--------|----------|-------------|
| Industry | Bakery | Blacksmith/Forge | Travel/Expo | Chef/Catering | Dental | **Auto Repair** |
| Primary Color | Pink/Rose | Deep Red | Navy Blue | Green | Teal | **Orange #FF6B2B** |
| Typography | Playfair + Lato | Oswald + Open Sans | Poppins + DM Sans | Merriweather + Nunito | Raleway + Roboto | **Space Grotesk + Inter** |
| Tone | Elegant, sweet | Bold, industrial | Professional, global | Warm, culinary | Clean, clinical | **Rugged, trustworthy** |
| Imagery Style | Desserts, pastries | Metalwork, fire | Landscapes, events | Food, plating | Smiles, teeth | **Cars, garages, tools** |
| Accent Element | Sprinkles texture | Sparks motif | Compass lines | Herb illustrations | Tooth icon | **Wrench/gear accents** |

## Features

- **Framework-free** — pure HTML/CSS/JS, zero dependencies
- **Sticky header** with glassmorphism backdrop blur
- **Responsive** — mobile hamburger nav, fluid grids, clamp()-based typography
- **Scroll reveals** via IntersectionObserver (no library)
- **Form validation** with `.form-ok` / `.form-err` feedback (no alert popups)
- **Cart demo** with `[data-add]` buttons for service items
- **Year auto-update** via `[data-year]` in footer
- **Consistent design system** — CSS custom properties for colors, spacing, radii, shadows

## File Structure

```
auto-service-html-template/
├── assets/
│   ├── css/
│   │   └── base.css          # Design system + all components (261 lines)
│   ├── img/
│   │   ├── about.jpg
│   │   ├── carousel-1.png
│   │   ├── carousel-2.png
│   │   ├── carousel-bg-1.jpg
│   │   ├── carousel-bg-2.jpg
│   │   ├── service-1.jpg
│   │   ├── service-2.jpg
│   │   ├── service-3.jpg
│   │   ├── service-4.jpg
│   │   ├── team-1.jpg
│   │   ├── team-2.jpg
│   │   ├── team-3.jpg
│   │   └── team-4.jpg
│   └── js/
│       └── main.js           # Nav, reveals, forms, cart demo (83 lines)
├── index.html                # Homepage
├── about.html                # About page
├── services.html             # Services page
├── contact.html              # Contact page
└── README.md
```

## Customization

- **Colors**: Edit CSS custom properties in `:root` within `base.css`
- **Typography**: Swap Google Fonts import and font-family stacks
- **Content**: Update text, images, and links directly in the HTML files
- **Services**: Add/remove cards in `services.html` using the `.card` structure
- **Team**: Swap team member photos and names in `index.html` and `about.html`

## Tech Stack

- HTML5 semantic markup
- CSS3 with custom properties, clamp(), grid, flexbox
- Vanilla JavaScript (ES6 IIFE, IntersectionObserver)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono

## Credits

Built as part of the UI/UX Labz template collection.

---

## Let's Build Something Together

Have a project in mind? Let's talk.

**https://tally.so/r/q4q1L9**
