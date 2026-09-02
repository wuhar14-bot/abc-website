# ABC T-shirt pre-trademark archive

This folder preserves the T-shirt assets and restore reference from before the
AnythingButClimbing word-mark evidence photos were added on 2026-09-02.

## Preserved assets

The files in this folder are copies of the previous `public/images/tshirt-*`
assets, including the home/listing card, PDP model photos, and the ten color
specification images.

## Preserved site structure

The previous page structure is preserved in Git at commit `2252899` (the HEAD
before this image swap). The affected files were:

- `app/page.tsx`
- `app/products/page.tsx`
- `app/products/tshirt/page.tsx`
- `app/cart/page.tsx`
- `app/checkout/page.tsx`

To restore the previous implementation after the trademark application, use
the files from that commit as a reference, then replace the current
`/images/tshirt/...` references with the archived root-level assets. Do not
remove the new source photos in `public/images/tshirt/` until the application
records are no longer needed.
