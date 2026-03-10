# Task Plan: anythingbutclimbing.com Website

## Goal
Build a full e-commerce independent store for ABC (Anything But Climbing) brand,
deployed to Vercel at anythingbutclimbing.com.

---

## Brand Identity (from reference images)

### Colors
- Background: `#000000` (pure black)
- Primary text: `#FFFFFF` (white)
- Accent: `#E63232` (red — used in logo "but" and decorative slashes)
- Secondary text: `#AAAAAA` (gray)
- ⚠️ User has a Figma file with exact brand colors — need to confirm specific hex values

### Typography
- Display: hand-lettered "Anything But Climbing" style (use Bebas Neue / Archivo Black as fallback)
- Body: clean sans-serif uppercase (use Inter / Space Grotesk)
- Logo acronym: custom ABC mark (white triangular letterforms)
- Style reference: design-reference.html (IBM Plex Mono, editorial brutalist layout)

### Visual Language
- Black background dominant
- Crosshatch / etching illustration style (Chalkemon drawings)
- Streetwear energy — bold, raw, no-fluff
- Red slash marks `////` as decorative elements
- Noise overlay texture
- Photo + illustration hybrid

### Products & SKUs
1. **Chalkemon** — fuzzy chalk bag creature
   - Sooty Boo (black)
   - Muddy Buddy (yellow/earth)
   - Dolong Odo (white/gray)
2. **ABC T-Shirt** — washed-out dark gray
   - Sizes: S / M / L / XL

---

## Confirmed Decisions (FINAL)

| Topic | Decision |
|---|---|
| **Payment** | Stripe (cards) + PayPal + WeChat Pay / Alipay via Stripe built-in |
| **Backend / Orders** | Self-built — Supabase (PostgreSQL) for orders + inventory |
| **Target Market** | HK/Taiwan + International (EU/US/SEA) |
| **Language** | EN/ZH bilingual toggle (next-intl) |
| **Auth** | Guest checkout only (no account required) |
| **Shipping** | Fixed rate by region (e.g. HK $60 / International $20 USD) |
| **Fulfillment** | 3PL dropshipping — shipping rate hardcoded per region |
| **Style** | Black/white/red extracted from brand images + design-reference.html editorial layout |
| **Product copy** | Extracted from reference images (EN + ZH already in images) |
| **Product photos** | Use existing ref PNGs + originals user has |

---

## Site Structure

```
/                       → Homepage (hero + brand story + product preview)
/products               → All products grid
/products/chalkemon     → Chalkemon product page + add to cart
/products/tshirt        → ABC T-Shirt product page + add to cart
/cart                   → Cart page
/checkout               → Guest checkout (name, email, address, payment)
/order/[id]             → Order confirmation page
/about                  → Brand story + manifesto
```

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Vercel-native, SSR + static hybrid |
| Styling | **Tailwind CSS v4** | Utility-first, dark theme |
| Database | **Supabase** (PostgreSQL) | Free tier, real-time, easy auth |
| Payments | **Stripe** (+ PayPal) | International cards, WeChat/Alipay via Stripe |
| Cart State | **Zustand** | Lightweight client-side cart |
| Email | **Resend** | Order confirmation emails |
| i18n | **next-intl** | EN/ZH language switching |
| Deployment | **Vercel** | Auto SSL, custom domain, free tier |
| Images | Local `/public` + Vercel Image Optimization | No CMS needed v1 |

---

## Phases

### Phase 1 — Project Scaffold `[ ]`
- [ ] `npx create-next-app@latest` in `/e/claude-code/abc/website/`
- [ ] Install: Tailwind v4, Zustand, next-intl, Supabase client, Stripe SDK
- [ ] Configure Tailwind brand theme tokens
- [ ] Set up folder structure (app router, components, lib)
- [ ] Set up EN/ZH locale files
- [ ] Push to GitHub repo

### Phase 2 — Design System `[ ]`
- [ ] CSS variables (colors, spacing, fonts)
- [ ] Shared components: Navbar (with language toggle), Footer, Button variants
- [ ] Noise overlay effect (from design reference)
- [ ] Typography scale
- [ ] Product card component

### Phase 3 — Homepage `[ ]`
- [ ] Hero section (full-screen black, logo + tagline animation)
- [ ] Brand intro section ("Anything But Climbing" manifesto)
- [ ] Product preview cards (Chalkemon + Tee) → link to product pages
- [ ] Footer (Instagram, contact)

### Phase 4 — Product Pages `[ ]`
- [ ] `/products` grid page
- [ ] `/products/chalkemon` — full product detail
  - Hero photo
  - Colorway selector (3 options)
  - Product intro + features list
  - Detail close-ups section
  - Scenario / use case section
  - Add to cart button
- [ ] `/products/tshirt` — tee product page
  - Size selector (S/M/L/XL)
  - Product photos
  - Add to cart button

### Phase 5 — Cart & Checkout `[ ]`
- [ ] Cart sidebar / page (Zustand state)
- [ ] Guest checkout form (name, email, shipping address)
- [ ] Stripe payment integration
- [ ] PayPal button
- [ ] Order creation → Supabase
- [ ] Order confirmation email (Resend)
- [ ] `/order/[id]` confirmation page

### Phase 6 — Backend / Supabase `[ ]`
- [ ] Supabase project setup
- [ ] Tables: `products`, `orders`, `order_items`
- [ ] Stripe webhook → update order status
- [ ] Basic inventory tracking (stock count per SKU)

### Phase 7 — About Page `[ ]`
- [ ] Brand manifesto text (EN + ZH)
- [ ] Chalkemon character intro
- [ ] Team / origin story

### Phase 8 — Deploy `[ ]`
- [ ] Create GitHub repo: `wuhar14-bot/abc-website`
- [ ] Connect to Vercel
- [ ] Set env vars in Vercel (Supabase URL, Stripe keys, etc.)
- [ ] Configure custom domain DNS (GoDaddy A record → Vercel)
- [ ] Test SSL + live URL
- [ ] Test full checkout flow on production

---

## Environment Variables Needed

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend (email)
RESEND_API_KEY=

# App
NEXT_PUBLIC_SITE_URL=https://anythingbutclimbing.com
```

---

## Open Questions (to resolve before coding)
- [ ] Figma file exact brand colors — confirm hex values
- [ ] WeChat Pay / Alipay — defer to v1.1 or include now?
- [ ] 3PL provider — flat rate shipping or live rate API?
- [ ] Do we have product copy (descriptions) ready in EN + ZH?
- [ ] Do we have high-res product photos beyond the reference PNGs?

---

## Files Created
- `task_plan.md` — this file
- `findings.md` — brand/design research
- `progress.md` — session log

---

## Errors Log
_(none yet)_
