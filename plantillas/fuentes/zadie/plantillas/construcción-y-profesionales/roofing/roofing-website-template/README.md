# SkyShield Roofing Template

A professional, trustworthy website template designed specifically for roofing contractors and construction companies. Features a strong blue and gray color scheme with clean layouts that inspire confidence.

## Features

- **4 Complete Pages**: Home, About, Services, Contact
- **Professional Design**: Strong, reliable aesthetic perfect for contractors
- **Mobile Responsive**: Fully functional mobile menu and responsive layouts
- **Color Scheme**: Deep blue (#1E40AF), slate gray (#475569), amber (#F59E0B)
- **Typography**: Rubik (headings) + Inter (body)
- **SEO Optimized**: Semantic HTML and meta descriptions included

## Quick Start

1. Download all files
2. Open `index.html` in your browser to preview
3. Customize colors in `styles.css` (see CSS Variables section)
4. Replace placeholder content with your business information
5. Update contact details throughout all pages
6. Upload to your web host

## Customization Guide

### Colors

All colors are defined as CSS variables at the top of `styles.css`:

```css
:root {
  --primary: #1E40AF;        /* Deep blue */
  --primary-dark: #1E3A8A;   /* Darker blue */
  --primary-light: #3B82F6;  /* Lighter blue */
  --secondary: #475569;      /* Slate gray */
  --accent: #F59E0B;         /* Amber */
  --white: #FFFFFF;
  --gray-light: #F1F5F9;
  --gray: #CBD5E1;
  --gray-dark: #334155;
  --dark: #0F172A;
}
```

Change these values to match your brand colors.

### Content to Update

**All Pages:**
- Business name "SkyShield Roofing" (in header and footer)
- Contact information (address, phone, email, hours)
- Navigation links if you add/remove pages
- License number in footer

**Home Page (index.html):**
- Hero headline and description
- Company statistics (25+ years, 5000+ roofs, etc.)
- Limited time offer ($500 off special)
- Services overview cards
- Why choose us section
- Project process timeline
- Testimonials (replace with real customer reviews)
- CTA sections

**About Page (about.html):**
- Company history and founding story
- Team member profiles and photos
- Core values and mission
- Certifications and affiliations
- Community involvement activities

**Services Page (services.html):**
- Service descriptions and pricing
- Roof installation packages
- Repair service pricing
- Storm damage services
- Inspection pricing
- Maintenance plans
- Additional services (gutters, siding, etc.)
- Financing information

**Contact Page (contact.html):**
- Estimate request form (connect to your form handler)
- Office location and hours
- Service area coverage
- FAQ answers specific to your business
- Emergency contact information

### Images

This template uses background colors and emoji for image placeholders. Replace with actual photos:

1. **Hero Image** (`.hero-image`): Roofing crew or completed project
2. **Team Photos** (in about.html): Team member headshots
3. **Testimonial Avatars** (`.author-avatar`): Customer photos (with permission)

To add images, replace the background with a background image:

```css
.hero-image {
  background: url('images/hero-photo.jpg') center/cover;
}
```

### Forms

The contact/estimate request form is HTML-only. To make it functional:

1. Add a form handler service (Formspree, Netlify Forms, etc.)
2. Or connect to your CRM/lead management system
3. Update the `<form>` tag with your form handler endpoint

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="form">
```

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
roofing/
├── index.html          # Home page
├── about.html          # About the company
├── services.html       # Services and pricing
├── contact.html        # Contact form and info
├── styles.css          # All styles
└── README.md          # This file
```

## Typography

The template uses Google Fonts:
- **Rubik**: Modern, strong font for headings
- **Inter**: Clean, professional font for body text

These fonts are loaded from Google Fonts CDN and included in the `<head>` of all pages.

## Icon System

The template uses a CSS-based icon system with SVG data URIs and the CSS `mask-image` property. This allows icons to change color dynamically based on the card or section's color scheme.

Icons are applied using data attributes:
```html
<div class="card-icon" data-icon="shield"></div>
```

Available icons: shield, home, tool, check, dollar, award, phone, mail, map-pin, clock, clipboard, users, star

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization Tips

### Changing Company Focus

While designed for roofing contractors, this template works well for other construction trades:

- **General Contractors**: Change colors to earth tones, update service descriptions
- **Siding Contractors**: Focus on exterior services, adjust pricing
- **Gutter Specialists**: Simplify service offerings, emphasize drainage solutions
- **Construction Companies**: Broaden service descriptions, add commercial focus

### Adding More Pages

To add new pages:
1. Copy an existing HTML file
2. Update the navigation menu on all pages
3. Update footer links
4. Ensure mobile menu includes new page

### Local SEO

Optimize for local search:
1. Update meta descriptions with your city/region
2. Add location keywords to page content
3. Include service area information
4. Add schema markup for local business
5. Create location-specific landing pages if needed

## License

Free to use for commercial and personal projects. Attribution to ZADIE appreciated but not required.

Design by [ZADIE](https://zadie.com)

## Support

For questions or customization help, visit [zadie.com](https://zadie.com)
