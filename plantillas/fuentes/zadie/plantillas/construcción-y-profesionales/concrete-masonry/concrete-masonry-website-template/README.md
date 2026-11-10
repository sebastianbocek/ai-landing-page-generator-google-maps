# Bedrock Concrete & Masonry Website Template

A complete 4-page website template for concrete and masonry contractors. Built with pure HTML5 and CSS3, no frameworks required.

## License

Free to use for personal and commercial projects. Attribution ("Design by ZADIE") must remain in the footer. You may not resell this template.

Full license: https://zadie.com/templates/license

## What's Included

- `index.html` - Home page with hero, services overview, project gallery, testimonials, service area, and CTA
- `about.html` - Owner story, team, certifications, values, and equipment list
- `services.html` - All 6 services with full descriptions, process details, and gallery placeholders
- `contact.html` - Estimate request form, contact info, FAQ, and service area city list
- `styles.css` - Complete stylesheet with CSS variables, responsive layout, and all component styles
- `images/` - Directory for your photos (see Customization below)
- `README.md` - This file

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files to replace placeholder content with your business information
4. Add your photos to the `images/` directory and update the CSS placeholder classes with your images
5. Upload the entire folder to your web host

No build tools, no package managers, no dependencies beyond Google Fonts and Font Awesome (both loaded from CDN).

## Customization Guide

### Business Information

Search and replace throughout all HTML files:

- `Bedrock Concrete & Masonry` - Your business name
- `Frank Russo` - Owner name
- `(555) 628-4730` - Your phone number
- `frank@bedrockconcrete.com` - Your email address
- `Denver, CO 80202` - Your city and zip code
- `2003` - Your founding year
- `22` - Your years in business
- `1,200+` - Your project count
- `6 Full-Time` - Your crew size
- Service area cities and counties throughout `index.html` and `contact.html`

### Colors

All colors are defined as CSS variables in `:root` at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --primary-dark: #2C2A28;   /* Dark charcoal - header, hero, dark sections */
  --brick-red: #8B3A1E;      /* Primary accent - buttons, icons, highlights */
  --brick-light: #B85233;    /* Button hover states */
  --sand: #C4A882;           /* Secondary accent - logo sub, decorative elements */
  --bg: #F0EDE8;             /* Page background */
  --surface: #FAF8F5;        /* Card backgrounds, alternate sections */
}
```

### Fonts

Fonts are loaded from Google Fonts in `styles.css`. To change them:

1. Visit https://fonts.google.com and select your preferred fonts
2. Replace the `@import` URL at the top of `styles.css`
3. Update the font variables:

```css
:root {
  --font-heading: 'Your Heading Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Adding Real Photos

The template uses CSS gradient placeholders for all photos. To add real images, find the placeholder div and replace it with an `<img>` tag, or add a `background-image` CSS property:

Option 1 - Background image on the placeholder div:
```css
.project-photo-1 {
  background-image: url('images/your-project-photo.jpg');
  background-size: cover;
  background-position: center;
}
```

Option 2 - Replace the div with an img element:
```html
<img src="images/your-project-photo.jpg" alt="Stamped concrete patio - Lakewood, CO">
```

Recommended image sizes:
- Project photos (homepage): 900 x 560px
- Team photos: 600 x 440px
- Service gallery photos: 600 x 400px

### Services

All 6 services are fully written. To add, remove, or rename services:

- Home page service cards: edit the `.services-grid` section in `index.html`
- Full service descriptions: edit the corresponding `#service-id` sections in `services.html`
- Footer service links: update in the footer of all 4 pages
- Service type dropdown: update the `<select>` options in `contact.html`

### Testimonials

Three testimonials are included. Replace the text and names with real reviews. The `.testimonial-avatar` divs use CSS gradient backgrounds -- to add real photos, add a `background-image` CSS property or swap them for `<img>` tags.

### FAQ

Five FAQ questions are included in `contact.html`. Add, remove, or rewrite questions to match your most common customer inquiries.

## Google Analytics

The template includes Google Analytics tracking (ID: G-DBX9DKSJPZ). Before launching:

1. Create your own Google Analytics 4 property at https://analytics.google.com
2. Replace `G-DBX9DKSJPZ` with your Measurement ID in all 4 HTML files
3. The tracking code is marked with `ZADIE-ANALYTICS-START` and `ZADIE-ANALYTICS-END` comments for easy finding

## Deployment

This is a static website. It works with any web host that serves HTML files:

- **Shared hosting** (Bluehost, SiteGround, HostGator): Upload via FTP or file manager
- **Netlify**: Drag and drop the folder at https://netlify.com/drop
- **Vercel**: Connect to a GitHub repository or use the Vercel CLI
- **GitHub Pages**: Push to a repository and enable Pages in repository settings

No server-side processing is required. The contact form uses a standard `<form>` element -- you'll need to configure a form handling service (Netlify Forms, Formspree, or your own backend) to receive submissions.

## Browser Support

- Chrome, Firefox, Safari, Edge (current versions)
- iOS Safari 14+
- Android Chrome 90+
- Internet Explorer is not supported

## Support

For questions about this template, visit https://zadie.com or email hello@zadie.com.

For customization help or a fully custom website for your business, visit https://zadie.com/done-for-you.
