# FixIt Pro Handyman Services - Website Template

A professional, approachable website template designed for handyman and home repair businesses. Built with pure HTML5 and CSS3, no JavaScript frameworks required.

## Quick Start

1. Download and unzip the template files
2. Replace placeholder content with your business information
3. Add your own images to the `images/` folder
4. Upload to your web hosting provider

## Pages Included

- **Home** (`index.html`) - Hero section, services overview, why choose us, testimonials, and call-to-action
- **About** (`about.html`) - Company story, values, team profiles, and business stats
- **Services** (`services.html`) - Detailed service categories with pricing, additional services, and process steps
- **Contact** (`contact.html`) - Service request form with urgency selector, contact information, business hours, and FAQ

## Customization

### Colors

Edit the CSS variables in `styles.css` to match your brand:

```css
:root {
  --primary: #2563EB;        /* Trustworthy blue */
  --secondary: #D97706;      /* Tool amber */
  --accent: #EFF6FF;         /* Light blue tint */
}
```

### Fonts

This template uses Google Fonts:
- **Headings**: Asap (bold, approachable)
- **Body**: Nunito Sans (clean, readable)

To change fonts, update the Google Fonts import URL and the `--font-heading` / `--font-body` variables.

### Images

Replace the gradient placeholders with your own photos:
- Hero background images
- Team member photos
- Project/work photos

### Content

Update the following throughout all pages:
- Business name and tagline
- Phone number and email address
- Physical address and service area
- Service descriptions and pricing
- Team member names and bios
- Testimonials
- FAQ answers

### Form

The contact form uses a standard HTML form. Connect it to your preferred form handling service (Formspree, Netlify Forms, etc.) by updating the `action` attribute on the `<form>` element.

## Features

- Fully responsive (mobile, tablet, desktop)
- Mobile hamburger menu
- CSS custom properties for easy theming
- Accessible markup with ARIA labels
- Reduced motion support
- Font Awesome icons
- No JavaScript dependencies (only vanilla JS for mobile menu and FAQ toggles)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free for personal and commercial use. Attribution appreciated but not required.

Design by [ZADIE](https://zadie.com)
