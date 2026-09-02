import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  FULFILLMENT_STATUSES,
  isFulfillmentStatus,
  requireAdmin,
  type FulfillmentStatus,
} from "@/lib/admin";

export const runtime = "nodejs";

type OrderItem = {
  name: string;
  quantity: number;
  amountTotal: number | null;
};

function addressFromSession(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address ?? session.customer_details?.address;
  if (!address) return null;
  return {
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    postalCode: address.postal_code,
    country: address.country,
  };
}

async function serializeOrder(id: string) {
  const session = await stripe.checkout.sessions.retrieve(id, { expand: ["line_items"] });
  const metadata = session.metadata ?? {};
  const fulfillmentStatus: FulfillmentStatus = isFulfillmentStatus(metadata.fulfillment_status)
    ? metadata.fulfillment_status
    : "unfulfilled";

  return {
    id: session.id,
    created: session.created,
    paymentStatus: session.payment_status,
    fulfillmentStatus,
    trackingNumber: metadata.tracking_number ?? "",
    carrier: metadata.carrier ?? "",
    customer: {
      name: session.collected_information?.shipping_details?.name ?? session.customer_details?.name ?? null,
      email: session.customer_details?.email ?? null,
      phone: session.customer_details?.phone ?? null,
    },
    address: addressFromSession(session),
    amountTotal: session.amount_total,
    currency: session.currency,
    items: (session.line_items?.data ?? []).map((line): OrderItem => ({
      name: line.description ?? "Item",
      quantity: line.quantity ?? 0,
      amountTotal: line.amount_total ?? null,
    })),
  };
}

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
    });
    const paid = sessions.data.filter((session) => session.payment_status === "paid");
    const orders = await Promise.all(paid.map((session) => serializeOrder(session.id)));
    orders.sort((a, b) => b.created - a.created);
    return NextResponse.json(
      { orders, statuses: FULFILLMENT_STATUSES },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[admin/orders] list failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Could not load orders" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let body: {
    sessionId?: string;
    fulfillmentStatus?: string;
    trackingNumber?: string;
    carrier?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sessionId = body.sessionId ?? "";
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }
  if (!isFulfillmentStatus(body.fulfillmentStatus)) {
    return NextResponse.json({ error: "Invalid fulfillment status" }, { status: 400 });
  }

  const trackingNumber = (body.trackingNumber ?? "").trim();
  const carrier = (body.carrier ?? "").trim();
  if (trackingNumber.length > 100 || carrier.length > 50) {
    return NextResponse.json({ error: "Tracking details are too long" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Only paid orders can be fulfilled" }, { status: 409 });
    }

    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...(session.metadata ?? {}),
        fulfillment_status: body.fulfillmentStatus,
        tracking_number: trackingNumber,
        carrier,
      },
    });

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[admin/orders] update failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not update order" }, { status: 500 });
  }
}
