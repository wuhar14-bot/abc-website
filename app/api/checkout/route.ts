import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { CURRENCY, resolveUnitPrice } from "@/lib/products";

// POST /api/checkout
// Body: { items: { id, name, variant, price, qty }[] }
// Returns: { url } — the Stripe-hosted Checkout page to redirect to.
//
// Security: the browser sends prices, but we DO NOT trust them. Every line
// item's price is re-resolved server-side from lib/products.ts. If an id is
// unknown or the price doesn't match our table, we reject the request.

export const runtime = "nodejs";

type IncomingItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export async function POST(req: NextRequest) {
  let body: { items?: IncomingItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const qty = Math.floor(Number(item.qty));
    if (!item.id || !Number.isFinite(qty) || qty < 1 || qty > 99) {
      return NextResponse.json(
        { error: `Invalid quantity for item ${item.id}` },
        { status: 400 }
      );
    }

    // Trusted price lookup — ignores any tampered browser price.
    const unitPrice = resolveUnitPrice(item.id, Number(item.price));
    if (unitPrice === null) {
      return NextResponse.json(
        { error: `Unknown or invalid product: ${item.id}` },
        { status: 400 }
      );
    }

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: CURRENCY,
        unit_amount: unitPrice * 100, // HKD dollars -> cents
        product_data: {
          name: item.name || item.id,
          description: item.variant || undefined,
        },
      },
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Let Stripe collect the shipping address on its hosted page.
      shipping_address_collection: {
        // HK + common international markets ABC ships to. Extend as needed.
        allowed_countries: [
          "HK", "US", "GB", "CA", "AU", "SG", "JP", "TW", "MO",
          "DE", "FR", "NL", "MY", "TH", "KR", "NZ",
        ],
      },
      // Region-based flat shipping (mirrors the planned HK free / intl HK$120).
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Hong Kong — Free",
            fixed_amount: { amount: 0, currency: CURRENCY },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "International",
            fixed_amount: { amount: 120 * 100, currency: CURRENCY },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 21 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] Stripe error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
