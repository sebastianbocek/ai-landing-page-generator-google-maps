# Summit Flooring Co. Website Template

A premium website template for flooring installation businesses. Features a warm, editorial aesthetic built around the character of the business and its owner.

## License

Free for personal and commercial use. Attribution appreciated but not required.

Template design by [ZADIE](https://zadie.com).

## Included Files

```
flooring/
├── index.html        Home page
├── about.html        About / team / certifications / showroom
├── services.html     All 6 flooring services with detail
├── contact.html      Consultation form + FAQ
├── styles.css        All styles
└── README.md         This file
```

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Replace placeholder content with your business details
4. Deploy to any web host that serves static HTML files

No build tools, no dependencies, no JavaScript frameworks. It runs anywhere.

## Customization Guide

### Business Details

Search and replace the following across all HTML files:

| Placeholder | Replace With |
|---|---|
| Summit Flooring Co. | Your business name |
| Nate Callahan | Your name |
| (555) 214-8876 | Your phone number |
| hello@summitflooring.co | Your email address |
| Nashville, TN | Your city and state |
| 2840 Elm Hill Pike, Suite 12 | Your address |

### Colors

All colors are defined as CSS variables at the top of `styles.css`. Change them once and they update everywhere.

```css
:root {
  --walnut-dark: #2C1810;   /* Darkest brown, used for headings */
  --walnut: #4A2C1A;        /* Primary buttons and accents */
  --oak: #C4874A;           /* Highlights, labels, hover states */
  --oak-light: #DBA870;     /* Light version of oak for dark backgrounds */
  --sage: #6B7C5E;          /* Icon backgrounds and secondary accents */
  --bg: #FAFAF8;            /* Main page background */
  --bg-warm: #FFF8F0;       /* Warm off-white for alternating sections */
  --bg-surface: #FFFFFF;    /* Cards and form backgrounds */
}
```

### Fonts

This template uses [Gloock](https://fonts.google.com/specimen/Gloock) for headings and [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body text, loaded via Google Fonts. To change fonts, update the `@import` URL at the top of `styles.css` and the font variables:

```css
--font-heading: 'Gloock', Georgia, serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```

### Services

The services page (`services.html`) includes six service blocks. Each follows this pattern:

```html
<div class="service-block">
  <div class="container">
    <div class="service-block-grid">
      <!-- Content and photo columns -->
    </div>
  </div>
</div>
```

Add `.reverse` to the grid class to flip the content/photo column order on alternating rows.

### Photo Placeholders

All image areas use CSS gradient backgrounds. Replace them with real photos by swapping the `style="background: ..."` attribute with an `<img>` tag or a CSS `background-image: url(...)` value.

### Analytics

Google Analytics tracking is included on all pages. To use your own account:
1. Replace `G-DBX9DKSJPZ` with your Measurement ID across all four HTML files
2. Or remove the analytics block entirely if you don't need it

The analytics code is wrapped in comment markers that make it easy to find:

```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

### Preview Banner

The preview banner at the bottom of each page shows only when the page is viewed directly (not in an iframe). It is automatically hidden when you deploy to your own domain. The banner code is wrapped in:

```html
<!-- ZADIE-PREVIEW-BANNER-START -->
...
<!-- ZADIE-PREVIEW-BANNER-END -->
```

## Deployment

This template is static HTML. You can host it on:

- **Netlify**: Drag and drop the folder into the Netlify dashboard
- **Vercel**: Run `vercel` in the folder (static auto-detected)
- **GitHub Pages**: Push to a repo and enable Pages in Settings
- **Any web host**: Upload the files via FTP or file manager

No server-side processing required.

## Contact Form

The consultation form in `contact.html` is HTML only and does not submit by default. To make it functional, use one of these options:

- [Netlify Forms](https://docs.netlify.com/forms/setup/): Add `netlify` attribute to the `<form>` tag
- [Formspree](https://formspree.io): Set the form `action` to your Formspree endpoint
- [EmailJS](https://www.emailjs.com): Lightweight JS integration for direct email sending

## Browser Support

Chrome, Firefox, Safari, Edge (last 2 versions). No IE support.
