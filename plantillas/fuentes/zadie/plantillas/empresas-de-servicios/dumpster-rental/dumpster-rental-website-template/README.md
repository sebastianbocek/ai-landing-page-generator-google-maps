# BinDrop Dumpster Rental — Free Website Template

A complete 4-page website template for a local dumpster rental company. Bold, direct, no-nonsense design built for utility businesses where customers need information fast and the ordering process should be frictionless.

---

## License

Free for personal and commercial use. You may use, modify, and deploy this template for any project without attribution (though it's always appreciated). You may not resell the template itself as a standalone product.

---

## Quick Start

1. Download and unzip the template folder
2. Open `index.html` in your browser to preview locally
3. Find and replace all placeholder business details (see Customization Guide below)
4. Update pricing, service area, and team information
5. Connect the contact form to a backend service (Formspree, Netlify Forms, etc.)
6. Deploy to any static hosting provider

No build tools, no npm, no dependencies. Pure HTML and CSS — just open and edit.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage with hero, size grid, how it works, acceptable items, service area, CTA |
| `about.html` | Company story, team profiles, fleet overview, differentiators, community section |
| `services.html` | Full size detail cards with dimensions/pricing, prohibited items, extra fees, permits, specialty services |
| `contact.html` | Quote request form, phone CTA, service area ZIP codes, FAQ accordion |
| `styles.css` | All styles — single file, fully commented, CSS custom properties for easy theming |

---

## Customization Guide

### Business Details

Find and replace these values across all HTML files:

| Placeholder | Replace With |
|-------------|--------------|
| `BinDrop Dumpster Rental` | Your business name |
| `BinDrop` | Your short brand name |
| `(773) 555-0149` | Your phone number |
| `drop@bindroprental.com` | Your email address |
| `Chicago, IL` | Your city and state |
| `7735550149` | Your phone (digits only, for `tel:` links) |

### Pricing

Prices appear in multiple places across `index.html`, `services.html`, and the footer. Search for these values and update:

- `$275` — 10-yard weekly rate
- `$325` — 15-yard weekly rate
- `$375` — 20-yard weekly rate
- `$450` — 30-yard weekly rate
- `$65 / ton` — overage weight fee
- `$15 / day` — extended rental daily rate

### Service Area

Update the ZIP code lists in `index.html` (service area section) and `contact.html` (sidebar). Replace with your actual coverage area.

### Team and Company Story

Edit the team cards in `about.html` to reflect your actual staff. Update the company story paragraphs with your real history and founding story.

### Color Variables

All colors are defined as CSS custom properties in `styles.css` under `:root`. Change these to retheme the entire site:

```css
:root {
  --primary:      #EAB308;  /* Construction yellow — main brand color */
  --primary-dark: #CA9A06;  /* Darker yellow for hover states */
  --primary-light:#FDE047;  /* Lighter yellow for accents */
  --accent:       #EA580C;  /* Safety orange — CTAs and alerts */
  --accent-dark:  #C2460A;  /* Darker orange for hover states */
  --secondary:    #1C1C1C;  /* Charcoal — dark sections and footer */
  --bg:           #F5F5F5;  /* Off-white — page background */
  --bg-alt:       #EBEBEB;  /* Slightly darker bg for alternating sections */
  --dark:         #1C1C1C;  /* Near-black for dark panels */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `<link>` tag in each HTML file's `<head>` and the CSS variables:

```css
:root {
  --font-heading: 'Rammetto One', cursive;
  --font-body:    'Nunito Sans', sans-serif;
}
```

### Contact Form

The quote form in `contact.html` currently posts to `#`. To make it functional, connect it to:

- [Formspree](https://formspree.io) — change `action="#"` to your Formspree endpoint
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — add `netlify` attribute to the `<form>` tag
- Your own backend — point `action` to your server endpoint

### Google Analytics

The template includes a placeholder Google Analytics tag (`G-DBX9DKSJPZ`). Replace this with your own GA4 Measurement ID on all four pages, or remove the analytics block if you don't need it. The block is marked with `ZADIE-ANALYTICS-START` and `ZADIE-ANALYTICS-END` comments for easy identification.

### Photo Placeholders

Photo placeholder areas use background colors and gradients. Replace them with real images by adding an `<img>` tag inside the placeholder div, or by setting `background-image: url('your-photo.jpg')` on the placeholder element.

---

## Template by ZADIE

Built by [ZADIE](https://zadie.com) — websites and apps for small businesses.
