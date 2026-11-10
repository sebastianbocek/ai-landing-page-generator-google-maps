# Apex Combat Academy - MMA Studio Website Template

A raw, powerful website template for MMA gyms, martial arts academies, and combat sports facilities. Black and gold aesthetic with red accents.

## Quick Start

1. Download and unzip the template
2. Open `index.html` in your browser to preview
3. Edit the HTML files to customize content
4. Update colors in `styles.css` CSS variables
5. Upload to your web hosting

## Files Included

- `index.html` - Home page with hero, programs, coaches, testimonials
- `about.html` - Story, values, coach profiles, facility details
- `services.html` - Programs, class schedule, membership pricing
- `contact.html` - Contact form, location, FAQ
- `styles.css` - All styles with CSS custom properties
- `README.md` - This file

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --primary: #D4AF37;        /* Championship gold */
  --secondary: #DC2626;      /* Fight red */
  --black: #0A0A0A;          /* Main background */
  --carbon: #171717;         /* Section backgrounds */
}
```

### Fonts

The template uses Google Fonts (Teko + Barlow). To change fonts:

1. Visit [Google Fonts](https://fonts.google.com)
2. Select your fonts and copy the `@import` URL
3. Replace the `@import` line in `styles.css`
4. Update `--font-heading` and `--font-body` variables

### Content

- Replace placeholder text with your gym's information
- Update contact details, location, and hours
- Add your coach bios and credentials
- Customize class schedule and pricing

### Images

Image placeholders use CSS gradients. To add real images:

```css
.hero {
  background-image: url('your-image.jpg');
  background-size: cover;
  background-position: center;
}
```

## Features

- Fully responsive (mobile, tablet, desktop)
- Mobile navigation menu
- CSS-only (no JavaScript frameworks)
- Clean, semantic HTML5
- Accessible markup
- Fast loading

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

Free for personal and commercial use. Attribution appreciated but not required.

## Credits

Design by [ZADIE](https://zadie.com)
