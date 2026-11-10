# The Enigma Room — Free Website Template

A free, fully responsive website template for escape room businesses. Dark and theatrical aesthetic with four complete pages. Built with pure HTML and CSS — no frameworks, no dependencies.

## License

Free for personal and commercial use. You may use, modify, and deploy this template for any escape room or entertainment business. Attribution appreciated but not required.

## Quick Start

1. Download or clone this folder
2. Open `index.html` in your browser to preview locally
3. Replace the placeholder content with your business details (see Customization Guide below)
4. Upload all files to your web host

No build step required. This is plain HTML and CSS.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, room grid, how it works, testimonials, CTA |
| `about.html` | Company story, team profiles, design philosophy, accessibility |
| `services.html` | Full room details with pricing, private event packages, gift cards, season passes |
| `contact.html` | Booking CTA, group event inquiry form, hours, FAQ |
| `styles.css` | All styles — edit this file to change colors, fonts, and spacing |

## Customization Guide

### Business Details

Search and replace these strings across all HTML files:

| Find | Replace with |
|---|---|
| `The Enigma Room` | Your business name |
| `(206) 555-0183` | Your phone number |
| `escape@theenigmaroom.com` | Your email address |
| `Seattle, WA` | Your city and state |
| `2025 The Enigma Room` | Your year and business name |

### Room Names and Descriptions

Each room has its own section in `services.html`. Search for the room names to find their content blocks:

- `The Alchemist's Lab` — mystery/occult theme
- `The Heist` — thriller/teamwork theme
- `The Seance` — paranormal/Victorian theme
- `Pharaoh's Tomb` — ancient Egypt/archaeology theme

Replace names, story descriptions, difficulty ratings, player counts, pricing, and puzzle type tags as needed.

### Colors

All colors are defined as CSS custom properties in the `:root` block at the top of `styles.css`:

```css
:root {
  --primary: #6B21A8;        /* Rich purple */
  --secondary: #1A1A2E;      /* Deep navy */
  --accent: #D4AF37;         /* Antique gold */
  --bg: #0E0E1A;             /* Near-black background */
  --bg-card: #16162A;        /* Card backgrounds */
  --bg-elevated: #1E1E36;    /* Elevated surfaces */
}
```

Change these values to match your brand. The accent color (`--accent`) is used for primary CTAs, highlights, and decorative elements throughout the site.

### Fonts

The template uses two Google Fonts loaded at the top of `styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap');
```

To change fonts, replace the import URL and update these two variables in `:root`:

```css
--font-heading: 'Cinzel Decorative', serif;
--font-body: 'PT Sans', sans-serif;
```

Browse replacements at [fonts.google.com](https://fonts.google.com).

### Photos

All image areas use CSS background gradients as placeholders. To replace with real photos:

1. Find the placeholder element — it will have a class like `room-image-alchemist`, `team-photo-1`, or `facility-image-lobby`
2. In `styles.css`, find the rule for that class
3. Replace the `background: linear-gradient(...)` with `background-image: url('your-photo.jpg'); background-size: cover; background-position: center;`

Example:
```css
/* Before */
.room-image-alchemist {
  background: linear-gradient(135deg, #1A0A2E 0%, #2D1054 40%, #0E0E1A 100%);
}

/* After */
.room-image-alchemist {
  background-image: url('images/alchemist-room.jpg');
  background-size: cover;
  background-position: center;
}
```

### Booking System

The "Open Booking System" button on the contact page links to `#` as a placeholder. Replace with your actual booking system URL (Checkfront, FareHarbor, Resova, etc.):

```html
<a href="https://your-booking-system.com" class="btn btn-primary">Open Booking System</a>
```

### Contact Form

The group inquiry form on the contact page uses `action="#"` as a placeholder. Connect it to a form backend like Formspree, Netlify Forms, or your own server:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Hours

Business hours appear in two places: the contact page and every footer. Search for the hours block in each file and update to match your actual schedule.

---

Template by [ZADIE](https://zadie.com)
