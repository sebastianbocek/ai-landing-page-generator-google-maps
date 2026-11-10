# Wagging Tails Pet Lodge — Free Website Template

A clean, warm, and professional 4-page website template for pet boarding and kennel businesses. Built with pure HTML and CSS — no frameworks, no dependencies.

**License:** Free for personal and commercial use. Attribution appreciated but not required.

---

## Quick Start

1. Download and unzip the template folder.
2. Open `index.html` in your browser to preview.
3. Edit the HTML files directly — no build step needed.
4. Replace placeholder content with your business details (see Customization Guide below).
5. Upload the folder to your web host as-is.

---

## Pages

| File | Page | Content |
|---|---|---|
| `index.html` | Home | Hero, services overview, stats, facility highlights, testimonials, trust signals, CTA |
| `about.html` | About | Owner story, team bios, facility photos, philosophy, safety protocols, vet partnership |
| `services.html` | Services | Dog boarding suite tiers, cat boarding, daycare, grooming menu, training packages, holiday pricing |
| `contact.html` | Contact | Reservation form, tour request form, hours, location, FAQ (7 questions) |
| `styles.css` | Stylesheet | All styles, CSS variables, responsive breakpoints |

---

## Customization Guide

### 1. Business Details (find and replace across all files)

| Placeholder | Replace with |
|---|---|
| `Wagging Tails Pet Lodge` | Your business name |
| `(615) 555-0147` | Your phone number |
| `stay@waggingtailslodge.com` | Your email address |
| `Nashville, TN` | Your city and state |
| `Sarah Callahan` | Owner's name |
| `Marcus Webb` | Lead caretaker name |
| `Dani Ortega` | Groomer name |
| `Nashville Animal Care Clinic` | Your emergency vet partner |

### 2. Color Variables

All colors are defined as CSS custom properties in `styles.css` under `:root`. Change them once and they update everywhere.

```css
:root {
  --primary: #F97316;        /* Main orange — buttons, links, accents */
  --primary-dark: #EA580C;   /* Darker orange — hover states */
  --primary-light: #FDBA74;  /* Light orange — badges, tags */
  --secondary: #2D6A4F;      /* Forest teal — secondary buttons, checks */
  --secondary-dark: #1B4332; /* Dark teal — hover states */
  --secondary-light: #52B788;/* Light teal — safety checkmarks */
  --accent: #FCD34D;         /* Yellow — star ratings, highlights */
  --bg-cream: #FEF9F0;       /* Main page background */
  --bg-dark: #1A3C2A;        /* Dark sections and footer */
}
```

### 3. Fonts

This template uses Google Fonts loaded via `@import` in `styles.css`:

- **Boogaloo** — Headings (`--font-heading`)
- **Nunito** — Body text (`--font-body`)

To change fonts, update the `@import` URL at the top of `styles.css` and the two font variables in `:root`.

### 4. Pricing

All pricing is in plain text. Search for dollar amounts in `services.html`:

- Dog Boarding Standard: `$45`
- Dog Boarding Deluxe: `$65`
- Dog Boarding Luxury: `$85`
- Cat Boarding: `$35`
- Doggy Daycare: `$28/day`, `$120/week`
- Grooming: varies by service (see add-ons list)
- Training packages: `$150`, `$280`, `$75`

### 5. Photo Placeholders

Every image area in the template uses a CSS gradient as a placeholder. Replace these with real photos by swapping the `background` property in `styles.css` or by adding an `<img>` tag inside the container element.

**Finding photo placeholders in CSS:**
- `.hero-image-main` — Hero section main image
- `.about-hero-image` — About page hero
- `.team-photo-1`, `.team-photo-2`, `.team-photo-3` — Team headshots
- `.facility-photo-1` through `.facility-photo-6` — Facility gallery
- `.feature-image-orange`, `.feature-image-green`, `.feature-image-yellow` — Feature cards on home page
- `.author-avatar-1`, `.author-avatar-2`, `.author-avatar-3` — Testimonial avatars

**Example — replacing a team photo with a real image:**
```html
<!-- Before -->
<div class="team-photo team-photo-1"></div>

<!-- After -->
<img src="images/sarah-callahan.jpg" alt="Sarah Callahan, Owner" class="team-photo">
```

### 6. Staff Bios

All staff information is in `about.html`. The three team cards are in the section with the `team-grid` class. Update names, roles, and bio text directly in the HTML.

### 7. FAQ

The FAQ is on `contact.html` using native HTML `<details>` and `<summary>` elements — no JavaScript required. Add, remove, or edit questions directly in the `.faq-list` section.

### 8. Forms

The reservation and tour request forms use `action="#"` by default. To make them functional, point the `action` attribute at:
- A form service like Formspree, Netlify Forms, or EmailJS
- Your own backend endpoint
- A mailto link (`action="mailto:you@youremail.com"`)

---

## Technical Notes

- Pure HTML5 and CSS3. No JavaScript frameworks.
- Mobile-first responsive design with breakpoints at 768px and 1024px.
- Mobile navigation uses a hamburger toggle with a small inline script on each page.
- CSS custom properties (variables) for all colors, spacing, and typography.
- Google Fonts loaded via `@import` — requires an internet connection to display correctly.
- No cookies, no tracking (the analytics code is removed when you download the clean version).

---

Built by [ZADIE](https://zadie.com)
