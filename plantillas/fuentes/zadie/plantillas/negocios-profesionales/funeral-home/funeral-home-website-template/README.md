# Evergreen Memorial Chapel — Free Website Template

A dignified, compassionate 4-page website template for funeral homes and memorial chapels. Built with pure HTML and CSS. No frameworks, no dependencies.

**License:** Free for personal and commercial use. Attribution appreciated but not required.

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview
3. Find and replace all placeholder business details (see Customization below)
4. Replace photo placeholder divs with real `<img>` tags
5. Connect your contact forms to a form backend (Formspree, Netlify Forms, etc.)
6. Upload the files to your web host

No build tools or npm required.

---

## Pages

| File | Page |
|------|------|
| `index.html` | Home — Hero, services overview, why choose us, testimonials, CTA |
| `about.html` | About Us — Family history, team profiles, facilities, community, credentials |
| `services.html` | Services — Traditional funeral, cremation, pre-planning, grief support, transparent pricing |
| `contact.html` | Contact — Immediate need line, general inquiry form, pre-planning consultation form, location, FAQ |
| `styles.css` | All styles for all four pages |

---

## Customization Guide

### Business Details — Find & Replace

Open all four HTML files and replace these placeholder values:

| Placeholder | Replace with |
|-------------|--------------|
| `Evergreen Memorial Chapel` | Your business name |
| `(937) 555-0118` | Your phone number |
| `care@evergreenmemorial.com` | Your email address |
| `Dayton, OH` | Your city and state |
| `4821 Springbrook Lane` | Your street address |
| `Dayton, OH 45429` | Your full mailing address |
| `Est. 1962` | Your founding year |
| `Montgomery, Greene & Warren counties` | Your service area |
| `1962` / `1987` / `2014` | Your actual milestone years |
| `Harold Whitmore` / `Thomas Whitmore` / `Claire Whitmore-Oakes` | Your actual director names |
| `Whitmore` | Your family name |

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --primary: #4A5568;        /* Slate blue — main nav, buttons, headings */
  --primary-dark: #2D3748;   /* Dark navy — dark sections, footer */
  --primary-light: #718096;  /* Medium gray — secondary text */
  --accent: #9E7B80;         /* Dusty rose — highlights, labels, icons */
  --accent-light: #C4A3A8;   /* Light rose — dark-section text */
  --accent-dark: #7D5F64;    /* Deep rose — immediate need bar, hover states */
  --bg: #F8F6F3;             /* Warm white — page background */
  --bg-warm: #F2EDE8;        /* Slightly warmer — alternating sections */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line at the top of `styles.css` and the two CSS custom properties:

```css
--font-heading: 'Josefin Slab', Georgia, serif;
--font-body: 'Cairo', 'Helvetica Neue', sans-serif;
```

Update the Google Fonts import URL to match whichever fonts you choose.

### Photos

All image areas currently use CSS background color gradients as placeholders. To add real photos:

1. Find the placeholder `<div>` elements (they have classes like `story-photo`, `team-photo`, `facility-photo`, `hero-bg`, etc.)
2. Replace each `<div>` with an `<img>` tag, or set a `background-image` on the existing div

Example for team photos:
```html
<!-- Before -->
<div class="team-photo"></div>

<!-- After -->
<img src="images/director-claire.jpg" alt="Claire Whitmore-Oakes, Funeral Director" class="team-photo">
```

Add this to your CSS to make `<img>` elements fill the space properly:
```css
img.team-photo {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

For the hero, replace the `.hero-bg` div's gradient with a real landscape photo:
```css
.hero-bg {
  background-image: url('images/chapel-exterior.jpg');
  background-size: cover;
  background-position: center;
}
```

### Map

The contact page has a map placeholder. Replace it with a Google Maps embed:

1. Go to maps.google.com and search for your address
2. Click Share > Embed a map > copy the `<iframe>` code
3. Replace the `<div class="map-placeholder">...</div>` block with the iframe

### Contact Forms

The forms use `method="post"` but need a backend to process submissions. Recommended options:

- **Formspree**: Add `action="https://formspree.io/f/YOUR_ID"` to the form tag
- **Netlify Forms**: Add `netlify` attribute to the form tag if hosting on Netlify
- **EmailJS**: Add their JavaScript SDK and configure in your form submit handler

### Analytics

The template includes ZADIE's analytics code, which is removed automatically when you download the template for use. If you need to add your own Google Analytics tracking, add your GA4 measurement ID to the `<head>` of each page.

### Immediate Need Bar

The bar at the top of every page is a critical element for funeral home sites. Keep it visible and make sure the phone number is always correct. Update it on all four pages.

### Pricing

The pricing section on `services.html` shows starting prices. These are fictional placeholders. Review and update all prices to reflect your actual General Price List. The FTC Funeral Rule requires that you provide a GPL to any person who inquires in person.

---

## Technical Notes

- Pure HTML5 and CSS3. No JavaScript frameworks.
- Mobile-responsive with breakpoints at 768px and 1024px
- Mobile navigation menu included on all pages
- Google Fonts loaded via CDN
- SVG icons are inline (no icon library required)
- Passes basic WCAG 2.1 AA color contrast requirements
- Tested in Chrome, Firefox, Safari, and Edge
