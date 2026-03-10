# Findings: ABC Website Research

## Brand Identity (from images)

### Logo
- Acronym: "ABC" in custom angular white letterforms
- Full name: "Anything But Climbing" — hand-lettered, bold, slightly chaotic
- "but" is emphasized in red italic within the full name
- Used on: T-shirt back, product pages, sticker sheets

### Chalkemon Product
- Full name: CHALKEMON™ 粉袋精灵
- Tagline: "Air Activated Self-Heating Warmer"
- Subtags: "Handcrafted and One-of-a-Kind", "Rock & Rope - Inspired Climbing Elements", "Funny, Fuzzy Always Fun-ctional"
- 3 colorways:
  - **Sooty Boo** 煤球精灵 — black
  - **Muddy Buddy** 泥巴精灵 — yellow/earth
  - **Dolong Odo** 石笋精灵 — white/gray
- Has red stitching detail (mouth/worm feature)
- Comes with special 暖 packaging (pink bag)
- Has carabiner/rope climbing attachment
- QR code links to: @anything_but_climbing (Instagram)

### ABC T-Shirt
- Style: Oversized, washed-out dark gray
- Back: Large "Anything But Climbing" hand-lettered print in white
- Front chest: Small "ABC" logo
- Brand feel: Premium streetwear, limited drop

### Product Page Style (from chalkemon 产品页 1-3)
- **Layout**: Vertical long-scroll (WeChat article / xiaohongshu style)
- **Sections**:
  1. Hero photo (large, moody)
  2. Product name + tagline (CN + EN)
  3. PRODUCT INTRO — bullet features
  4. Special 特制礼包 packaging info
  5. DETAILS 产品细节 — close-up shots with callouts
  6. SCENARIO 使用场景 — 4-grid usage scenarios
  7. SPECIAL EDITION 颜色特别版 — 3 colorways
  8. Brand outro + "Anything But Climbing" full logo

### Design Reference HTML (design-reference.html)
- Style: editorial/brutalist
- Colors: sage green (#7A9E8E), blush pink (#EDD3CE), dark green (#2A3630)
- Font: IBM Plex Mono
- Effects: noise overlay, crosshair cursor, 4-column grid, organic blob shapes
- This is a style INSPIRATION, not ABC's actual design

## Competitor / Inspiration Reference
- Chalkemon product pages follow Chinese social commerce style (Xiaohongshu/WeChat)
- English-facing pages follow streetwear brand style (Supreme, Palace, etc.)

## Technical Findings
- Domain: anythingbutclimbing.com on GoDaddy
- Plan: Keep GoDaddy for DNS only, deploy to Vercel
- Migration: Change A record / CNAME in GoDaddy to Vercel-provided values
- No existing code base — building from scratch

## Assets Available (in /ref-*.png)
- `ref-frame4.png` — logo + illustrations sticker sheet (black bg)
- `ref-T2.png` — ABC T-shirt product photo (back view)
- `ref-A4.png` — Chalkemon A4 poster (black colorway)
- `ref-untitled.png` — T-shirt lifestyle photos vertical strip
- `ref-chalkemon-1.png` — Chalkemon 产品页 1 (intro + packaging)
- `ref-chalkemon-2.png` — Chalkemon 产品页 2 (details + scenario grid)
- `ref-chalkemon-3.png` — Chalkemon 产品页 3 (special editions + outro)
