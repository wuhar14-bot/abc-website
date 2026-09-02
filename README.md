# ABC Website — anythingbutclimbing.com

## Approved Slogans & Brand Copy

这些是挑过的，确认用的文案：

| 用途 | 文案 |
|---|---|
| 品牌名 / 主 slogan | Anything But Climbing |
| 中文品牌名 | 非爬不可 |
| 产品理念 | Oddly useful. Always FUNctional. |
| Instagram hashtag | #HopelesslyObsessed |
| 长版品牌宣言 | 不做一本正经的装备，给一本正经的攀岩者做有趣的小东西。 |
| Chalkemon 产品文案 | 陪你非爬不可的小毛球。 |

---

## Site Structure

| Route | Page |
|---|---|
| `/` | Homepage |
| `/products` | All products |
| `/products/chalkemon` | Chalkemon product page |
| `/products/tshirt` | ABC Tee product page |
| `/products/brush` | ABC Brush product page |
| `/cart` | Cart |
| `/checkout` | Checkout (Stripe) |
| `/admin/orders` | Private order desk (Stripe-backed) |
| `/about` | Brand story |

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Zustand (cart state)
- Stripe (payments and order data)
- Vercel (deployment)

## Order desk

Set `ADMIN_DASHBOARD_TOKEN` in Vercel Production environment variables, then open
`/admin/orders`. The page reads paid Checkout Sessions from Stripe and shows the
customer, shipping address, items, amount, and payment status. It also stores
fulfillment status, carrier, and tracking number in the Stripe Session metadata.

The token is kept in the browser session only. Do not commit it or paste it into
the repository.

## Dev Commands

```bash
npm run dev    # localhost:3000
npm run build  # production build check
```

## Reference Files

- Design reference: `_dev/design-reference.html`
- Product photos: `public/photos/` (15 × DSC01xxx.png — all Sooty Boo black)
- Planning: `_dev/task_plan.md`, `_dev/findings.md`, `_dev/progress.md`
