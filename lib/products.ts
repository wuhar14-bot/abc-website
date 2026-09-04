// Authoritative price table (server-trusted source of truth).
//
// The checkout API looks prices up HERE by cart item id — it NEVER trusts the
// price sent from the browser. This is what prevents a user from editing the
// client-side price and paying less.
//
// Currency: USD. Amounts are in whole dollars (Stripe wants the smallest
// currency unit, so we multiply by 100 in the API layer).
// issues here since all our prices are whole dollars.
//
// Keep these numbers in sync with the product pages:
//   app/products/chalkemon/page.tsx  (COLORWAYS price)
//   app/products/tshirt/page.tsx     (fixed 35)

export const CURRENCY = "usd";

// Price resolver keyed by cart item id.
// Cart ids seen in the app:
//   chalkemon            -> Chalkemon (all colorways add to cart with id "chalkemon")
//   tshirt-{colorId}     -> ABC Tee (10 colorways, all $35)
//
// Chalkemon is paused and hidden from the public catalog. Its route remains
// reversible and uses the USD prices defined below.
/* Chalkemon colorways differ in price (380 / 420 / 420) but all share the id
// "chalkemon" in the cart. Since the cart does not carry the colorway id, we
// cannot distinguish them server-side from the id alone. To stay safe against
// price tampering we resolve Chalkemon to its LISTED price range and validate
// the client price is one of the allowed values, rather than blindly trusting. */

// ABC Tee colorways. MUST stay in sync with the COLORS array in
// app/products/tshirt/page.tsx — the cart id is `tshirt-${color.id}`.
// If you add a colorway on the product page, add its id here or checkout
// will reject it as an unknown product (400).
const TSHIRT_COLOR_IDS = [
  "blue",
];
export const TSHIRT_PRICE = 35;

// Electric chalk brush. Single SKU, no variants.
// Intro price — raise this once the trademark specimens are filed.
export const BRUSH_PRICE = 20;

type PriceRule =
  | { kind: "fixed"; price: number }
  | { kind: "allowed"; prices: number[] };

const PRICE_RULES: Record<string, PriceRule> = {
  chalkemon: { kind: "allowed", prices: [48, 54] },
  brush: { kind: "fixed", price: BRUSH_PRICE },
  ...Object.fromEntries(
    TSHIRT_COLOR_IDS.map((c) => [
      `tshirt-${c}`,
      { kind: "fixed", price: TSHIRT_PRICE } as PriceRule,
    ])
  ),
};

/**
 * Resolve the trusted unit price (in USD dollars) for a cart item.
 *
 * @param id         cart item id
 * @param clientPrice the price the browser sent (only used to disambiguate
 *                    multi-price products like Chalkemon; still validated)
 * @returns the trusted price, or null if the id is unknown / price invalid
 */
export function resolveUnitPrice(id: string, clientPrice: number): number | null {
  const rule = PRICE_RULES[id];
  if (!rule) return null;

  if (rule.kind === "fixed") {
    return rule.price;
  }

  // kind === "allowed": the client price must be one of the listed values.
  if (rule.prices.includes(clientPrice)) {
    return clientPrice;
  }
  return null;
}

export function currentPriceForId(id: string): number | null {
  const rule = PRICE_RULES[id];
  return rule?.kind === "fixed" ? rule.price : null;
}
