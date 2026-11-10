# TrueView Home Inspections — Website Template

A clean, professional 4-page website template for home inspection businesses. Built with pure HTML5 and CSS3. No dependencies, no build tools.

## License

Free for personal and commercial use. You may use, modify, and deploy this template for any business. Attribution to ZADIE is appreciated but not required (the footer link may be removed once you've downloaded the template).

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview
3. Edit the HTML files to replace placeholder content with your business details
4. Update `styles.css` to change colors, fonts, or layout
5. Deploy to any static web host (Netlify, Vercel, GitHub Pages, etc.)

No build process. No npm install. Just HTML and CSS.

## Pages

| File | Page | Purpose |
|------|------|---------|
| `index.html` | Home | Hero, inspection types, certifications, testimonials, CTA |
| `about.html` | About | Inspector bios, company story, philosophy, service area |
| `services.html` | Services | Pricing cards, add-ons, full coverage breakdown |
| `contact.html` | Schedule | Inspection request form, contact info, hours, FAQ |
| `styles.css` | Styles | All CSS for the full site |

## Customization Guide

### 1. Business Details (Find and Replace)

Search across all HTML files and replace:

| Placeholder | Replace with |
|-------------|--------------|
| `TrueView Home Inspections` | Your business name |
| `(972) 555-0138` | Your phone number |
| `inspect@trueviewhome.com` | Your email address |
| `Dallas-Fort Worth, TX` | Your city/region |
| `TREC License #12847` | Your license number |
| `InterNACHI #NACHI-19041502` | Your certification number |
| `2012` | Your founding year |
| `1,400+` | Your inspection count |
| `12yr` | Your years of experience |

### 2. Color Variables

Open `styles.css` and edit the `:root` block at the top:

```css
:root {
  --primary: #1E3A5F;        /* Navy blue — main brand color */
  --primary-dark: #152C49;   /* Darker navy for hover states */
  --primary-light: #2A4F80;  /* Lighter navy for gradients */
  --secondary: #F59E0B;      /* Amber — accent/CTA color */
  --secondary-dark: #D97706; /* Darker amber for hover states */
  --secondary-light: #FCD34D;/* Lighter amber */
  --accent: #64748B;         /* Slate — muted text and UI */
  --bg: #F8F9FA;             /* Page background */
  --bg-section: #EEF2F7;    /* Alternate section background */
}
```

### 3. Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line at the top of `styles.css` and the font variables:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

:root {
  --font-heading: 'YourHeadingFont', sans-serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### 4. Inspector Bios and Team Photos

In `about.html`, locate the `.team-card` elements. Each card has:
- A `.team-photo` div — replace the `background` style with an actual `<img>` tag or CSS background-image pointing to a real photo
- `.team-name`, `.team-title`, and `.team-bio` for the inspector's information
- `.cred-tag` items for certifications

### 5. Testimonials

In `index.html`, find the `.testimonials-grid` section. Replace the placeholder text, client names, and `.author-avatar` background colors with real client photos or initials-based avatars.

### 6. Service Area

Update the counties list in both `about.html` (the `.counties-list`) and `contact.html` to match your actual service territory.

### 7. Photo Placeholders

All photo areas currently use background gradients. Replace them with real photos by changing:

```css
/* Before */
background: linear-gradient(160deg, #2A4F80 0%, #152C49 100%);

/* After */
background-image: url('images/your-photo.jpg');
background-size: cover;
background-position: center;
```

Or use `<img>` tags inside the container divs.

### 8. Pricing

Update all pricing figures in `services.html` to match your actual rates. The pricing appears in:
- `.service-price` elements within each `.service-card`
- `.addon-price` elements within each `.addon-card`
- The `.type-price` elements in `index.html`

### 9. Form Action

The contact form in `contact.html` uses `action="#"` as a placeholder. Connect it to a real form handler:
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — add `netlify` attribute to the `<form>` tag
- [Formspree](https://formspree.io) — set `action="https://formspree.io/f/your-id"`
- Your own backend endpoint

### 10. Google Analytics

The template includes Google Analytics (G-DBX9DKSJPZ) for ZADIE's preview tracking. Replace this ID with your own in all four HTML files, or remove the analytics blocks entirely.

Look for the comment markers:
```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

## Deployment

This is a static site. It can be deployed anywhere that serves HTML:

- **Netlify**: Drag the folder into the Netlify dashboard
- **Vercel**: `vercel deploy` from the folder
- **GitHub Pages**: Push to a repo and enable Pages
- **Traditional hosting**: Upload files via FTP to your web root

No server-side processing required unless you add a form backend.

---

Template by [ZADIE](https://zadie.com)
