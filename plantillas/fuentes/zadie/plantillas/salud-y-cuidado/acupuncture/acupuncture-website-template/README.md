# Meridian Acupuncture & Wellness — Free Website Template

A complete, elegant website template for acupuncture clinics and holistic wellness practices. Built with pure HTML5 and CSS3, no frameworks required.

## License

This template is free to use for personal and commercial projects under the [MIT License](https://opensource.org/licenses/MIT). Attribution to ZADIE is appreciated but not required after download.

## What's Included

```
acupuncture/
├── index.html       Home page
├── about.html       About the practitioner
├── services.html    All services with detailed descriptions
├── contact.html     Appointment form, FAQ, hours, insurance
├── styles.css       Full stylesheet with CSS custom properties
└── README.md        This file
```

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview locally.
3. Replace all placeholder content with your practice's information (see Customization below).
4. Upload the folder to your web host.

No build tools, no dependencies, no configuration. It works as-is.

## Customization

### Business Information

Search and replace the following across all HTML files:

| Placeholder | Replace with |
|---|---|
| `Meridian Acupuncture & Wellness` | Your clinic name |
| `Dr. Lin Wei, DAOM, LAc` | Your name and credentials |
| `(555) 428-7193` | Your phone number |
| `wellness@meridianacupuncture.com` | Your email address |
| `1240 Pacific Avenue, Suite 3B` | Your street address |
| `San Francisco, CA 94109` | Your city, state, zip |
| `2008` | Your founding year |

### Colors

All colors are defined as CSS custom properties at the top of `styles.css`. Swap them to match your brand:

```css
:root {
  --teal-deep:  #1B4F4F;  /* Primary color */
  --gold:       #C9A84C;  /* Accent color */
  --rice-paper: #FAF8F3;  /* Background */
}
```

### Fonts

The template uses Cardo (headings) and Nunito Sans (body) from Google Fonts. To change fonts, update the `@import` line at the top of `styles.css` and the `--font-heading` and `--font-body` variables.

### Services

Edit `services.html` to add, remove, or update service descriptions. Each service uses a `.service-detail-card` block. The anchor IDs (e.g., `id="acupuncture"`) are used for navigation links — update those links in the nav and footer if you change them.

### Photo Placeholders

Image placeholder areas use CSS gradients. To add real photos:

1. Add your image file to the template folder.
2. Replace the gradient `div` with an `<img>` tag:

```html
<img src="your-photo.jpg" alt="Dr. Your Name" />
```

Apply `object-fit: cover` and the desired dimensions via CSS.

### Google Analytics

The template includes Google Analytics (GA4) tracking code. After downloading, replace `G-DBX9DKSJPZ` with your own Measurement ID, or remove the analytics block entirely if you don't use GA4.

The analytics code is marked with comment markers for easy identification:

```html
<!-- ZADIE-ANALYTICS-START -->
  ...
<!-- ZADIE-ANALYTICS-END -->
```

### Appointment Form

The contact form (`contact.html`) is pre-structured but does not submit anywhere out of the box. To make it functional, connect it to a form service such as:

- [Formspree](https://formspree.io) — free tier available
- [Netlify Forms](https://www.netlify.com/products/forms/) — if hosting on Netlify
- Your own backend endpoint

Add the service's `action` URL to the `<form>` tag and any required hidden fields per the service's documentation.

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No IE11 support.

## Credits

Designed by [ZADIE](https://zadie.com).
Icons by [Font Awesome](https://fontawesome.com) (free tier, 6.5.0).
Fonts by [Google Fonts](https://fonts.google.com): Cardo and Nunito Sans.
