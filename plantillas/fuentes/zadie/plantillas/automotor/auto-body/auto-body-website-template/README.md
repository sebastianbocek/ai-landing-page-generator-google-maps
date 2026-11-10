# ProFinish Collision Center — Website Template

A complete 4-page website template for auto body and collision repair shops. Dark and technical aesthetic with steel red and charcoal tones. Built with pure HTML and CSS — no JavaScript frameworks, no dependencies.

## License

Free for personal and commercial use. You may use this template for any real business website. Attribution to ZADIE is appreciated but not required once you've customized it for your business.

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the files directly in any text editor (VS Code, Notepad, etc.)
4. Replace placeholder content with your actual business information
5. Upload all files to your web host — no build step required

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, before/after, services overview, certifications, testimonials |
| `about.html` | About page — shop story, technician bios, facility details, insurance partners |
| `services.html` | Services detail — full breakdown of all services offered with process and pricing notes |
| `contact.html` | Contact — estimate request form, contact info, hours, FAQ |
| `styles.css` | All styles — one file, fully commented by section |

## Customization Guide

### Business Details

Search for and replace these values across all four HTML files:

| Placeholder | Replace with |
|-------------|-------------|
| `ProFinish Collision Center` | Your shop name |
| `(314) 555-0156` | Your phone number |
| `repairs@profinishcollision.com` | Your email address |
| `St. Louis, MO` | Your city and state |
| `2003` | Your founding year |
| `22+` | Your years in business |
| `12k+` | Your vehicles repaired count |
| `Gary Voss` | Owner name |

### Color Variables

All colors are defined as CSS custom properties at the top of `styles.css`. Edit the `:root` block:

```css
:root {
  --primary: #C0392B;        /* Steel red — main brand color */
  --primary-dark: #96281B;   /* Darker red for hover states */
  --primary-light: #E74C3C;  /* Lighter red for links */
  --secondary: #1C1C1C;      /* Charcoal — dark backgrounds */
  --accent: #BDC3C7;         /* Silver — secondary text, icons */
  --bg-light: #F2F2F2;       /* Light background sections */
  --bg-dark: #1C1C1C;        /* Dark sections */
  --bg-darker: #111111;      /* Darkest sections — header, hero */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update both the `<link>` tag in each HTML `<head>` and the CSS variables:

```css
:root {
  --font-heading: 'Changa', sans-serif;
  --font-body: 'Arimo', sans-serif;
}
```

Replace the Google Fonts URL in the `<head>` of each page:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Changa:wght@400;500;600;700;800&family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
```

### Photos

All image areas currently use background color gradients. To add real photos, find the placeholder elements and replace the `background` style with your image:

**Hero image** (`index.html`):
```html
<!-- Find this element: -->
<div class="hero-image-main"></div>

<!-- Add a background image via CSS or inline style: -->
<div class="hero-image-main" style="background-image: url('your-photo.jpg'); background-size: cover; background-position: center;"></div>
```

**Before/after panels** — replace the gradient background colors on `.ba-pair-photo` elements with actual photos.

**Team photos** — replace the background gradients on `.team-photo` elements with actual headshots.

**General pattern**: Any element with a `background: linear-gradient(...)` style in an image context can be replaced with `background-image: url('your-image.jpg'); background-size: cover;`

### Services

Add, remove, or edit service entries in `services.html`. Each service follows this structure:

```html
<div class="service-detail-card">
  <div class="service-detail-header">
    <div class="service-detail-tag">Category Label</div>
    <h3>Service Name</h3>
    <p class="service-detail-price">Pricing information</p>
  </div>
  <div class="service-detail-body">
    <p>Service description paragraph.</p>
    <ul class="service-detail-list">
      <li>Bullet point</li>
      <li>Bullet point</li>
    </ul>
  </div>
</div>
```

### Testimonials

Edit the three testimonial cards in `index.html`. Each follows this pattern:

```html
<div class="testimonial-card">
  <div class="testimonial-stars">
    <!-- Five .star divs for 5 stars -->
  </div>
  <blockquote>Customer quote here.</blockquote>
  <div class="testimonial-author">
    <div class="testimonial-avatar" style="background: ...;"></div>
    <div class="testimonial-meta">
      <strong>Customer Name</strong>
      <span>Vehicle description</span>
    </div>
  </div>
</div>
```

### Contact Form

The form in `contact.html` is HTML-only and doesn't submit anywhere by default. To make it functional, update the `action` attribute on the `<form>` tag:

- **Formspree**: `<form action="https://formspree.io/f/your-id" method="post">`
- **Netlify Forms**: Add `netlify` attribute to the form tag
- **Custom backend**: Point the action to your endpoint

### Insurance Partners

Edit the insurance logo grid in `about.html` to reflect your actual carrier relationships:

```html
<div class="insurance-grid">
  <div class="insurance-logo"><span>Carrier Name</span></div>
  <!-- Add or remove as needed — keep multiples of 3 for clean rows -->
</div>
```

### Certifications

Update certification badges on `index.html`, `about.html`, and `services.html` to reflect your actual credentials.

### Footer Year

Update the copyright year in the footer of all four pages:
```html
<p>&copy; 2024 ProFinish Collision Center. All rights reserved.</p>
```

## Deployment

This template is plain HTML/CSS with no build process. Upload all files from this folder to your web host:

- Shared hosting (cPanel, etc.): Upload via FTP or file manager to `public_html/`
- Netlify: Drag and drop the folder at app.netlify.com
- Vercel: `vercel deploy` from the folder
- GitHub Pages: Push to a repo and enable Pages in settings

All four pages and `styles.css` must be in the same directory for links and styles to work correctly.

---

Template by [ZADIE](https://zadie.com)
