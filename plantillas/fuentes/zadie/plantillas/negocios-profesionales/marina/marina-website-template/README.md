# Harbor Point Marina — Website Template

A complete 4-page website template for a marina and boat service business. Built with pure HTML5 and CSS3, no JavaScript frameworks required.

## License

Free for personal and commercial use. You may use, modify, and deploy this template for any client or personal project without attribution (though we'd love a link back to [zadie.com](https://zadie.com)).

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview the template.
3. Edit the business name, phone number, email, and address throughout all four pages.
4. Replace photo placeholder `<div>` elements with real `<img>` tags pointing to your photos.
5. Update pricing tables and service descriptions to match your marina's actual offerings.
6. Upload all files to your web host. No build step required.

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage with hero, services overview, stats bar, testimonials, and CTA |
| `about.html` | Marina history, team profiles, facility overview, certifications, community |
| `services.html` | Detailed service sections with pricing: slips, dry storage, launch, repair, fuel, store |
| `contact.html` | Contact form, slip inquiry form, directions (by road and water), hours, FAQ |
| `styles.css` | All styles in one file with CSS custom properties |

## Customization Guide

### Business Details (Find and Replace)

Search across all four HTML files and replace these values:

| Placeholder | Replace with |
|---|---|
| `Harbor Point Marina` | Your marina name |
| `Charleston, SC` | Your city and state |
| `Est. 1962` | Your founding year |
| `(843) 555-0172` | Your phone number |
| `info@harborpointmarina.com` | Your email address |
| `Claire Hartley` | Owner / manager name |
| `Marcus Reyes` | Lead mechanic name |
| `Sandra Polk` | Dockmaster name |

### Color Variables

All colors are defined as CSS custom properties at the top of `styles.css`. Edit the `:root` block to change the palette:

```css
:root {
  --primary:        #1B4F72;  /* Ocean blue — headers, buttons, links */
  --primary-dark:   #0F2D42;  /* Deep navy — dark sections, header background */
  --primary-light:  #2E6FA3;  /* Light blue — hover states */
  --secondary:      #D4AC6E;  /* Sandy gold — accents, dividers, highlights */
  --accent:         #F5F0E8;  /* Sail white — text on dark backgrounds */
  --bg:             #F5F0E8;  /* Page background */
}
```

### Fonts

The template uses two Google Fonts loaded via a `<link>` tag in each HTML file's `<head>`:

- **Unna** — serif, used for all headings (`h1` through `h5`)
- **Fira Sans** — sans-serif, used for body text, navigation, labels, and buttons

To change fonts, update the Google Fonts URL in each HTML file's `<head>` and update these variables in `styles.css`:

```css
--font-heading: 'Unna', Georgia, serif;
--font-body:    'Fira Sans', system-ui, sans-serif;
```

### Photo Placeholders

Photo placeholder areas are `<div>` elements with inline background-color or gradient styles. Replace them with real images:

```html
<!-- Before (placeholder) -->
<div class="photo-placeholder" style="background: linear-gradient(135deg, #1B4F72, #0F2D42); width: 100%; height: 100%; min-height: 340px;"></div>

<!-- After (real photo) -->
<img src="images/dock-aerial.jpg" alt="Aerial view of Harbor Point Marina docks" style="width: 100%; height: 100%; object-fit: cover;">
```

Recommended photo sizes:
- Hero image: 900 x 675px minimum
- Team photos: 400 x 400px (displayed as circles)
- Content section images: 800 x 600px minimum
- Full-width strips: 1600 x 400px minimum

### Pricing

All pricing in `services.html` is in HTML tables. Update the figures directly in the markup. If you want to remove pricing entirely, delete the `<table>` elements and replace with a call-to-action to contact for rates.

### Removing the Preview Banner

The preview banner (ZADIE branding at the bottom of the page) is wrapped in comment markers on every page:

```html
<!-- ZADIE-PREVIEW-BANNER-START -->
...
<!-- ZADIE-PREVIEW-BANNER-END -->
```

Delete everything between and including those comment markers on all four pages to remove the banner.

### Removing Google Analytics

The analytics code is wrapped in comment markers on every page:

```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

Delete everything between and including those markers, or replace the tracking ID (`G-DBX9DKSJPZ`) with your own Google Analytics measurement ID.

## Technical Notes

- No JavaScript frameworks or build tools required
- All styles in a single `styles.css` file using CSS custom properties
- Responsive breakpoints at 1024px (tablet) and 768px (mobile)
- Mobile navigation toggle is pure vanilla JavaScript, embedded at the bottom of each page
- Google Fonts are loaded from CDN; for offline use, self-host the font files
- Forms are HTML only with no backend processing; connect to a form service (Formspree, Netlify Forms, etc.) by updating the `action` attribute on each `<form>` element
- All internal links use relative paths so the template works locally and on any web host

## Support

Template designed by [ZADIE](https://zadie.com). For questions about customization or to commission a custom build, visit [zadie.com](https://zadie.com).
