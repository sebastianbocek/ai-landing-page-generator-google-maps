# Irongate Door Co. - Garage Door Website Template

A bold, industrial-themed website template designed for garage door companies, overhead door installers, and door service businesses.

## Quick Start

1. Download and extract the template files
2. Replace placeholder content with your business information
3. Add your own images to the `images/` folder
4. Update contact details, hours, and service area
5. Deploy to any static hosting provider

## Pages

- **index.html** - Home page with hero, services overview, testimonials, and CTA
- **about.html** - Company story, team bios, values, and facility showcase
- **services.html** - Detailed service descriptions with pricing and maintenance plans
- **contact.html** - Contact form, business info, FAQ, and service area

## Customization

### Colors

Edit the CSS custom properties in `styles.css`:

```css
:root {
  --primary: #2D2D2D;       /* Charcoal - main dark color */
  --secondary: #E8590C;     /* Bright Orange - accent/CTA color */
  --accent: #6B7280;        /* Steel Gray - body text */
  --gray-light: #F3F4F6;    /* Light Gray - backgrounds */
}
```

### Fonts

The template uses Google Fonts:
- **Saira** - Headings and UI elements
- **Barlow** - Body text

To change fonts, update the Google Fonts `<link>` in each HTML file and the `--font-heading` / `--font-body` variables in `styles.css`.

### Content

- Replace all placeholder text with your business details
- Update phone number, email, and address across all pages
- Swap service descriptions and pricing to match your offerings
- Add your own team member bios

### Images

Replace the CSS gradient placeholders with actual images by adding `background-image` to the relevant elements (`.hero-image`, `.team-photo`, `.service-detail-image`, etc.).

## Features

- Pure HTML5 and CSS3 (no JavaScript frameworks)
- Fully responsive (mobile, tablet, desktop)
- Mobile hamburger menu
- CSS animations with reduced-motion support
- Contact form with service dropdown
- FAQ section
- Service area listing
- Maintenance plan pricing table
- Emergency service banner

## Browser Support

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

## License

Free for personal and commercial use. Attribution appreciated but not required.
