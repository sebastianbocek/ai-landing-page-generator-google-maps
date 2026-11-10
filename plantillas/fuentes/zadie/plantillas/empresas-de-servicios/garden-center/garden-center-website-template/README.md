# Roots & Bloom Garden Center — Website Template

A complete 4-page website template for garden centers and plant nurseries. Built with pure HTML and CSS — no frameworks, no dependencies, no build step required.

## License

Free for personal and commercial use. You may use this template for any project, including client work. Attribution is appreciated but not required. You may not resell the template itself.

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files to replace placeholder content with your business information
4. Upload all files to your web host (shared hosting, Netlify, Vercel, etc.)
5. Done

No build tools, no npm, no configuration needed.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, plant categories, seasonal availability, tips, testimonials, newsletter |
| `about.html` | About page — business story, staff bios, facility photos, values, community involvement |
| `services.html` | Services page — nursery, design consultations, installation, supplies, delivery, workshops |
| `contact.html` | Contact page — form, directions, seasonal hours, FAQ, service area |
| `styles.css` | All styles for every page |

## Customization Guide

### Business Details

Search and replace the following across all HTML files:

| Find | Replace with |
|---|---|
| `Roots &amp; Bloom Garden Center` | Your business name |
| `Roots & Bloom` | Your short business name |
| `(541) 555-0193` | Your phone number |
| `hello@rootsandbloom.com` | Your email address |
| `Eugene, OR` | Your city and state |
| `2847 Willamette Street` | Your street address |
| `Eugene, OR 97405` | Your full address |
| `1978` | Your founding year |
| `Since 1978` | Your founding year |
| `2025` | Current year (for copyright) |

### Color Variables

All colors are defined as CSS custom properties at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --primary:        #2C5F2E;  /* Forest green — main brand color */
  --primary-dark:   #1A3C1B;  /* Dark green — backgrounds, headers */
  --primary-light:  #4A8C4D;  /* Light green — accents */
  --secondary:      #C4622D;  /* Terracotta — CTAs, highlights */
  --secondary-dark: #A04E22;
  --secondary-light:#D97D4A;
  --accent:         #D4A017;  /* Warm gold — badges, borders */
  --bg:             #FBF7F0;  /* Warm cream — page background */
  --bg-dark:        #1A3C1B;  /* Dark sections */
}
```

### Fonts

Fonts are loaded from Google Fonts in the `<head>` of each page. To change them:

1. Visit [fonts.google.com](https://fonts.google.com) and select your fonts
2. Replace the `@import` URL in the `<head>` of each HTML file
3. Update the font variables in `styles.css`:

```css
:root {
  --font-heading: 'Yeseva One', Georgia, serif;
  --font-body:    'PT Sans', Helvetica, sans-serif;
}
```

### Hours

Hours appear in two places: the footer on every page, and the dedicated hours section on `contact.html`. Update both locations.

### Navigation

The active page is highlighted in the nav. Each page marks its own nav link with `class="nav-link active"`. Update this if you rename or add pages.

### Photo Placeholders

All image areas use CSS background gradients as placeholders. To replace them with real photos:

1. Find the element with the placeholder class (e.g., `.category-photo.annuals`, `.staff-photo.sarah`)
2. Replace the CSS background with an `<img>` tag, or set the background-image in the CSS:

```css
.category-photo.annuals {
  background-image: url('images/annuals.jpg');
  background-size: cover;
  background-position: center;
}
```

Or add an `<img>` directly inside the placeholder div:

```html
<div class="category-photo annuals">
  <img src="images/annuals.jpg" alt="Annuals in bloom" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Service Area

The delivery service area tags appear on both `services.html` and `contact.html`. Update the city names in the `.area-tag` elements to match your actual service area.

### Workshop Dates

Workshop dates and pricing are on `services.html` in the `#workshops` section. Update the `.workshop-date`, `.workshop-price`, and `.workshop-spots` content for your actual schedule.

### FAQ

The FAQ is on `contact.html`. Questions are fully editable — update the `.faq-question` and `.faq-answer` content to reflect your actual policies and common questions.

### Google Analytics

Analytics tracking is included and configured for ZADIE's own account. Before publishing, replace the tracking ID `G-DBX9DKSJPZ` with your own Google Analytics 4 Measurement ID. Update it in the `<head>` section of each page.

### Newsletter Form

The newsletter form on `index.html` currently has `onsubmit="return false;"` to prevent submission. To connect it to a real email service (Mailchimp, ConvertKit, etc.), replace the `<form>` action and remove the `onsubmit` handler.

## File Structure

```
garden-center/
  index.html      Homepage
  about.html      About page
  services.html   Services page
  contact.html    Contact page
  styles.css      All styles
  README.md       This file
```

## Browser Support

Tested in current versions of Chrome, Firefox, Safari, and Edge. Mobile-responsive at 768px and 1024px breakpoints.
