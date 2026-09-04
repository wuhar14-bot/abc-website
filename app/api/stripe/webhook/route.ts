import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { sendOrderEmail } from "@/lib/order-email";

export const runtime = "nodejs";

/**
 * Stripe calls this endpoint after Checkout completes. The raw request body
 * must be used for signature verification, so do not call req.json() here.
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error(
      "[stripe/webhook] signature verification failed:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({ received: true });
  }

  const eventSession = event.data.object as Stripe.Checkout.Session;
  try {
    const session = await stripe.checkout.sessions.retrieve(eventSession.id, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true, skipped: "payment not paid" });
    }

    // Stripe may retry an event. Store the sent marker on the Checkout
    // Session so the same order is not emailed repeatedly.
    if (session.metadata?.order_email_sent === "true") {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const result = await sendOrderEmail({
      id: session.id,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      name:
        session.collected_information?.shipping_details?.name ??
        session.customer_details?.name ??
        null,
      amountTotal: session.amount_total,
      currency: session.currency,
      items: (session.line_items?.data ?? []).map((line) => ({
        name: line.description ?? "Item",
        quantity: line.quantity ?? 0,
        amountTotal: line.amount_total ?? null,
      })),
    });

    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...(session.metadata ?? {}),
        order_email_sent: "true",
        order_email_id: result.id,
      },
    });

    return NextResponse.json({ received: true, emailId: result.id });
  } catch (error) {
    console.error(
      "[stripe/webhook] order email failed:",
      error instanceof Error ? error.message : error
    );
    // Return non-2xx so Stripe retries transient Resend/API failures.
    return NextResponse.json({ error: "Could not send order email" }, { status: 500 });
  }
}
