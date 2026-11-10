# Bloom & Vine Floral Studio Website Template

A romantic, garden-inspired website template designed for florists, floral designers, and flower shops. Features a warm, natural aesthetic with elegant typography and comprehensive service pages.

**Design by [ZADIE](https://zadie.com)**

## Features

- **4 Complete Pages**: Home, About, Services, Contact
- **Romantic Design**: Soft florals, natural colors, organic aesthetics
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Mobile Navigation**: Hamburger menu for tablets and phones
- **Service Showcase**: Complete pricing for arrangements, weddings, events, and subscriptions
- **Custom Forms**: Order forms, wedding consultation, and contact forms
- **FAQ Section**: Pre-written answers to common customer questions
- **Pure HTML/CSS**: No frameworks or dependencies required
- **Google Fonts**: Elegant Playfair Display + clean Jost typography
- **SEO Friendly**: Semantic HTML and meta descriptions included

## Quick Start

1. **Download** the template files
2. **Extract** to your desired location
3. **Open** `index.html` in your web browser to preview
4. **Customize** the content to match your business
5. **Upload** to your web hosting service

That's it! No build process or installation required.

## Customization Guide

### Updating Business Information

#### 1. Business Name & Logo
The logo appears in the header on all pages:
```html
<a href="index.html" class="logo">
  <span class="logo-icon">🌸</span>
  <span>Bloom & Vine</span> <!-- Change this -->
</a>
```

Replace "Bloom & Vine" with your business name. You can also replace the 🌸 emoji with your own logo image.

#### 2. Contact Information
Update contact details in the footer (appears on all pages):
```html
<div class="footer-section">
  <h4>Contact</h4>
  <ul class="footer-links">
    <li>123 Garden Lane</li>           <!-- Your address -->
    <li>Portland, OR 97201</li>         <!-- Your city/zip -->
    <li>(503) 555-VINE</li>             <!-- Your phone -->
    <li>hello@bloomandvine.com</li>     <!-- Your email -->
  </ul>
</div>
```

Also update these in:
- `contact.html` - Contact information cards
- All footers across pages

#### 3. Business Hours
Update hours in the footer:
```html
<p><strong>Hours:</strong><br>
Monday - Friday: 9:00 AM - 6:00 PM<br>  <!-- Update these -->
Saturday: 9:00 AM - 4:00 PM<br>
Sunday: Closed</p>
```

### Changing Colors

All colors are defined as CSS variables in `styles.css`. Update the `:root` section:

```css
:root {
  --primary: #166534;        /* Garden green - main brand color */
  --primary-dark: #14532D;   /* Forest - darker shade */
  --secondary: #FBCFE8;      /* Blush pink - soft accent */
  --accent: #FB923C;         /* Sunset coral - call-to-action color */
  /* ... etc */
}
```

Change these hex codes to match your brand colors. The entire site will update automatically.

### Updating Typography

The template uses Google Fonts. To change fonts:

1. Visit [Google Fonts](https://fonts.google.com)
2. Select your desired fonts
3. Update the `<link>` tag in the `<head>` of each page
4. Update the CSS variables in `styles.css`:

```css
:root {
  --font-heading: 'Playfair Display', serif;  /* Change to your heading font */
  --font-body: 'Jost', sans-serif;            /* Change to your body font */
}
```

### Customizing Content

#### Home Page (`index.html`)
- **Hero section**: Update headline, subtitle, and CTA buttons
- **Occasions**: Customize the 8 occasion cards
- **Featured arrangements**: Add your signature designs with pricing
- **Why Choose Us**: Update the 6 feature boxes
- **Wedding preview**: Showcase your wedding services
- **Subscriptions**: Adjust subscription plans and pricing
- **Testimonials**: Replace with real customer reviews

#### About Page (`about.html`)
- **Our Story**: Write your florist's origin story
- **Team members**: Add photos and bios of your designers (3 team members shown)
- **Our Approach**: Update the 6 philosophy points
- **Studio space**: Describe your physical location
- **Community involvement**: Share your local partnerships

#### Services Page (`services.html`)
- **Everyday arrangements**: Update sizes and prices (4 tiers)
- **Occasions**: Customize the 6 occasion types
- **Weddings**: Adjust wedding package pricing
- **Events**: Update corporate and event offerings
- **Plants**: Change plant selection and prices
- **Subscriptions**: Modify subscription tiers and pricing
- **Workshops**: Update class offerings and prices

#### Contact Page (`contact.html`)
- **Contact cards**: Update location, phone, email, delivery areas
- **Order form**: Customize occasion options and size/price tiers
- **Wedding form**: Adjust wedding inquiry fields
- **Delivery info**: Update your delivery zones and fees
- **FAQ**: Rewrite questions and answers for your business

### Adding Your Photos

Replace the placeholder gradient backgrounds with real photos:

1. Find elements with class `.card-image`, `.hero-image`, `.team-photo`, etc.
2. Add a background image:

```css
.card-image {
  background: url('images/your-photo.jpg') center/cover;
}
```

Or update inline in the HTML:
```html
<div class="card-image" style="background: url('images/bouquet.jpg') center/cover;"></div>
```

We recommend:
- **Hero images**: 1200x800px or larger
- **Team photos**: 600x600px (square)
- **Card images**: 800x600px (4:3 ratio)
- **File format**: JPG for photos, PNG for graphics with transparency

### Setting Up Forms

The contact forms are HTML-only. To make them functional:

**Option 1: Formspree (Easiest)**
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. Update the `<form>` tag:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Your Own Backend**
If you have a server, connect forms to your own backend script for processing.

**Option 3: Email Service**
Use services like EmailJS, Basin, or Web3Forms to route form submissions to your email.

### Removing Analytics & Preview Banner

Before going live, you may want to remove the ZADIE analytics and preview banner:

1. **Remove Analytics** (if using your own):
   - Delete everything between `<!-- ZADIE-ANALYTICS-START -->` and `<!-- ZADIE-ANALYTICS-END -->`
   - Add your own analytics code (Google Analytics, Plausible, etc.)

2. **Remove Preview Banner**:
   - Delete everything between `<!-- ZADIE-PREVIEW-BANNER-START -->` and `<!-- ZADIE-PREVIEW-BANNER-END -->`

### SEO Optimization

Each page has meta tags in the `<head>`:

```html
<title>Your Page Title - Your Business Name</title>
<meta name="description" content="A compelling description of this page">
```

Update these for better search engine visibility:
- Keep titles under 60 characters
- Keep descriptions between 150-160 characters
- Include relevant keywords naturally
- Make each page's title and description unique

## File Structure

```
florist/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services & pricing page
├── contact.html        # Contact & order page
├── styles.css          # All styles and design system
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This template is **free to use** for personal and commercial projects.

**Requirements:**
- Keep the "Design by ZADIE" link in the footer
- Do not resell or redistribute this template as your own

**You are free to:**
- Use for client projects
- Modify and customize
- Use for commercial florist businesses

## Credits

- **Design & Development**: [ZADIE](https://zadie.com)
- **Fonts**: [Google Fonts](https://fonts.google.com) (Playfair Display, Jost)
- **Icons**: Emoji (built into all browsers)

## Support

For questions about customization or issues with the template:
- Visit [zadie.com](https://zadie.com)
- Check out more free templates at [zadie.com/templates](https://zadie.com/templates)

## More Templates

Looking for templates for other businesses? Check out our collection:
- Coffee Shop
- Plumbing
- Auto Detailing
- Dance Academy
- Yoga Studio
- Bakery
- Landscaping
- Photography
- Dental Clinic
- Hair Salon
- And many more!

Visit [zadie.com/templates](https://zadie.com/templates) to browse all free templates.

---

Made with care by [ZADIE](https://zadie.com) 🌸
