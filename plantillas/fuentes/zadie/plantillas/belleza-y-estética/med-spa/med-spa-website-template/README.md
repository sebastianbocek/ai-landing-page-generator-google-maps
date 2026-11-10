# Radiance Medical Aesthetics Website Template

A luxurious, professional website template designed for medical spas, aesthetic clinics, and cosmetic treatment providers. Features a sophisticated clinical aesthetic with gold accents, comprehensive treatment pages, and elegant typography.

**Design by [ZADIE](https://zadie.com)**

## Features

- **4 Complete Pages**: Home, About, Treatments, Contact
- **Luxurious Design**: Soft gold accents, blush tones, clinical elegance
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Mobile Navigation**: Hamburger menu for tablets and phones
- **Treatment Showcase**: Complete pricing for injectables, skin treatments, body contouring, and wellness
- **Provider Profiles**: Showcase your medical team with credentials and specialties
- **Booking Forms**: Consultation requests, general inquiries, and treatment interest forms
- **Membership Tiers**: Display pricing for monthly membership programs
- **FAQ Section**: Pre-written answers to common aesthetic treatment questions
- **Pure HTML/CSS**: No frameworks or dependencies required
- **Google Fonts**: Refined Cinzel + professional Karla typography
- **SEO Friendly**: Semantic HTML and meta descriptions included

## Quick Start

1. **Download** the template files
2. **Extract** to your desired location
3. **Open** `index.html` in your web browser to preview
4. **Customize** the content to match your practice
5. **Upload** to your web hosting service

That's it! No build process or installation required.

## Customization Guide

### Updating Practice Information

#### 1. Practice Name & Logo
The logo appears in the header on all pages:
```html
<a href="index.html" class="logo">
  <span class="logo-icon">✨</span>
  <span>Radiance</span> <!-- Change this -->
</a>
```

Replace "Radiance" with your practice name. You can also replace the ✨ emoji with your own logo image.

#### 2. Contact Information
Update contact details in the footer (appears on all pages):
```html
<div class="footer-section">
  <h4>Contact</h4>
  <ul class="footer-links">
    <li>2850 Medical Plaza Drive</li>     <!-- Your address -->
    <li>Scottsdale, AZ 85251</li>         <!-- Your city/zip -->
    <li>(480) 555-GLOW</li>               <!-- Your phone -->
    <li>info@radiancemedaesthetics.com</li> <!-- Your email -->
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
Monday - Friday: 9:00 AM - 6:00 PM<br>  <!-- Update these -->
Saturday: 9:00 AM - 3:00 PM<br>
Sunday: Closed</p>
```

### Changing Colors

All colors are defined as CSS variables in `styles.css`. Update the `:root` section:

```css
:root {
  --primary: #D4AF37;        /* Soft gold - luxury accent */
  --primary-dark: #B8941F;   /* Darker gold */
  --secondary: #F5D0C5;      /* Blush - warm, welcoming */
  --accent: #0D9488;         /* Teal - clinical professionalism */
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
  --font-heading: 'Cinzel', serif;  /* Change to your heading font */
  --font-body: 'Karla', sans-serif; /* Change to your body font */
}
```

### Customizing Content

#### Home Page (`index.html`)
- **Hero section**: Update headline, subtitle, and CTA buttons
- **Treatment categories**: Customize the 4 service cards (Injectables, Skin, Body, Wellness)
- **Before/After gallery**: Replace gradient backgrounds with your actual before/after photos
- **Why choose us**: Update the 6 feature boxes with your practice's unique selling points
- **Team preview**: Add photos and bios of your medical providers (3 shown)
- **Special offer**: Update the new client discount or current promotion
- **Testimonials**: Replace with real patient reviews

#### About Page (`about.html`)
- **Our Story**: Write your practice's origin story and philosophy
- **Medical team**: Add photos and bios with credentials for your providers (4 shown: MD, NP, PA, RN)
- **Our Values**: Update the 6 value cards with your practice's core principles
- **Philosophy section**: Describe your approach to aesthetic medicine
- **Credentials**: Update certifications, board affiliations, and industry recognition

#### Treatments Page (`services.html`)
- **Injectables**: Update service names and prices (Botox, Dysport, fillers, Kybella, threads)
- **Skin Rejuvenation**: Adjust chemical peel, microneedling, and laser pricing
- **Body Contouring**: Customize CoolSculpting, RF, and cellulite treatment pricing
- **Wellness**: Update HydraFacial, IV therapy, and vitamin injection pricing
- **Membership tiers**: Adjust the 3 membership levels (Glow, Radiance, Elite) with your pricing and benefits
- **Treatment notes**: Update appointment policies and before/after care instructions

#### Contact Page (`contact.html`)
- **Info cards**: Update location, phone, email, hours
- **Consultation form**: Customize treatment options, provider names
- **General inquiry form**: Adjust subject categories
- **Policies**: Update practice policies for consultations, cancellations, payment, and safety
- **FAQ**: Rewrite questions and answers for your specific practice and treatments

### Adding Your Photos

Replace the placeholder gradient backgrounds with real photos:

1. Find elements with class `.hero-image`, `.team-photo`, `.gallery-item`, etc.
2. Add a background image in the HTML:

```html
<div class="hero-image" style="background: url('images/your-photo.jpg') center/cover;"></div>
```

Or add in the CSS:
```css
.gallery-item:nth-child(1) {
  background: url('images/before-after-1.jpg') center/cover;
}
```

We recommend:
- **Hero images**: 1200x800px or larger
- **Team photos**: 600x600px (square), professional headshots
- **Before/After gallery**: 600x600px (square), side-by-side comparison photos
- **Treatment photos**: 800x600px (4:3 ratio)
- **File format**: JPG for photos, PNG for graphics with transparency
- **Optimization**: Compress images to keep file sizes under 200KB for fast loading

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
<title>Your Page Title - Your Practice Name</title>
<meta name="description" content="A compelling description of this page">
```

Update these for better search engine visibility:
- Keep titles under 60 characters
- Keep descriptions between 150-160 characters
- Include relevant keywords naturally (e.g., "Botox Scottsdale", "dermal fillers", "medical spa")
- Make each page's title and description unique
- Include your location for local SEO

## File Structure

```
med-spa/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Treatments & pricing page
├── contact.html        # Contact & booking page
├── styles.css          # All styles and design system
└── README.md           # This file
```

## Treatment Pricing Guide

The template includes standard pricing structure for common aesthetic treatments. Customize these in `services.html`:

**Injectables**: $12/unit Botox, $650-900 fillers
**Skin Rejuvenation**: $150-650 peels, $350-550 microneedling, $450-2500 lasers
**Body Contouring**: $750-1500 CoolSculpting, $400-1000 other body treatments
**Wellness**: $125-299 facials, $150-225 IV therapy
**Memberships**: $99-399/month

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Medical Disclaimer

This template is designed for informational and marketing purposes. It does not constitute medical advice, diagnosis, or treatment recommendations. All medical claims, treatment descriptions, and safety information should be reviewed by a qualified healthcare provider before publication. Ensure your website content complies with:

- HIPAA privacy regulations
- State medical board advertising guidelines
- FDA regulations for medical device and treatment claims
- Local truth-in-advertising laws

Always include appropriate medical disclaimers and consult with healthcare legal counsel.

## License

This template is **free to use** for personal and commercial projects.

**Requirements:**
- Keep the "Design by ZADIE" link in the footer
- Do not resell or redistribute this template as your own

**You are free to:**
- Use for client projects
- Modify and customize
- Use for commercial medical spas and aesthetic practices

## Credits

- **Design & Development**: [ZADIE](https://zadie.com)
- **Fonts**: [Google Fonts](https://fonts.google.com) (Cinzel, Karla)
- **Icons**: Emoji (built into all browsers)

## Support

For questions about customization or issues with the template:
- Visit [zadie.com](https://zadie.com)
- Check out more free templates at [zadie.com/templates](https://zadie.com/templates)

## More Templates

Looking for templates for other businesses? Check out our collection:
- Nail Salon
- Hair Salon
- Massage Spa
- Dental Clinic
- Chiropractor
- Pet Grooming
- Florist
- Bakery
- Coffee Shop
- And many more!

Visit [zadie.com/templates](https://zadie.com/templates) to browse all free templates.

---

Made with care by [ZADIE](https://zadie.com) ✨
