# Auto Mechanic Website Template

A professional website template for auto repair shops and mechanics. Features a trustworthy, industrial design with clear service information and appointment booking.

## Quick Start

1. Download and extract the template files
2. Open `index.html` in a browser to preview
3. Edit the HTML files to customize content
4. Update CSS variables in `styles.css` to change colors
5. Deploy to any web hosting service

## Files Included

```
auto-mechanic/
├── index.html      # Home page
├── about.html      # About/Company story
├── services.html   # Services & pricing
├── contact.html    # Contact form & info
├── styles.css      # All styles
└── README.md       # This file
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --primary: #1E40AF;      /* Mechanic blue */
  --secondary: #DC2626;    /* Safety red */
  --accent: #94A3B8;       /* Chrome silver */
  --oil: #0F172A;          /* Dark background */
  --concrete: #F1F5F9;     /* Light background */
}
```

### Fonts

The template uses Google Fonts:
- **Headings**: Barlow Condensed
- **Body**: Source Sans 3

To change fonts, update the Google Fonts import at the top of `styles.css` and the `--font-heading` and `--font-body` variables.

### Content

Replace placeholder content in each HTML file:
- Business name and logo
- Contact information
- Service descriptions and pricing
- Team member information
- Testimonials
- Images (replace gradient placeholders)

### Images

Image placeholders use CSS gradients. Replace with actual images:

```html
<!-- Before -->
<div class="about-image"></div>

<!-- After -->
<img src="images/shop.jpg" alt="Our shop" class="about-image">
```

## Features

- Responsive design (mobile, tablet, desktop)
- Mobile navigation menu
- Service cards with pricing
- Contact form with vehicle information
- Trust badges and certifications
- Customer testimonials
- FAQ sections
- Current specials banners

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free for personal and commercial use. Attribution appreciated but not required.

---

Design by [ZADIE](https://zadie.com)
