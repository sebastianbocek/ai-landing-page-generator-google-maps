# Tandem — responsive HTML email templates (5-pack)

> **Live preview, colour customiser and one-click ZIP:** https://zumatools.com/website-templates/email-templates/


Five production-style HTML emails for a SaaS product, plus a preview gallery (`index.html`).

| File | Use it for |
| --- | --- |
| `newsletter.html` | Monthly newsletter — hero image, two stories (side-by-side on desktop, stacked on mobile), tip box |
| `welcome.html` | Onboarding — numbered steps and a primary call to action |
| `receipt.html` | Payment receipt — metadata, line items, totals, invoice button |
| `password-reset.html` | Security email — reset button, expiry notice, plain-text fallback link |
| `event-invite.html` | Webinar / event invitation — details card, RSVP buttons, calendar links, agenda |

## How they're built (email-safe techniques)

- **Nested `<table role="presentation">` layout**, 600 px max width, fluid below that. An MSO conditional table keeps Outlook for Windows at 600 px.
- **Inline styles on every element**, plus a small `<style>` block for resets, the mobile media query (`max-width: 520px` stacks columns via `.stack`) and dark mode.
- **Bulletproof buttons**: a padded `<a>` inside a coloured table cell, with a VML `<v:roundrect>` fallback for Outlook.
- **Dark mode**: `color-scheme` meta tags, `@media (prefers-color-scheme: dark)` and `[data-ogsc]` overrides (Outlook.com) using the `.dm-*` classes. Gmail applies its own dark-mode inversion regardless.
- **Preheader text**: the hidden `<div>` right after `<body>` sets the inbox preview line. Edit it for every send.
- **System font stack**, no web fonts, no JavaScript, no background images required.

## Important: test before you send

Email clients differ a lot. **Always test with your own ESP** (Mailchimp, Postmark, SendGrid, Resend, Brevo, Customer.io, etc.) and send real tests to Gmail (web + app), Outlook (Windows, Mac, web), Apple Mail and iOS Mail. Tools like Litmus or Email on Acid help.

**Inline your CSS if needed.** Most layout styles are already inline. If your ESP doesn't inline the `<style>` block automatically and you change it, run the file through a CSS inliner (e.g. your ESP's built-in inliner or an open-source one such as Juice) before sending. Keep the media queries in `<style>` — they can't be inlined.

## Customising

1. **Brand colour** — search and replace `#4f46e5` (brand) and `#eef2ff` (soft tint). Accent is `#f59e0b`.
2. **Logo** — the header uses a text logo (a coloured cell with "T" + wordmark) so it shows even with images off. Swap in an `<img>` of your logo (PNG, ~2× size, with `width` set) if you prefer.
3. **Images** — upload `assets/img/*.jpg` to your ESP/CDN and replace the relative `src` values with **absolute URLs** (`https://…`). Relative paths only work in this preview.
4. **Merge tags** — `{{first_name}}`, `{{workspace_name}}`, `{{email}}` are placeholders. Change them to your ESP's syntax.
5. **Footer** — replace the postal address and the unsubscribe / preferences links (required by CAN-SPAM / GDPR for marketing mail).
6. **Copy** — all content is original sample copy for a fictional product called Tandem.

## Gallery page

`index.html` previews each email in an iframe with Desktop (600) / Mobile (360) and Light / Dark toggles. Its styles live in `assets/css/style.css`. It's not needed for sending — delete it if you only want the emails.

## Deploy the gallery (optional)

Netlify Drop (drag the folder onto https://app.netlify.com/drop), GitHub Pages, or any static host. No build step.

## Credits

Design, illustrations and code by ZumaTools (Novpix LLC). MIT License — see `LICENSE`. Tandem is a fictional brand.
