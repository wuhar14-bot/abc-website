import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// GET /api/order?session_id=cs_...
// Returns a minimal, safe summary of a completed Checkout Session so the
// success page can show a REAL order instead of trusting the URL.
//
// Security: the session id in the URL is untrusted input. We ask Stripe for the
// session and only report success when Stripe says it is actually paid. We
// return just what the confirmation screen needs — never the raw Stripe object,
// which contains far more customer data than the page should expose.

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  // Cheap shape check before spending a Stripe call on obvious junk.
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return NextResponse.json({ error: "Missing or malformed session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed", paid: false },
        { status: 402 }
      );
    }

    const items = (session.line_items?.data ?? []).map((li) => ({
      description: li.description,
      qty: li.quantity,
      amount: li.amount_total,
    }));

    return NextResponse.json({
      paid: true,
      email: session.customer_details?.email ?? null,
      customer: {
        name: session.collected_information?.shipping_details?.name ?? session.customer_details?.name ?? null,
        phone: session.customer_details?.phone ?? null,
      },
      address: session.collected_information?.shipping_details?.address ?? session.customer_details?.address ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      items,
    });
  } catch (err) {
    // An unknown / mismatched-mode session id lands here as a Stripe error.
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[order] lookup failed:", message);
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
}
