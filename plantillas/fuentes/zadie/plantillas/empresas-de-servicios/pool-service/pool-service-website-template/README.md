# AquaClear Pool & Spa - Free Website Template

A clean, premium website template designed for pool service companies, spa maintenance businesses, and aquatic service providers.

## Quick Start

1. Download and extract the template files
2. Replace placeholder content with your business information
3. Add your own images to the `images/` folder
4. Upload to your web hosting provider

## Pages Included

- **Home** (`index.html`) - Hero section, services overview, testimonials, and call-to-action
- **About** (`about.html`) - Company story, core values, team members, and stats
- **Services** (`services.html`) - Detailed service descriptions, additional services, and process steps
- **Contact** (`contact.html`) - Contact form with service selector, business info sidebar, and FAQ

## Customization

### Colors
Edit the CSS custom properties in `styles.css` under the `:root` selector:

```css
:root {
  --primary: #0891B2;      /* Main brand color (cyan) */
  --secondary: #059669;    /* Secondary color (emerald) */
  --accent: #F0FDFA;       /* Light background tint */
}
```

### Fonts
The template uses Google Fonts. To change fonts, update the `@import` URL at the top of `styles.css` and the `--font-heading` / `--font-body` variables.

- **Headings**: Josefin Sans
- **Body**: Nunito Sans

### Images
Replace the gradient placeholder areas with your own images. Look for elements with classes like `.hero-image-main`, `.story-image`, `.team-photo`, and `.service-detail-image`.

### Contact Form
The form does not include backend processing. Connect it to your preferred form handler (Formspree, Netlify Forms, or your own server-side script).

## Technical Details

- Pure HTML5 and CSS3 (no JavaScript frameworks)
- Responsive design with breakpoints at 1024px, 768px, and 480px
- Mobile hamburger menu included
- Font Awesome 6.5 icons via CDN
- Google Fonts loaded via CSS import
- CSS Grid and Flexbox layouts
- Reduced motion media query included for accessibility

## License

Free for personal and commercial use. Attribution link ("Design by ZADIE") appreciated but not required.

## Credits

- Design by [ZADIE](https://zadie.com)
- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)
