# Pampered Paws Pet Grooming Template

A playful, warm website template designed specifically for pet grooming salons and mobile pet grooming businesses. Features a friendly pink and purple color scheme with rounded corners and a welcoming aesthetic.

## Features

- **4 Complete Pages**: Home, About, Services, Contact
- **Pet-Friendly Design**: Warm, playful aesthetic perfect for pet businesses
- **Mobile Responsive**: Fully functional mobile menu and responsive layouts
- **Color Scheme**: Soft pink (#FF6B9D), purple (#9B59B6), orange (#FFA500)
- **Typography**: Fredoka (headings) + Nunito (body)
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
  --primary: #FF6B9D;        /* Soft pink */
  --primary-dark: #E85585;   /* Darker pink */
  --primary-light: #FFB3C6;  /* Lighter pink */
  --secondary: #9B59B6;      /* Purple */
  --accent: #FFA500;         /* Orange */
  --cream: #FFF8F0;          /* Warm cream background */
  --dark: #3D2E26;           /* Warm brown */
}
```

Change these values to match your brand colors.

### Content to Update

**All Pages:**
- Business name "Pampered Paws Grooming" (in header and footer)
- Contact information (address, phone, email, hours)
- Navigation links if you add/remove pages

**Home Page (index.html):**
- Hero headline and description
- New client 20% off special offer
- Services overview cards
- Why choose us section
- Process/what to expect steps
- Testimonials (replace with real customer reviews)
- CTA sections

**About Page (about.html):**
- Company story and founding details
- Team member profiles and photos
- Mission statement
- Facility description
- Certifications and training details
- Community involvement activities

**Services Page (services.html):**
- Service descriptions and pricing
- Package details and inclusions
- Add-on spa treatments
- A la carte services
- Multi-visit package deals
- Pricing policies and requirements

**Contact Page (contact.html):**
- Business hours
- Booking form (connect to your booking system)
- Location and parking details
- FAQ answers specific to your business
- Directions to your salon

### Images

This template uses background colors for image placeholders. Replace with actual photos:

1. **Hero Image** (`.hero-image`): Pet being groomed or salon exterior
2. **Team Photos** (in about.html): Groomer headshots
3. **Testimonial Avatars** (`.author-avatar`): Customer/pet photos (with permission)

To add images, replace the background gradient with a background image:

```css
.hero-image {
  background: url('images/hero-photo.jpg') center/cover;
}
```

### Forms

The contact/booking form is HTML-only. To make it functional:

1. Add a form handler service (Formspree, Netlify Forms, etc.)
2. Or connect to your booking software's API
3. Update the `<form>` tag with your form handler endpoint

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
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
pet-grooming/
├── index.html          # Home page
├── about.html          # About the business
├── services.html       # Services and pricing
├── contact.html        # Contact form and info
├── styles.css          # All styles
└── README.md          # This file
```

## Typography

The template uses Google Fonts:
- **Fredoka**: Friendly, rounded font for headings
- **Nunito**: Soft, readable font for body text

These fonts are loaded from Google Fonts CDN and included in the `<head>` of all pages.

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
