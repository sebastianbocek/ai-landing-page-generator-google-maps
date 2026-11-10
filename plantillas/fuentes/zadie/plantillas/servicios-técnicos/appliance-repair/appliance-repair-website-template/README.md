# AllFix Appliance Repair — Free Website Template

A clean, professional website template for appliance repair businesses. Built with pure HTML and CSS — no frameworks, no dependencies beyond Google Fonts and Font Awesome.

## License

Free to use for personal and commercial projects. Attribution appreciated but not required. Do not resell this template as a standalone product.

## What's Included

- `index.html` — Home page
- `about.html` — About page (story, team, service area)
- `services.html` — Services page with pricing
- `contact.html` — Contact page with form and FAQ
- `styles.css` — All styles

## Quick Start

1. Download and unzip the template
2. Open `index.html` in a browser to preview
3. Edit the HTML files with your business details
4. Upload to your web host

No build tools or npm required.

## Customization Guide

### Business Information

Find and replace across all HTML files:

| Placeholder | Replace with |
|-------------|-------------|
| `AllFix` | Your business name |
| `(555) 555-1234` | Your phone number |
| `service@allfixrepair.com` | Your email address |
| `Greater Metro Area` | Your service area |

### Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
  --primary:       #1E3A5F;   /* Deep navy — main brand color */
  --secondary:     #E07B39;   /* Orange — CTAs and urgency */
  --accent:        #38A169;   /* Green — trust signals */
}
```

### Fonts

The template uses Krona One (headings) and Nunito (body text) from Google Fonts. To change fonts, update the `@import` line at the top of `styles.css` and the `--font-heading` / `--font-body` variables.

### Services and Pricing

Update the service cards in `services.html`. Each service has:
- A colored image placeholder (`background: linear-gradient(...)`)
- A service name and starting price
- A description paragraph
- Feature tags

### Team Photos

The team photo placeholders on `about.html` use background gradients. Replace them with real photos by adding an `<img>` tag inside `.tech-photo` or setting `background-image: url('your-photo.jpg')` on the `.tech-photo` div.

### Google Analytics

Remove the `<!-- ZADIE-ANALYTICS-START -->` through `<!-- ZADIE-ANALYTICS-END -->` blocks and replace with your own tracking code, or remove entirely if not needed.

### Preview Banner

Remove the `<!-- ZADIE-PREVIEW-BANNER-START -->` through `<!-- ZADIE-PREVIEW-BANNER-END -->` blocks from all pages before publishing.

## Pages

### Home (`index.html`)
- Sticky header with prominent phone number
- Hero with trust badges and CTAs
- 6-card appliance type grid
- Why choose us (4 reasons)
- Stats bar (5,000+ repairs, 4.9 stars, 12 years, same-day)
- 3 customer testimonials
- Call-to-action banner

### About (`about.html`)
- Company founding story
- 6 certifications and credentials
- 3 technician profiles with photo placeholders
- Service area list with map placeholder
- 3 company values

### Services (`services.html`)
- 6 service types with descriptions, starting prices, and feature tags
- 3-step how-it-works process
- 12-brand grid
- 90-day warranty section

### Contact (`contact.html`)
- Prominent phone number with hours
- 9-field service request form (name, phone, email, appliance type, brand, issue, date, time, address)
- Service area map placeholder
- 8-item FAQ section

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No IE support.

## Template by ZADIE

Built by [ZADIE](https://zadie.com) — website templates and custom builds for local businesses.
