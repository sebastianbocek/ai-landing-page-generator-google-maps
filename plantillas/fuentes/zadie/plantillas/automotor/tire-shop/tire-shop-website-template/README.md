# TreadMax Tire & Auto - Website Template

A professional, industrial-styled website template designed for tire shops and auto service centers.

## Quick Start

1. Download and extract the template files
2. Replace placeholder content with your business information
3. Upload to your web hosting provider

## Pages Included

- **Home** (`index.html`) - Hero section, services overview, trust signals, testimonials, and CTA
- **About** (`about.html`) - Company story, values, team bios, and certifications
- **Services** (`services.html`) - Detailed service descriptions with pricing and oil change packages
- **Contact** (`contact.html`) - Quote request form, contact info, service area, and FAQ

## Customization

### Colors

All colors are defined as CSS custom properties in `styles.css`. Update the `:root` block:

```css
:root {
  --primary: #B91C1C;      /* Deep Red */
  --secondary: #1F2937;    /* Dark Charcoal */
  --accent: #D97706;       /* Amber */
  --off-white: #F5F5F4;    /* Light Gray Background */
}
```

### Fonts

The template uses Google Fonts loaded via `@import` in `styles.css`:

- **Headings**: Chakra Petch
- **Body**: IBM Plex Sans

To change fonts, update the `@import` URL and the `--font-heading` / `--font-body` variables.

### Images

Replace the placeholder areas in the `images/` directory with your own photos. Recommended sizes:

- Hero images: 1200x600px
- Team photos: 400x500px
- Service images: 600x400px

### Content

- Update business name, address, phone number, and hours across all pages
- Replace team member names, roles, and bios
- Adjust service descriptions and pricing to match your offerings
- Update testimonials with real customer reviews

## Technical Details

- Pure HTML5 and CSS3 (no JavaScript frameworks)
- Responsive design with breakpoints at 1024px, 768px, and 480px
- CSS Grid and Flexbox layouts
- Mobile navigation menu with hamburger toggle
- Supports `prefers-reduced-motion` for accessibility
- Font Awesome 6.5 icons via CDN

## License

Free for personal and commercial use. Attribution link appreciated but not required.
