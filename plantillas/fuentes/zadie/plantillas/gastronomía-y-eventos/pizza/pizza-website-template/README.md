# Hearthstone Pizza — Free Website Template

A warm, rustic artisan pizzeria website template built with pure HTML and CSS. Designed for wood-fired pizza restaurants, Italian eateries, and family-owned neighborhood restaurants.

**Template by [ZADIE](https://zadie.com)**

---

## License

This template is free to use for personal and commercial projects. You may customize it freely for your business. You may not resell or redistribute this template as a standalone product.

Attribution to ZADIE in the footer is appreciated but not required after customization.

---

## What's Included

| File | Description |
|---|---|
| `index.html` | Homepage with hero, featured pizzas, hours, testimonials, and catering CTA |
| `about.html` | Founders story, the oven, ingredient sourcing, team, and timeline |
| `services.html` | Full menu page with all categories and catering packages |
| `contact.html` | Reservation form, catering inquiry, FAQ, hours, parking, and map placeholder |
| `styles.css` | Full stylesheet — colors, typography, layout, and responsive styles |
| `README.md` | This file |

---

## Quick Start

1. Download and unzip the template folder.
2. Open any `.html` file in a browser to preview locally.
3. Edit the HTML files with your business information.
4. Replace placeholder colors/gradients with real photos.
5. Upload all files to your web host.

No build tools required. No JavaScript frameworks. Just open and edit.

---

## Customization Guide

### Business Details

Search and replace these values across all HTML files:

| Placeholder | Replace With |
|---|---|
| `Hearthstone Pizza` | Your restaurant name |
| `Marco & Elena Vitale` | Your name(s) |
| `(555) 672-3841` | Your phone number |
| `hello@hearthstonepizza.com` | Your email address |
| `142 Church Street` | Your street address |
| `Burlington, VT 05401` | Your city, state, ZIP |

### Colors

All colors are defined as CSS variables at the top of `styles.css`. Change these to match your brand:

```css
:root {
  --brick-red: #A0210F;     /* Primary brand color */
  --gold: #D4AF37;          /* Accent / highlight color */
  --charcoal: #2C2C2C;      /* Dark text and backgrounds */
  --off-white: #FFF8F0;     /* Page background */
  --warm-surface: #FAF0E6;  /* Alternate section background */
}
```

### Fonts

Fonts are loaded from Google Fonts. To change them, update the `@import` line at the top of `styles.css` and change the `--font-heading` and `--font-body` variables.

### Photos

Photo placeholder areas use CSS gradients. To add real images, replace the gradient `div` elements with `img` tags, or add `background-image: url('your-photo.jpg')` to the placeholder `div` using inline styles or a custom CSS class.

Example — replacing a pizza card photo placeholder:
```html
<!-- Before: gradient placeholder -->
<div class="pizza-photo margherita"></div>

<!-- After: real photo -->
<div class="pizza-photo" style="background-image: url('images/margherita.jpg'); background-size: cover; background-position: center;"></div>
```

### Menu Prices

Menu prices are in `services.html`. Update each `.menu-item-price` span with your actual pricing. Menu items, descriptions, and categories can be freely added, removed, or reordered.

### Google Analytics

The template includes ZADIE's analytics tracking. Before launching your site, replace `G-DBX9DKSJPZ` with your own Google Analytics measurement ID, or remove the analytics block entirely. The analytics block is marked with comment markers:

```html
<!-- ZADIE-ANALYTICS-START -->
...
<!-- ZADIE-ANALYTICS-END -->
```

### Map

The contact page includes a map placeholder. Replace it with a Google Maps embed:

1. Go to [maps.google.com](https://maps.google.com)
2. Search for your address
3. Click Share > Embed a map
4. Copy the `<iframe>` code
5. Replace the map placeholder `<div>` in `contact.html` with the iframe

---

## Responsive Behavior

- Desktop: Full multi-column layouts
- Tablet (1024px): 2-column grids, stacked about page
- Mobile (768px): Single column, mobile hamburger menu
- Small mobile (480px): Stacked buttons, single-column strips

The mobile navigation hamburger menu works with no dependencies — pure vanilla JavaScript at the bottom of each page.

---

## Browser Support

Tested and working in:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari (iOS 16+)
- Chrome for Android

---

## Need a Custom Version?

ZADIE builds custom websites for local businesses. If you want a site built specifically for your restaurant — custom design, real photos, booking integrations, online ordering — visit [zadie.com](https://zadie.com) to start a conversation.
