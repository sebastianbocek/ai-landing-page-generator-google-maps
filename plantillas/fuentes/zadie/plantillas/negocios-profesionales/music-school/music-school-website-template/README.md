# Crescendo Music Academy - Website Template

A warm, expressive website template designed for music schools and academies. Built with pure HTML5 and CSS3.

## Quick Start

1. Download and unzip the template files
2. Open `index.html` in your browser to preview
3. Edit the HTML files to replace placeholder content with your own
4. Update `styles.css` to customize colors, fonts, and styling
5. Deploy to any static hosting provider

## Pages

- **index.html** - Home page with hero, features, services overview, testimonials, and CTA
- **about.html** - Company story, values, instructor profiles, and facility showcase
- **services.html** - Detailed programs, instrument listings, and monthly pricing
- **contact.html** - Enrollment form, contact info, map placeholder, and FAQ

## Customization

### Colors

Edit the CSS custom properties in `styles.css` under `:root`:

```css
--primary: #6B21A8;       /* Deep plum */
--secondary: #D97706;     /* Warm amber */
--cream: #FDF8EF;         /* Soft cream background */
--dark: #1C1017;          /* Dark sections */
```

### Fonts

The template uses Google Fonts (Syne + Outfit). To change fonts, update the `@import` URL at the top of `styles.css` and the `--font-heading` and `--font-body` variables.

### Images

Replace the gradient placeholder elements with your own images. Look for elements with classes like `hero-image-placeholder`, `story-image`, `team-photo`, `program-image`, and `facility-item`.

### Contact Form

The form currently submits to `#`. Connect it to your preferred form handler (Formspree, Netlify Forms, or your own backend).

## Technical Details

- Pure HTML5 and CSS3 (no JavaScript frameworks)
- CSS Custom Properties for easy theming
- CSS Grid and Flexbox layouts
- Responsive at 1024px, 768px, and 480px breakpoints
- Reduced motion media query for accessibility
- Font Awesome 6.5 icons
- Mobile hamburger menu with vanilla JavaScript

## License

Free for personal and commercial use. Attribution appreciated but not required.
