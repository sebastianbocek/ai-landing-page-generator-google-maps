# Polished Nail Studio Website Template

A chic, glamorous website template designed for nail salons and nail artists. Features a sophisticated aesthetic with rose gold accents, comprehensive service pages, and elegant typography.

**Design by [ZADIE](https://zadie.com)**

## Features

- **4 Complete Pages**: Home, About, Services, Contact
- **Chic Design**: Rose gold accents, soft mauve tones, luxurious aesthetic
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Mobile Navigation**: Hamburger menu for tablets and phones
- **Service Showcase**: Complete pricing for manicures, pedicures, enhancements, and nail art
- **Booking Forms**: Appointment booking, group inquiries, and contact forms
- **FAQ Section**: Pre-written answers to common nail salon questions
- **Pure HTML/CSS**: No frameworks or dependencies required
- **Google Fonts**: Elegant Cormorant Garamond + clean Nunito Sans typography
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
  <span class="logo-icon">💅</span>
  <span>Polished</span> <!-- Change this -->
</a>
```

Replace "Polished" with your salon name. You can also replace the 💅 emoji with your own logo image.

#### 2. Contact Information
Update contact details in the footer (appears on all pages):
```html
<div class="footer-section">
  <h4>Contact</h4>
  <ul class="footer-links">
    <li>456 Style Avenue</li>              <!-- Your address -->
    <li>Portland, OR 97204</li>             <!-- Your city/zip -->
    <li>(503) 555-NAIL</li>                 <!-- Your phone -->
    <li>hello@polishednailstudio.com</li>   <!-- Your email -->
  </ul>
</div>
```

Also update these in:
- `contact.html` - Info cards and contact forms
- All footers across pages

#### 3. Business Hours
Update hours in the footer:
```html
<p><strong>Hours:</strong><br>
Monday - Saturday: 9:00 AM - 7:00 PM<br>  <!-- Update these -->
Sunday: 10:00 AM - 6:00 PM</p>
```

### Changing Colors

All colors are defined as CSS variables in `styles.css`. Update the `:root` section:

```css
:root {
  --primary: #C4B5B0;        /* Soft mauve - main brand color */
  --primary-dark: #A89892;   /* Darker mauve */
  --secondary: #E8C4C4;      /* Rose gold - elegant accent */
  --accent: #722F37;         /* Deep burgundy - call-to-action */
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
  --font-heading: 'Cormorant Garamond', serif;  /* Change to your heading font */
  --font-body: 'Nunito Sans', sans-serif;       /* Change to your body font */
}
```

### Customizing Content

#### Home Page (`index.html`)
- **Hero section**: Update headline, subtitle, and CTA buttons
- **Services overview**: Customize the 4 service categories
- **Nail art gallery**: Replace gradient backgrounds with your nail art photos
- **Why choose us**: Update the 6 feature boxes with your salon's unique selling points
- **Team preview**: Add photos and bios of your nail technicians
- **Special offer**: Update the first-visit discount or current promotion
- **Testimonials**: Replace with real customer reviews

#### About Page (`about.html`)
- **Our Story**: Write your salon's origin story and philosophy
- **Team members**: Add photos and bios of your nail technicians (4 shown)
- **Sanitation standards**: Update your specific safety protocols and practices
- **Salon space**: Describe your physical location and atmosphere
- **Products & brands**: List the actual polish and product lines you carry
- **Nail health philosophy**: Share your approach to nail care

#### Services Page (`services.html`)
- **Manicures**: Update service names and prices (4 levels shown)
- **Pedicures**: Adjust pedicure offerings and pricing (4 levels shown)
- **Enhancements**: Customize acrylic, gel, and dip powder pricing
- **Nail art**: Update nail art pricing structure and specialty finishes
- **Packages**: Adjust combo deals and bridal party pricing
- **Add-ons**: Modify available service extras and their prices
- **Service notes**: Update appointment policies and timing

#### Contact Page (`contact.html`)
- **Info cards**: Update location, phone, email, hours
- **Booking form**: Customize service options, technician names, pricing
- **Group inquiry**: Adjust for your event capabilities
- **Salon policies**: Update cancellation, payment, and health policies
- **FAQ**: Rewrite questions and answers for your specific salon

### Adding Your Photos

Replace the placeholder gradient backgrounds with real photos:

1. Find elements with class `.card-image`, `.hero-image`, `.team-photo`, `.gallery-item`, etc.
2. Add a background image in the HTML:

```html
<div class="card-image" style="background: url('images/your-photo.jpg') center/cover;"></div>
```

Or add in the CSS:
```css
.gallery-item:nth-child(1) {
  background: url('images/nail-art-1.jpg') center/cover;
}
```

We recommend:
- **Hero images**: 1200x800px or larger
- **Team photos**: 600x600px (square)
- **Nail art gallery**: 600x600px (square)
- **Service photos**: 800x600px (4:3 ratio)
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
nail-salon/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services & pricing page
├── contact.html        # Contact & booking page
├── styles.css          # All styles and design system
└── README.md           # This file
```

## Service Pricing Guide

The template includes standard pricing structure. Customize these in `services.html`:

**Manicures**: $25-55
**Pedicures**: $40-75
**Enhancements**: $45-65
**Nail Art**: $5-15 per nail
**Packages**: $60-120

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
- Use for commercial nail salons

## Credits

- **Design & Development**: [ZADIE](https://zadie.com)
- **Fonts**: [Google Fonts](https://fonts.google.com) (Cormorant Garamond, Nunito Sans)
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
- Florist
- And many more!

Visit [zadie.com/templates](https://zadie.com/templates) to browse all free templates.

---

Made with care by [ZADIE](https://zadie.com) 💅
