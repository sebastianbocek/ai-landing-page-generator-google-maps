# Good Form K9 Training - Free Website Template

A complete 4-page website template for dog training businesses. Built with pure HTML5 and CSS3 - no frameworks, no dependencies beyond Font Awesome icons and Google Fonts.

**Demo Business:** Good Form K9 Training, Portland OR
**Template by:** [ZADIE](https://zadie.com)
**License:** Free for personal and commercial use. Attribution appreciated but not required.

---

## What's Included

- `index.html` - Home page with hero, stats, philosophy, program previews, testimonials, CTA
- `about.html` - Trainer bio, certifications, training methods, facility section
- `services.html` - All 6 programs with full details, what's included, and pricing
- `contact.html` - Inquiry form, contact info, business hours, FAQ
- `styles.css` - Complete stylesheet with CSS variables, responsive layouts, mobile menu
- `images/` - Directory for your photos (empty by default)
- `README.md` - This file

---

## Quick Start

1. Download and unzip the template folder
2. Open any `.html` file in a browser to preview
3. Edit the HTML files with your own business information
4. Replace placeholder content (business name, phone, email, address, pricing)
5. Add your own photos to the `images/` directory and update `<img>` tags
6. Upload to your web host

No build tools. No npm. No compilation step. It's just files.

---

## Customization Guide

### Business Information

Search and replace these values across all HTML files:

| Placeholder | Replace With |
|---|---|
| `Good Form K9 Training` | Your business name |
| `Good Form K9` | Your short business name |
| `Jake Mercer` | Your name |
| `(555) 847-3291` | Your phone number |
| `info@goodformk9.com` | Your email address |
| `Portland, OR` | Your city and state |
| `CPDT-KA` | Your certification(s) |

### Colors

All colors are defined as CSS variables in `styles.css` at the top of the file. Change them in one place and they update everywhere:

```css
:root {
  --primary: #2D6A4F;        /* Forest green - main brand color */
  --primary-dark: #1B4332;   /* Dark green - headers, hero backgrounds */
  --primary-light: #52B788;  /* Light green - accents, highlights */
  --accent: #F4A261;         /* Warm orange - CTA buttons, highlights */
  --accent-dark: #E76F51;    /* Darker orange - hover states */
  --bg: #FDF8F0;             /* Off-white - page background */
  --bg-alt: #F5EFE6;         /* Cream - alternate section background */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line in `styles.css` and the corresponding `--font-heading` and `--font-body` variables:

```css
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

:root {
  --font-heading: 'Epilogue', sans-serif;
  --font-body: 'Nunito', sans-serif;
}
```

### Programs and Pricing

Edit the service cards in `services.html`. Each program card contains the duration, class size, description, what's included list, and pricing options.

### Contact Form

The form in `contact.html` is HTML-only and does not submit anywhere by default. To make it functional, connect it to a form service like:

- [Formspree](https://formspree.io) - Change `action="#"` to your Formspree endpoint
- [Netlify Forms](https://netlify.com) - Add `netlify` attribute to the `<form>` tag
- Your own server-side handler

---

## Adding Photos

The template uses CSS gradient placeholders for all images. To replace them with real photos:

1. Add your images to the `images/` folder
2. Find the placeholder elements (they have class names like `hero-photo`, `about-photo`, `facility-photo`)
3. Replace the CSS `background: linear-gradient(...)` with `background-image: url('images/your-photo.jpg')` and add `background-size: cover; background-position: center;`

Or convert the `<div>` placeholder to an `<img>` tag where appropriate.

---

## Analytics

The template includes Google Analytics (G-DBX9DKSJPZ) on all pages. This tracking code is marked with comment tags for easy removal:

```html
<!-- ZADIE-ANALYTICS-START -->
  ...tracking code...
<!-- ZADIE-ANALYTICS-END -->
```

Replace `G-DBX9DKSJPZ` with your own Google Analytics measurement ID, or remove the entire block if you don't need analytics.

---

## Browser Support

- Chrome, Firefox, Safari, Edge (current versions)
- Mobile Safari (iOS 14+)
- Chrome for Android (current)

Uses CSS Grid and Flexbox for layouts. No IE11 support.

---

## License

Free to use for personal and commercial projects. You may modify and redistribute. Please don't resell as-is without modification.

Template by [ZADIE](https://zadie.com) - we build websites and digital products for small businesses.
