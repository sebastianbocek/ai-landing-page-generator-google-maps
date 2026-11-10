# Sentinel Security Systems — Free Website Template

A professional 4-page website template for security systems and alarm companies. Dark, authoritative design built with pure HTML and CSS — no frameworks, no dependencies.

**License:** Free for personal and commercial use. Attribution appreciated but not required.

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview
3. Edit the HTML files directly with your business information
4. Replace placeholder content (see Customization Guide below)
5. Upload all files to your web host

No build process required. The template is ready to deploy as-is.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — Hero, services overview, trust signals, stats, testimonials, CTA |
| `about.html` | About — Company story, team profiles, monitoring center, service area, credentials |
| `services.html` | Services — Detailed service breakdowns, pricing packages, monitoring plans |
| `contact.html` | Contact — Assessment request form, general inquiry, emergency line, FAQ |
| `styles.css` | All styles — CSS custom properties, responsive layout, component styles |

---

## Customization Guide

### Business Details to Find and Replace

Open each HTML file and replace the following:

| Placeholder | Replace With |
|-------------|-------------|
| `Sentinel Security Systems` | Your company name |
| `(602) 555-0161` | Your phone number |
| `protect@sentinelsecurity.com` | Your email address |
| `Phoenix, AZ` | Your city and state |
| `Phoenix metro area` | Your service region |
| `Marcus Webb` | Founder's name |
| `2007` | Your founding year |
| `4,200+` | Your client count stat |
| `ROC# 289-44-2187` | Your actual license number |
| `SS` (logo mark) | Your initials |

### Color Variables

Edit the `:root` block in `styles.css` to change the color scheme:

```css
:root {
  --primary: #0F172A;       /* Deep navy — main dark background */
  --primary-mid: #1E293B;   /* Mid dark — header, dark sections */
  --primary-light: #334155; /* Light dark — borders, subtle elements */
  --secondary: #3B82F6;     /* Electric blue — primary accent, CTAs */
  --secondary-dark: #2563EB;
  --secondary-light: #60A5FA;
  --accent: #94A3B8;        /* Silver — muted text on dark */
  --background: #F1F5F9;    /* Light gray — page background */
  --background-alt: #E2E8F0;
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line at the top of `styles.css` and the font variables:

```css
/* Current fonts */
--font-heading: 'Quantico', monospace;
--font-body: 'Source Sans 3', sans-serif;
```

Visit [fonts.google.com](https://fonts.google.com) to browse alternatives.

### Monitoring Pricing

Pricing is in `services.html`. Search for `$25`, `$35`, and `$45` to find monitoring plan prices. Installation pricing is in the service detail cards — search for `From $` to locate all price references.

### Service Area

The service area grid appears on both `about.html` and `contact.html`. Search for `class="area-item"` to find and edit the list of communities you serve.

### Team Profiles

Team member cards are in `about.html` under the "Our Team" section. Replace names, titles, bios, and certification badges. Photo placeholders use gradient backgrounds — replace the `style="background: ..."` attribute with an `<img>` tag pointing to actual photos.

### Stats

The stats bar on the home page (`index.html`) shows years in business, clients protected, response time, and monitoring uptime. Search for `stat-number` to locate these values.

### Logo

The template uses a text-based logo mark (`SS` initials in a blue square). Replace the `SS` text with your own initials, or swap the entire `.logo` block with an `<img>` tag pointing to your logo file.

### Google Analytics

The template includes ZADIE's analytics code between `<!-- ZADIE-ANALYTICS-START -->` and `<!-- ZADIE-ANALYTICS-END -->` markers. Replace the `G-DBX9DKSJPZ` tracking ID with your own, or remove the entire block if you're using a different analytics tool.

### Preview Banner

The preview banner is included for display on the ZADIE template preview site. When you download the template for your own use, remove the block between `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->` on each page.

---

## File Structure

```
security-company/
├── index.html
├── about.html
├── services.html
├── contact.html
├── styles.css
└── README.md
```

---

## Technical Notes

- Pure HTML5 and CSS3. No JavaScript frameworks.
- Google Fonts loaded via CSS `@import`
- Mobile-responsive with breakpoints at 768px and 1024px
- Mobile navigation toggle built in (hamburger menu)
- FAQ accordion on contact page uses vanilla JavaScript
- CSS Grid and Flexbox for all layouts
- CSS custom properties for easy theming
- No external dependencies beyond Google Fonts

---

Built by [ZADIE](https://zadie.com)
