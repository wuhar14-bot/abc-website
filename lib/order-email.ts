import { formatMinorMoney } from "@/lib/currency";

type EmailOrder = { id: string; email: string | null; name: string | null; amountTotal: number | null; currency: string | null; items: { name: string; quantity: number; amountTotal: number | null }[] };

export async function sendOrderEmail(order: EmailOrder) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Order email is not configured (RESEND_API_KEY / ORDER_FROM_EMAIL)");
  if (!order.email) throw new Error("This order has no customer email");
  const currency = order.currency ?? "usd";
  const rows = order.items.map((item) => `<tr><td style="padding:8px 0;border-bottom:1px solid #ddd">${escapeHtml(item.name)} × ${item.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #ddd;text-align:right">${formatMinorMoney(item.amountTotal, currency)}</td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#111;max-width:600px;margin:auto"><p style="letter-spacing:.18em;text-transform:uppercase;color:#e63232;font-size:12px">AnythingButClimbing</p><h1>Order confirmed</h1><p>Hi ${escapeHtml(order.name || "there")},</p><p>Thanks for your order. We have received your payment.</p><table style="width:100%;border-collapse:collapse">${rows}<tr><td style="padding:14px 0;font-weight:bold">Total paid</td><td style="padding:14px 0;text-align:right;font-weight:bold">${formatMinorMoney(order.amountTotal, currency)}</td></tr></table><p style="color:#666;font-size:12px">Order reference: ${escapeHtml(order.id)}</p></div>`;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [order.email], subject: `AnythingButClimbing order ${order.id}`, html }) });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return response.json() as Promise<{ id: string }>;
}

function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] ?? character)); }
