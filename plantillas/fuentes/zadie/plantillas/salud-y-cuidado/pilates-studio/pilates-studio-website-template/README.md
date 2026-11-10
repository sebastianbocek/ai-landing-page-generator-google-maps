# Core Balance Pilates — Website Template

A clean, minimal, and refined 4-page website template for a boutique Pilates studio. Built with pure HTML and CSS, no frameworks required.

**Design by [ZADIE](https://zadie.com)**

---

## License

Free to use for personal and commercial projects. You may use, modify, and deploy this template for any client or business. You may not resell the template itself as a standalone product.

Attribution in the footer is appreciated but not required once you have customized the template for your business.

---

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview locally.
3. Replace placeholder content with your business information (see Customization Guide below).
4. Upload all files to your web host. No build step required.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page with hero, principles, class types, instructor highlight, testimonials, and intro offer CTA |
| `about.html` | Studio story, lead instructor bio, philosophy pillars, studio details, and certifications |
| `services.html` | All class offerings with pricing, membership plans, and class pass bundles |
| `contact.html` | Trial class signup form, general inquiry form, weekly schedule timetable, location info, and FAQ |
| `styles.css` | All styles in a single file using CSS custom properties |

---

## Customization Guide

### 1. Business Details (Find and Replace)

Use your text editor's find-and-replace to swap out these placeholder values across all HTML files:

| Placeholder | Replace With |
|-------------|-------------|
| `Core Balance Pilates` | Your studio name |
| `Core Balance` | Your studio short name (used in logo) |
| `(720) 555-0163` | Your phone number |
| `hello@corebalancepilates.com` | Your email address |
| `Denver, CO` | Your city and state |
| `3412 Wyandot Street` | Your street address |
| `Denver, CO 80211` | Your city, state, and zip |
| `Highland neighborhood` | Your neighborhood |
| `Sarah Ellison` | Lead instructor's name |
| `2025 Core Balance Pilates` | Your business name for copyright |

### 2. Pricing

Update all pricing throughout `services.html` and `index.html`:

- Reformer group class: `$32`
- Mat class: `$22`
- Tower class: `$38`
- Private session: `$85`
- Duet session: `$55`
- Intro Series: `$99`
- Intro month offer: `$49`
- Membership plans: `$109`, `$199`, `$289`
- Class pass bundles: update amounts and per-class rates

### 3. Color Variables

All colors are defined in `:root` at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --primary: #B8929A;        /* Dusty mauve — main brand color */
  --primary-dark: #9E7880;   /* Darker primary for hover states */
  --primary-light: #D4B4BA;  /* Lighter primary for accents */
  --secondary: #8DAA9D;      /* Sage green */
  --secondary-dark: #6E8F82;
  --secondary-light: #AECBC0;
  --accent: #9B8B7A;         /* Warm taupe */
  --bg: #FAFAF8;             /* Main background */
  --bg-dark: #3D3530;        /* Dark sections background */
}
```

### 4. Fonts

Fonts are loaded from Google Fonts. To change them, update the `<link>` tag in the `<head>` of each HTML file and update the CSS variables:

```css
:root {
  --font-heading: 'Julius Sans One', serif;
  --font-body: 'PT Serif', Georgia, serif;
}
```

### 5. Photos

All image placeholder areas use background gradients. To replace with real photos:

Find elements with classes like `.hero-image`, `.instructor-image`, `.story-image-main`, `.class-card-image`, etc. in the HTML and replace with `<img>` tags, or update the CSS to use `background-image: url(...)` instead of the gradient.

Example:
```css
/* In styles.css */
.hero-image {
  background-image: url('images/studio-hero.jpg');
  background-size: cover;
  background-position: center;
}
```

### 6. Class Schedule

The weekly timetable in `contact.html` uses a `<table>` layout. Update the class names, times, and days to match your actual schedule. Each class entry uses a `<span class="class-tag">` for color coding:

```html
<span class="class-tag reformer">Reformer</span>
<span class="class-tag mat">Mat</span>
<span class="class-tag private">Tower</span>
```

### 7. Removing the ZADIE Preview Banner

The preview banner (shown only when viewed directly, not in an iframe) is wrapped in comment markers. Remove everything between and including these markers on each page:

```
<!-- ZADIE-PREVIEW-BANNER-START -->
...
<!-- ZADIE-PREVIEW-BANNER-END -->
```

### 8. Analytics

The Google Analytics code is wrapped in comment markers for easy removal or replacement:

```
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

Replace `G-DBX9DKSJPZ` with your own Google Analytics measurement ID, or remove the block entirely if you use a different analytics tool.

---

## File Structure

```
pilates-studio/
├── index.html
├── about.html
├── services.html
├── contact.html
├── styles.css
└── README.md
```

---

## Browser Support

Built with standard HTML5 and CSS3. Tested in Chrome, Firefox, Safari, and Edge. Responsive down to 320px viewport width.
