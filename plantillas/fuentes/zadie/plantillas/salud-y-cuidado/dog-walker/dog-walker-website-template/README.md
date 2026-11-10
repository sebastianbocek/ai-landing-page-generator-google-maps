# Happy Trails Pet Care - Free Website Template

A friendly, outdoorsy website template designed for dog walking and pet sitting businesses. Built with pure HTML5 and CSS3.

## Quick Start

1. Download and unzip the template files
2. Open `index.html` in your browser to preview
3. Edit the HTML files with your business information
4. Upload to your web hosting provider

## Pages Included

- **Home** (`index.html`) - Hero, services overview, why choose us, testimonials, CTA
- **About** (`about.html`) - Company story, team bios, values
- **Services** (`services.html`) - Pricing cards, how it works, service area
- **Contact** (`contact.html`) - Contact form, business info, FAQ

## Customization

### Colors

All colors are defined as CSS custom properties in `styles.css`. Update the `:root` block to match your brand:

```css
:root {
  --primary: #15803D;       /* Forest green */
  --secondary: #92400E;     /* Warm brown */
  --accent: #0EA5E9;        /* Sky blue */
  --cream: #FEFCE8;         /* Background cream */
}
```

### Fonts

The template uses [Quicksand](https://fonts.google.com/specimen/Quicksand) for headings and [Nunito](https://fonts.google.com/specimen/Nunito) for body text, loaded via Google Fonts. To change fonts, update the Google Fonts link in each HTML file's `<head>` and the `--font-heading` and `--font-body` variables in `styles.css`.

### Content

Replace all placeholder text with your actual business information:
- Business name and contact details
- Service descriptions and pricing
- Team member names and bios
- Testimonials from real clients
- Address and service area

### Images

Image placeholder areas use CSS gradients. Replace them with your own photos by adding `<img>` tags or updating the background properties in CSS.

### Contact Form

The form doesn't include a backend. Connect it to your preferred form handler (Formspree, Netlify Forms, etc.) by updating the `<form>` action attribute.

## Technical Details

- Pure HTML5 and CSS3 (no JavaScript frameworks)
- Responsive design (1024px, 768px, 480px breakpoints)
- Mobile hamburger menu included
- Font Awesome 6.5 icons
- CSS custom properties for easy theming
- Reduced motion media query for accessibility

## License

Free for personal and commercial use. Attribution appreciated but not required.

---

Design by [ZADIE](https://zadie.com)
