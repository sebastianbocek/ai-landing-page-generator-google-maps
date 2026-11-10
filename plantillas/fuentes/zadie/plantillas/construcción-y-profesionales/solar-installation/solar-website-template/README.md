# Solaris Energy Co. - Solar Installation Website Template

A modern, professional website template for solar panel installation companies and clean energy businesses.

## Pages

- **Home** (`index.html`) - Hero, services overview, why go solar stats, testimonials, CTA
- **About** (`about.html`) - Company story, values, team, impact stats
- **Services** (`services.html`) - Detailed services, financing options, installation process
- **Contact** (`contact.html`) - Consultation request form, contact info, FAQ

## Quick Start

1. Download and unzip the template files
2. Open `index.html` in your browser to preview
3. Edit the HTML files to replace placeholder content with your business information
4. Upload to your web hosting provider

## Customization

### Colors

All colors are defined as CSS custom properties in `styles.css`. Update these values to match your brand:

```css
:root {
  --primary: #F59E0B;        /* Solar amber */
  --primary-dark: #D97706;
  --primary-light: #FCD34D;
  --secondary: #1E40AF;      /* Deep blue */
  --secondary-dark: #1E3A8A;
  --secondary-light: #3B82F6;
}
```

### Typography

The template uses Google Fonts:
- **Albert Sans** for headings
- **DM Sans** for body text

To change fonts, update the `@import` URL at the top of `styles.css` and the `--font-heading` / `--font-body` variables.

### Content

- Replace placeholder text with your company details
- Update phone numbers, email, and address
- Replace gradient placeholders in image areas with your photos
- Update testimonials with real customer reviews

### Images

Replace the gradient placeholder divs with actual images:

```html
<!-- Before -->
<div class="hero-image-placeholder"></div>

<!-- After -->
<img src="images/your-photo.jpg" alt="Description" class="hero-image-placeholder">
```

## Features

- Responsive design (mobile, tablet, desktop)
- Mobile hamburger menu
- CSS-only animations with reduced motion support
- FAQ accordion
- Contact form with property type selector
- No JavaScript frameworks required

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Free for personal and commercial use. Attribution appreciated but not required.

---

Design by [ZADIE](https://zadie.com)
