# Crystal View Window Cleaning — Free Website Template

A clean, professional website template for window cleaning businesses. Built with pure HTML5 and CSS3.

## License

This template is free to use for personal and commercial projects. Attribution to [ZADIE](https://zadie.com) is appreciated but not required once downloaded. You may modify, customize, and deploy this template freely.

You may not resell or redistribute this template as a standalone product.

## What's Included

- `index.html` — Home page with hero, services grid, before/after section, testimonials, and CTA
- `about.html` — Owner story, pure water system explainer, certifications, service area
- `services.html` — Detailed write-up of all 8 services with pricing notes and what's included
- `contact.html` — Booking form, business hours, FAQ section
- `styles.css` — Full stylesheet with CSS variables, responsive layout, and component styles
- `README.md` — This file

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in a browser to preview
3. Replace all placeholder content with your business information
4. Upload all files to your web host

No build tools, no dependencies, no frameworks. Open the files and edit.

## Customization Guide

### Business Information

Search and replace the following across all HTML files:

| Placeholder | Replace With |
|---|---|
| `Crystal View Window Cleaning` | Your business name |
| `Mike Sato` | Your name |
| `(555) 583-2947` | Your phone number |
| `mike@crystalviewclean.com` | Your email address |
| `Seattle, WA` | Your city and state |
| `Greater Seattle` | Your service area |

### Colors

All colors are defined as CSS variables in `styles.css` at the top of the file:

```css
:root {
  --primary: #2563EB;        /* Sky blue — main brand color */
  --primary-light: #3B82F6;  /* Lighter blue */
  --primary-pale: #EFF6FF;   /* Very light blue for backgrounds */
  --accent: #F59E0B;         /* Sunshine yellow for highlights */
}
```

Change `--primary` to your brand color and the entire site updates.

### Fonts

Fonts are loaded from Google Fonts in `styles.css`. To change:

1. Choose fonts at [fonts.google.com](https://fonts.google.com)
2. Replace the `@import` line at the top of `styles.css`
3. Update `--font-heading` and `--font-body` variables

### Services

Edit the service cards in `index.html` and the detailed sections in `services.html`. Font Awesome 6.5.0 icons are used throughout. Browse available icons at [fontawesome.com/icons](https://fontawesome.com/icons).

### Removing the Preview Banner and Analytics

The preview banner and Google Analytics code are wrapped in comment markers for easy removal:

- Remove everything between `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->`
- Remove everything between `<!-- ZADIE-ANALYTICS-START -->` and `<!-- ZADIE-ANALYTICS-END -->`

Or add your own analytics tag in place of the ZADIE one.

## Hosting

This is a static HTML site. It works on any web host:

- **Netlify**: Drag the folder into [app.netlify.com](https://app.netlify.com). Free tier works fine.
- **Vercel**: Connect your GitHub repo or drag and drop.
- **Traditional hosting**: Upload via FTP to your host's public_html folder.
- **GitHub Pages**: Push to a repo and enable Pages in Settings.

## Support

This template was built by [ZADIE](https://zadie.com). For custom website work, reach out at zadie.com.
