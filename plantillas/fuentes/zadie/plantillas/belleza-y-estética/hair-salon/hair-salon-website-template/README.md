# Website Template

A ready-to-use website template you can customize for your business.

## License

This template is free to use and modify for your business or client projects. You can't resell the template itself, but you can use it for as many projects as you like.

There's a small "Built by Zadie Studio" link in the footer. You can remove it if you want, but we'd appreciate it if you keep it.

## Quick Start

1. Open `index.html` in your browser to see the template
2. Edit the HTML files to add your content
3. Customize colors in `styles.css`
4. Upload to any web host

## Customization Guide

### Update Your Business Info

**Business Name & Tagline**

Search for the business name in all `.html` files and replace with yours. Update these spots in each file:
- Page titles (`<title>` tags)
- Logo in the header
- Footer text

**Contact Information**

In `contact.html`, update:
- Phone numbers
- Email addresses
- Physical address
- Business hours
- Form submission endpoint (the `action="#"` in the `<form>` tag)

### Customize Colors

Colors are defined at the top of `styles.css` as CSS variables. Change these values to match your brand:

```css
:root {
  --terracotta: #8B4513;     /* Primary brand color */
  --olive: #556B2F;          /* Secondary color */
  --cream: #F5F1E8;          /* Light background */
  --charcoal: #2C2416;       /* Dark text */
  /* ... more colors below */
}
```

Just swap the hex codes with your brand colors. The template will update everywhere automatically.

### Change Fonts

The template uses Google Fonts. To use different fonts:

1. Find the font link in the `<head>` section of each HTML file
2. Replace with your chosen Google Font URL
3. Update the font family variables in `styles.css`:

```css
--font-display: 'Your Display Font', serif;
--font-body: 'Your Body Font', sans-serif;
```

### Update Content

Edit the text directly in the HTML files. The structure is straightforward:
- `index.html` - Homepage
- `about.html` - About page
- `menu.html` or `services.html` - Your offerings
- `contact.html` - Contact form and info

### Icons & Emojis

The template uses emoji icons for simplicity. Replace them with:
- Different emojis
- Icon fonts like Font Awesome
- SVG icons

## Making It Live

### Option 1: Simple Hosting
Upload all files to services like:
- Netlify (drag and drop your folder)
- Vercel
- GitHub Pages
- Any traditional web host

### Option 2: Form Submissions
The contact form needs a backend to work. Easy options:
- [Formspree](https://formspree.io)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- Your own server-side script

Update the form's `action` attribute with your endpoint.

## Browser Support

Works in all modern browsers. Tested in Chrome, Firefox, Safari, and Edge.

## Need Help?

If you want help customizing this template for your business, check out our [Template Customization Service](https://zadie.com/templates/customize).

Built by [Zadie Studio](https://zadie.com)
