# Align Wellness Chiropractic Template

A professional, clean website template designed specifically for chiropractors and chiropractic clinics. Features a healing green and blue color scheme with an active, wellness-focused aesthetic.

## Features

- **4 Complete Pages**: Home, About, Services, Contact
- **Professional Design**: Clean, trustworthy layout appropriate for healthcare
- **Mobile Responsive**: Fully functional mobile menu and responsive layouts
- **Color Scheme**: Healing green (#059669), calm blue (#0EA5E9), energy orange (#F97316)
- **Typography**: Outfit (headings) + Source Sans 3 (body)
- **SEO Optimized**: Semantic HTML and meta descriptions included

## Quick Start

1. Download all files
2. Open `index.html` in your browser to preview
3. Customize colors in `styles.css` (see CSS Variables section)
4. Replace placeholder content with your practice information
5. Update contact details throughout all pages
6. Upload to your web host

## Customization Guide

### Colors

All colors are defined as CSS variables at the top of `styles.css`:

```css
:root {
  --primary: #059669;        /* Healing green - adjustments, buttons */
  --secondary: #0EA5E9;      /* Calm blue - gradients, accents */
  --accent: #F97316;         /* Energy orange - special offers */
  --dark: #134E4A;           /* Deep teal - headings */
}
```

Change these values to match your brand colors.

### Content to Update

**All Pages:**
- Practice name "Align Wellness" (in header and footer)
- Contact information (address, phone, email, hours)
- Navigation links if you add/remove pages

**Home Page (index.html):**
- Hero headline and description
- New patient special offer
- Services overview
- Conditions treated
- Testimonials (replace with real patient reviews)
- Insurance providers list
- Statistics/credentials

**About Page (about.html):**
- Doctor profile and credentials
- Professional photo (replace `doctor-image` div background)
- Education and certifications
- Treatment philosophy
- Facility description
- Professional affiliations

**Services Page (services.html):**
- Service descriptions and pricing
- Treatment techniques offered
- Conditions you specialize in
- Therapy modalities available
- Package pricing
- Insurance information

**Contact Page (contact.html):**
- Office hours
- Appointment form (connect to your booking system)
- Location and parking details
- FAQ answers specific to your practice

### Images

This template uses background colors for image placeholders. Replace with actual photos:

1. **Hero Image** (`.hero-image`): Patient receiving care or doctor portrait
2. **Doctor Profile** (`.doctor-image`): Professional headshot
3. **Testimonial Avatars** (`.author-avatar`): Patient photos (with permission)

To add images, replace the background color with a background image:

```css
.hero-image {
  background: url('images/hero-photo.jpg') center/cover;
}
```

### Forms

The contact form is HTML-only. To make it functional:

1. Add a form handler service (Formspree, Netlify Forms, etc.)
2. Or connect to your practice management software's booking API
3. Update the `<form>` tag with your form handler endpoint

### Analytics

Google Analytics is pre-installed (tracking ID: G-DBX9DKSJPZ). This is ZADIE's tracking code for template preview analytics.

**Replace with your own:**
1. Find the analytics code in the `<head>` section (between `ZADIE-ANALYTICS-START` and `ZADIE-ANALYTICS-END`)
2. Replace `G-DBX9DKSJPZ` with your Google Analytics ID
3. Or remove entirely if not using analytics

### Preview Banner

The preview banner at the bottom of the page is for demonstration purposes only.

**To remove:**
Delete everything between `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->` on all pages.

## File Structure

```
chiropractor/
├── index.html          # Home page
├── about.html          # About the practice
├── services.html       # Services and pricing
├── contact.html        # Contact form and info
├── styles.css          # All styles
└── README.md          # This file
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Free to use for commercial and personal projects. Attribution to ZADIE appreciated but not required.

Design by [ZADIE](https://zadie.com)

## Support

For questions or customization help, visit [zadie.com](https://zadie.com)
