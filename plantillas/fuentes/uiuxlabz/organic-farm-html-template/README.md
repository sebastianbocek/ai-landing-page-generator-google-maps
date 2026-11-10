# 🌿 FarmFresh — Organic Farm & Produce Template

**One-line pitch:** A sun-washed, hand-grown HTML template for organic farms, farm shops and CSA programs — pure HTML, CSS and vanilla JS with zero frameworks.

FarmFresh is a complete 10-page marketplace-ready website for a family-owned organic farm. It celebrates honest food, healthy soil and community — with a warm linen-and-leaf aesthetic, heirloom photography, and every interaction built by hand. Drop it on any static host (Netlify, Vercel, GitHub Pages) and it works as-is.

---

## 📸 Screenshot

![Homepage Preview](screenshot.png)

## 🎨 Design System

| Token | Value | Usage |
| --- | --- | --- |
| `--cream` | `#FBF6EC` | Page ground — sunlit linen |
| `--linen` | `#F4ECDC` | Alternating section ground |
| `--paper` | `#FFFDF7` | Cards & form surfaces |
| `--green-deep` | `#244D22` | Footer, headline accents, dark foliage |
| `--green` | `#33682E` | Primary buttons, links |
| `--green-mid` | `#4C8A44` | Hover, category labels |
| `--green-soft` | `#A8C686` | Icon washes, check marks |
| `--green-fog` | `#DDE8CE` | Soft icon backgrounds |
| `--terracotta` | `#C9623B` | CTA buttons, accents — tomato |
| `--terracotta-deep` | `#A84A28` | CTA hover |
| `--tomato` | `#D97A3C` | Eyebrow rules |
| `--gold` | `#E3AC4B` | Star ratings, hero numerals |
| `--gold-soft` | `#F3D9A4` | Hero script text |
| `--ink` | `#24301F` | Headings |
| `--ink-soft` | `#4C5A45` | Body copy |
| `--mute` | `#7C8771` | Secondary text |
| `--line` | `#E3D9C3` | Hairline borders |
| `--font-display` | `"Playfair Display", serif` | Display headings |
| `--font-script` | `"Caveat", cursive` | Hand-lettered-feel accents |
| `--font-body` | `"Nunito Sans", sans-serif` | Body & UI |
| `--radius-lg` | `24px` | Cards |
| `--radius-pill` | `999px` | Buttons, pills, tags |
| `--shadow-lg` | `0 24px 60px rgba(36,77,34,.18)` | Hover elevation |
| `--container` | `1180px` | Content max width |

Type scale is fluid (`clamp()`) from roughly `1rem` body to `6.5rem` hero numerals. Breakpoints: **980px** (stacked layouts, burger menu) and **720px** (single column, tighter grids).

---

## 📄 Pages

| # | Page | File | Purpose |
| --- | --- | --- | --- |
| 1 | Home | [index.html](index.html) | Crossfade hero, ticker, about preview, features, stats, services, harvest shop, testimonials, newsletter CTA |
| 2 | About | [about.html](about.html) | Farm story, stats band, values, milestones timeline |
| 3 | Services | [service.html](service.html) | Six service cards, 4-step process, delivery zone |
| 4 | Features | [feature.html](feature.html) | Why-choose-us cards, freshness split, stats, guarantee |
| 5 | Shop | [product.html](product.html) | Filterable produce grid, 8 product cards |
| 6 | Product Detail | [detail.html](detail.html) | Gallery thumbnails, qty controls, tabs (desc / nutrition / reviews), related products |
| 7 | Team | [team.html](team.html) | Team grid, farm creed, join-us CTA |
| 8 | Blog | [blog.html](blog.html) | Journal grid, author cards, pagination, newsletter |
| 9 | Reviews | [testimonial.html](testimonial.html) | Featured story, masonry review wall, stats |
| 10 | Contact | [contact.html](contact.html) | Info cards, working demo form, embedded map |

Every page shares the same sticky header, mobile burger nav, rich footer and back-to-top control.

---

## 🛠 Tech Stack

- **Markup:** Semantic HTML5 (landmarks, ARIA labels, breadcrumbs, alt text)
- **Styling:** Pure CSS3 with token-driven custom properties, CSS Grid, Flexbox, `clamp()` fluid type, `aspect-ratio`, smooth scroll reveals
- **JavaScript:** Vanilla JS only — the shared `assets/js/main.js` powers the mobile nav, active-link highlighting, scroll reveals, hero crossfade, back-to-top, smooth anchors and demo forms (`.reveal`, `.nav-toggle`, `.nav-links`, `.hero-bg`, `[data-form]`, `[data-year]`)
- **Fonts:** Google Fonts — Playfair Display, Nunito Sans, Caveat
- **Zero frameworks:** no Bootstrap, no Tailwind, no React, no build step

---

## 🖼 Images

All 22 original photographs live in `assets/img/` and are referenced by their real filenames — no placeholder services:

| Asset | Used on |
| --- | --- |
| `carousel-1.jpg`, `carousel-2.jpg` | Hero crossfade + page-hero backgrounds |
| `about.png` | About / home story sections |
| `product-1.png`, `product-2.png`, `fruit.png`, `vegetable.png` | Product cards |
| `bg-product-1.png`, `bg-product-2.png` | Service cards & share boxes |
| `feature.png` | Feature / service / team imagery |
| `blog-1..3.jpg` | Journal cards |
| `team-1..3.jpg` | Team grid + author avatars |
| `testimonial.jpg`, `testimonial-1.jpg`, `testimonial-2.jpg`, `user.jpg` | Testimonial avatars & featured story |
| `footer.png` | Footer certification badge |

---

## 🔍 SEO Keywords

organic farm, fresh produce, farm to table, organic vegetables, heirloom tomatoes, organic fruits, CSA, farm share, organic delivery, u-pick, farm tours, sustainable farming, regenerative agriculture, farm box, local produce

---

## 📄 License

Free to use for personal and commercial projects. Original photography and brand story are placeholders — swap in your own farm's imagery and details before going live. No attribution required, but a link back is always appreciated.

---

### Let's Build Something Together 🚀

[https://tally.so/r/q4q1L9](https://tally.so/r/q4q1L9)
