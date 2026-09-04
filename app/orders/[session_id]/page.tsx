"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatMinorMoney } from "@/lib/currency";

type Order = {
  email: string | null;
  customer: { name: string | null; phone: string | null };
  address: { line1: string | null; line2: string | null; city: string | null; state: string | null; postal_code: string | null; country: string | null } | null;
  amountTotal: number | null;
  currency: string | null;
  items: { description: string | null; qty: number | null; amount: number | null }[];
};

function OrderBody() {
  const params = useParams<{ session_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionId = params.session_id;
    if (!sessionId) return;
    fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.paid) throw new Error("Order not found");
        setOrder(data);
      })
      .catch(() => setError(true));
  }, [params.session_id]);

  if (error) return <OrderMessage title="Order not found" body="This order link is invalid or payment has not completed." />;
  if (!order) return <OrderMessage title="Loading order…" body="Confirming your payment details with Stripe." />;

  const address = order.address ? [order.address.line1, order.address.line2, order.address.city, order.address.state, order.address.postal_code, order.address.country].filter(Boolean).join(", ") : "No shipping address";
  return (
    <div className="pt-[60px] max-w-[760px] mx-auto px-6 py-20">
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-4">//// Customer Order</div>
      <h1 className="text-[clamp(40px,7vw,72px)] font-black uppercase tracking-tight leading-none mb-10">Your Order</h1>
      <div className="border-t border-abc-gray-line">
        {order.items.map((item, index) => <div key={index} className="flex justify-between gap-4 py-4 border-b border-abc-gray-line font-mono text-sm"><span>{item.description} × {item.qty}</span><span className="text-abc-red">{formatMinorMoney(item.amount, order.currency ?? "usd")}</span></div>)}
      </div>
      <div className="flex justify-between py-5 border-b border-abc-gray-line font-mono text-base"><span className="uppercase tracking-[0.15em] text-abc-gray-subtle">Total paid</span><span className="text-abc-red font-bold">{formatMinorMoney(order.amountTotal, order.currency ?? "usd")}</span></div>
      <div className="mt-8 bg-abc-gray-card border border-abc-gray-line p-6 font-mono text-xs text-abc-gray-text leading-relaxed">
        <div className="text-abc-gray-subtle uppercase tracking-[0.15em] mb-3">Customer &amp; shipping</div>
        <div>{order.customer.name || "Name not provided"}</div>
        <div>{order.email || "No email"}</div>
        <div>{order.customer.phone || "No phone"}</div>
        <div className="mt-3">{address}</div>
      </div>
      <p className="mt-8 font-mono text-xs text-abc-gray-mid uppercase tracking-[0.1em]">A payment receipt has been requested for {order.email || "your checkout email"}.</p>
      <Link href="/" className="btn-red inline-block mt-8 bg-abc-red text-white px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold">Back to Home</Link>
    </div>
  );
}

function OrderMessage({ title, body }: { title: string; body: string }) {
  return <div className="pt-[60px] min-h-[70vh] flex flex-col items-center justify-center text-center gap-5 px-6"><div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-mid">//// Customer Order</div><h1 className="text-4xl font-black uppercase">{title}</h1><p className="font-mono text-sm text-abc-gray-text max-w-md">{body}</p></div>;
}

export default function CustomerOrderPage() {
  return <Suspense fallback={<OrderMessage title="Loading order…" body="Confirming your payment details with Stripe." />}><OrderBody /></Suspense>;
}
