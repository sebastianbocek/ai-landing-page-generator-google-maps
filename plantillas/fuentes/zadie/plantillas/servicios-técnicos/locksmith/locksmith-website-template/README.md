# KeyMaster Locksmith Services — Website Template

A clean, professional website template for a 24/7 locksmith business. Dark steel and gold key aesthetic designed to work at 2am on a phone screen as well as on a desktop.

## Template Details

- **Business type:** Locksmith (24/7 emergency + residential/commercial)
- **Pages:** 4 (Home, About, Services, Contact)
- **Tech stack:** Pure HTML5 and CSS3, no JavaScript frameworks
- **Fonts:** Aldrich (headings), Source Sans 3 (body) via Google Fonts
- **Icons:** Font Awesome 6.5.0

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage with hero, services overview, response guarantee, trust signals, testimonials |
| `about.html` | Company story, owner profile, team, values, service area |
| `services.html` | Full service catalog with pricing by category |
| `contact.html` | Emergency phone bar, service request form, hours, FAQ |
| `styles.css` | All styles |

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files with your business information
4. Update colors in `styles.css` under `:root { }` if desired
5. Host on any static web server or platform (Netlify, Vercel, GitHub Pages, etc.)

## Customization Guide

### Business Information

Search and replace these placeholders across all HTML files:

| Placeholder | Replace with |
|-------------|-------------|
| `KeyMaster` | Your business name |
| `KeyMaster Locksmith Services` | Your full business name |
| `(555) KEY-MASTER` | Your phone number |
| `5555395627` | Your phone number (digits only, for `href="tel:"`) |
| `info@keymasterlocksmith.com` | Your email address |
| `2009` | Your founding year |
| `Marcus Webb` | Owner name |
| `metro area` | Your service area |

### Colors

All colors are defined as CSS variables at the top of `styles.css`:

```css
:root {
  --primary:       #1C2833;  /* Dark steel — main dark color */
  --primary-dark:  #0E1820;  /* Deepest dark — header/footer */
  --primary-light: #2E4057;  /* Lighter steel — accents */
  --secondary:     #D4AC0D;  /* Key gold — highlights, icons */
  --accent:        #E74C3C;  /* Emergency red — phone CTAs */
  --bg:            #F4F6F8;  /* Light page background */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line at the top of `styles.css` and the `--font-heading` and `--font-body` variables.

### Analytics

Remove the `<!-- ZADIE-ANALYTICS-START -->` to `<!-- ZADIE-ANALYTICS-END -->` blocks from all pages and replace with your own analytics code.

### Preview Banner

Remove the `<!-- ZADIE-PREVIEW-BANNER-START -->` to `<!-- ZADIE-PREVIEW-BANNER-END -->` blocks from all pages.

## License

Free to use for personal and commercial projects. Attribution appreciated but not required.

Template by [ZADIE](https://zadie.com).
