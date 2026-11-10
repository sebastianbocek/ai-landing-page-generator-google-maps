# Rising Sun Martial Arts — Website Template

A complete 4-page website template for a traditional martial arts school. Clean, structured, and built with a disciplined Japanese aesthetic. Crimson, near-black, and gold — no gradients-on-white clichés.

## License

Free for personal and commercial use. You may use, modify, and deploy this template for any client or personal project. Attribution to ZADIE is appreciated but not required after download. Do not resell the template as-is.

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview locally — no build step required
3. Edit the HTML files with your business information (see customization guide below)
4. Update the color variables in `styles.css` if you want to adjust the palette
5. Deploy the folder to any static hosting provider (Netlify, Vercel, GitHub Pages, shared hosting)

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, disciplines grid, audience overview, philosophy statement, testimonials, CTA |
| `about.html` | About the dojo — sensei profile and lineage, dojo history, budo philosophy pillars, facility, community stats |
| `services.html` | Programs and pricing — Kids Karate, Teen Program, Adult Classes, Private Lessons, Family Package, full class schedule, belt progression system |
| `contact.html` | Contact page — free trial class signup form, general inquiry form, dojo address and hours, FAQ (8 questions) |
| `styles.css` | All styles — CSS custom properties, layout, components, responsive breakpoints |

## Customization Guide

### Business Details to Find and Replace

Do a global find-and-replace across all HTML files for these values:

| Placeholder | Replace with |
|-------------|--------------|
| `Rising Sun Martial Arts` | Your dojo name |
| `Sensei Kenji Hayashi` | Your instructor's name |
| `(480) 555-0129` | Your phone number |
| `train@risingsunma.com` | Your email address |
| `Scottsdale, AZ` | Your city and state |
| `8420 E. McDowell Road` | Your street address |
| `Suite 105` | Your suite or unit (remove if not applicable) |
| `Scottsdale, AZ 85257` | Your full city, state, zip |
| `2007` | Your founding year |
| `2025` | Current year (footer copyright) |

### Color Variables

All colors are defined as CSS custom properties at the top of `styles.css`. Edit these values to change the entire site palette:

```css
:root {
  --primary: #8B0000;        /* Crimson — primary brand color */
  --primary-dark: #6B0000;   /* Darker crimson for hover states */
  --primary-light: #A82020;  /* Lighter crimson */
  --secondary: #0D0D0D;      /* Near-black — backgrounds, footer */
  --accent: #C9A84C;         /* Gold — highlights and accents */
  --accent-dark: #A88830;    /* Darker gold */
  --accent-light: #DFC070;   /* Lighter gold */
  --bg: #FAF8F5;             /* Warm white — main background */
  --bg-warm: #F2EDE6;        /* Slightly darker warm white — alternate sections */
}
```

### Fonts

The template uses two Google Fonts loaded via `@import` in `styles.css`:

- **Koulen** — display/heading font. Distinctive, structured, slightly condensed.
- **Noto Sans** — body font. Clean, highly legible across all weights.

To change fonts, update the `@import` URL at the top of `styles.css` and update these variables:

```css
:root {
  --font-heading: 'Koulen', 'Georgia', serif;
  --font-body: 'Noto Sans', 'Georgia', sans-serif;
}
```

### Programs and Pricing

Pricing and program details are written directly into `services.html`. Find the program cards section and update:

- Monthly tuition amounts (`$89`, `$119`, `$149`)
- Age ranges for each program
- Class features and what's included
- Registration fee (`$65`)
- Private lesson rate (`$85/hr`)
- Family discount percentages

### Class Schedule

The schedule table is in `services.html` and a quick-reference version appears in `contact.html`. Update days, times, program names, and instructor names to match your actual schedule.

### Belt Progression

The belt progression graphic in `services.html` uses inline CSS colors for each belt color. Modify the colors in the `.belt-bar` elements if your school uses a different progression system.

### Adding Photos

Image placeholders throughout the template use CSS background gradients. To replace them with real photos:

1. Find elements with inline `style="background: linear-gradient(...)"`
2. Replace the gradient with: `style="background-image: url('path/to/your-photo.jpg'); background-size: cover; background-position: center;"`

Key photo areas:
- Sensei profile photo: `.sensei-photo-frame` in `about.html`
- Dojo history photo: the gradient div in the two-column layout in `about.html`
- Community/tournament photo: the gradient div in the community section in `about.html`
- Facility photos: three `.facility-photo` divs in `about.html`

### Testimonials

Testimonial text and attribution are in `index.html`. The avatar placeholders use gradient backgrounds. Replace the gradient styles with actual photos if available, using `border-radius: 50%; overflow: hidden;` on the avatar container.

### Google Analytics

The template includes ZADIE's analytics code wrapped in comment markers:

```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

Replace `G-DBX9DKSJPZ` with your own Google Analytics Measurement ID, or remove the entire block if you use a different analytics tool.

### Sensei Credentials

The credential items in `about.html` (rank, training years, lineage, certifications) are inside `.credential-item` elements. Update each `credential-value` span with your instructor's actual credentials.

### Contact Form Action

Both forms in `contact.html` have `action="#"` as placeholders. Connect them to a real form handler:

- For simple email forwarding: use Formspree (`action="https://formspree.io/f/your-id"`)
- For a custom backend: update the `action` attribute to your endpoint URL
- For a CMS with forms: follow your platform's integration instructions

## File Structure

```
martial-arts/
├── index.html       Homepage
├── about.html       About page
├── services.html    Programs and schedule
├── contact.html     Contact and trial signup
├── styles.css       All styles
└── README.md        This file
```

## Technical Notes

- Pure HTML5 and CSS3. No JavaScript frameworks or build tools required.
- Mobile menu is fully functional via vanilla JavaScript included at the bottom of each page.
- The preview banner (ZADIE branding) is automatically removed when processed through the ZADIE download system.
- All internal links use relative paths and work correctly when served from any directory.
- Google Fonts are loaded via CSS `@import`. Fonts require an internet connection to load — they do not come bundled with the template.
