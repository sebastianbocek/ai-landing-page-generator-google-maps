# Stillwater Counseling — Free Website Template

A warm, calming website template for private therapy and counseling practices. Designed for solo practitioners and small group practices.

**Live Preview**: [zadie.com/templates/free-therapist-website-template](https://zadie.com/templates/free-therapist-website-template)

---

## License

This template is free to use for personal and commercial projects. You may use it to build a website for your practice without attribution — though a "Design by ZADIE" link in the footer is appreciated and kept by default.

You may not resell or redistribute this template as a standalone product.

---

## What's Included

```
therapist/
  index.html      — Home page
  about.html      — About the therapist
  services.html   — All service areas + fees
  contact.html    — New client intake form + crisis resources
  styles.css      — Full stylesheet
  README.md       — This file
```

---

## Quick Start

1. Download and unzip the folder.
2. Open `index.html` in your browser to preview locally.
3. Replace placeholder content with your own (see customization guide below).
4. Upload all files to your web host (any static hosting works — Netlify, GitHub Pages, or any shared host).

---

## Customization Guide

### 1. Replace the Business Name and Therapist Info

Search for `Stillwater Counseling` and `Dr. Mara Chen` across all HTML files and replace with your own name and practice name.

### 2. Update Contact Details

In every HTML file, find and replace:
- `(555) 391-6047` with your phone number
- `hello@stillwatercounseling.com` with your email
- `2841 SE Hawthorne Blvd, Suite 204, Portland, OR 97214` with your address

### 3. Update Office Hours

In `contact.html`, find the hours table and update the days and times to match your schedule.

### 4. Update Colors (Optional)

All colors are CSS custom properties at the top of `styles.css` inside `:root { }`. Change the hex values there and everything updates automatically:

```css
:root {
  --sage: #7C9E8A;          /* Primary green — change to your brand color */
  --slate-blue: #5B7BA8;    /* Accent blue */
  --cream: #FAF5EF;         /* Background */
  /* ... */
}
```

### 5. Update Fonts (Optional)

Fonts are loaded from Google Fonts. The import is at the top of `styles.css`. Change the font names in both the `@import` URL and the CSS variable declarations.

### 6. Replace Photo Placeholders

Photo placeholder areas use CSS gradients. Replace them with real `<img>` tags pointing to your own photos. The main therapist photo is in `about.html` and `index.html` inside elements with class `about-photo-placeholder` and `hero-photo-placeholder`.

### 7. Add a Real Map

The map on the contact page is a styled placeholder. Replace it with a Google Maps embed or any map service of your choice.

### 8. Connect the Contact Form

The form in `contact.html` uses `action="#"` as a placeholder. To make it work, connect it to a form service:
- [Formspree](https://formspree.io) — free tier available, works with static sites
- [Netlify Forms](https://www.netlify.com/products/forms/) — if you're hosting on Netlify
- Any backend or serverless function

### 9. Update the Footer Year

Change `2025` in the footer copyright to the current year.

### 10. Remove the ZADIE Analytics and Preview Banner (for download)

The analytics and preview banner blocks are marked with comment tags:
- `<!-- ZADIE-ANALYTICS-START -->` / `<!-- ZADIE-ANALYTICS-END -->`
- `<!-- ZADIE-PREVIEW-BANNER-START -->` / `<!-- ZADIE-PREVIEW-BANNER-END -->`

Remove everything between those comment pairs when you deploy your own site.

---

## Hosting

This is a pure HTML/CSS/JS site with no build step required. It works on any static hosting:

- **Netlify** — drag and drop the folder at netlify.com
- **GitHub Pages** — push to a repo and enable Pages in settings
- **Any shared host** — upload via FTP

---

## Credits

Template design by [ZADIE](https://zadie.com).

Fonts: EB Garamond and Nunito via Google Fonts.
Icons: Font Awesome 6.5.0.
