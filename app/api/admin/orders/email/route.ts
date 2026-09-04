import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireAdmin } from "@/lib/admin";
import { sendOrderEmail } from "@/lib/order-email";

export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req); if (denied) return denied;
  let body: { sessionId?: string }; try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const sessionId = body.sessionId ?? ""; if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    if (session.payment_status !== "paid") return NextResponse.json({ error: "Only paid orders can receive an email" }, { status: 409 });
    const result = await sendOrderEmail({ id: session.id, email: session.customer_details?.email ?? null, name: session.collected_information?.shipping_details?.name ?? session.customer_details?.name ?? null, amountTotal: session.amount_total, currency: session.currency, items: (session.line_items?.data ?? []).map((line) => ({ name: line.description ?? "Item", quantity: line.quantity ?? 0, amountTotal: line.amount_total ?? null })) });
    return NextResponse.json({ ok: true, emailId: result.id });
  } catch (error) { console.error("[admin/orders/email] send failed:", error instanceof Error ? error.message : error); return NextResponse.json({ error: error instanceof Error ? error.message : "Could not send order email" }, { status: 500 }); }
}
