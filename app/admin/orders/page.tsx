"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatMinorMoney } from "@/lib/currency";

type Order = {
  id: string;
  created: number;
  paymentStatus: string | null;
  fulfillmentStatus: string;
  trackingNumber: string;
  carrier: string;
  customer: { name: string | null; email: string | null; phone: string | null };
  address: {
    line1: string | null;
    line2: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
  } | null;
  amountTotal: number | null;
  currency: string | null;
  items: { name: string; quantity: number; amountTotal: number | null }[];
};

const STATUSES = ["unfulfilled", "processing", "shipped", "delivered", "cancelled"];

function money(amount: number | null, currency: string | null) {
  if (amount === null) return "—";
  return formatMinorMoney(amount, currency ?? "usd");
}

function addressText(address: Order["address"]) {
  if (!address) return "No shipping address";
  return [address.line1, address.line2, address.city, address.state, address.postalCode, address.country]
    .filter(Boolean)
    .join(", ");
}

export default function AdminOrdersPage() {
  const [token, setToken] = useState("");
  const [draftToken, setDraftToken] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [statusDraft, setStatusDraft] = useState<Record<string, string>>({});
  const [trackingDraft, setTrackingDraft] = useState<Record<string, string>>({});
  const [carrierDraft, setCarrierDraft] = useState<Record<string, string>>({});
  const [emailing, setEmailing] = useState<string | null>(null);

  const loadOrders = async (authToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load orders");
      const nextOrders = data.orders as Order[];
      setOrders(nextOrders);
      setStatusDraft(Object.fromEntries(nextOrders.map((order) => [order.id, order.fulfillmentStatus])));
      setTrackingDraft(Object.fromEntries(nextOrders.map((order) => [order.id, order.trackingNumber])));
      setCarrierDraft(Object.fromEntries(nextOrders.map((order) => [order.id, order.carrier])));
      setToken(authToken);
      sessionStorage.setItem("abc-admin-token", authToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("abc-admin-token");
    if (stored) loadOrders(stored);
  }, []);

  const totalsByCurrency = useMemo(() => {
    const totals = new Map<string, number>();
    for (const order of orders) {
      const currency = (order.currency ?? "unknown").toLowerCase();
      totals.set(currency, (totals.get(currency) ?? 0) + (order.amountTotal ?? 0));
    }
    return [...totals.entries()];
  }, [orders]);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (draftToken.trim()) loadOrders(draftToken.trim());
  };

  const saveOrder = async (order: Order) => {
    setSaving(order.id);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: order.id,
          fulfillmentStatus: statusDraft[order.id],
          trackingNumber: trackingDraft[order.id] ?? "",
          carrier: carrierDraft[order.id] ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update order");
      await loadOrders(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update order");
    } finally {
      setSaving(null);
    }
  };

  const resendEmail = async (order: Order) => {
    setEmailing(order.id); setError(null);
    try {
      const res = await fetch("/api/admin/orders/email", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: order.id }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "Could not send order email");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not send order email"); }
    finally { setEmailing(null); }
  };

  if (!token) {
    return (
      <div className="pt-[60px] min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md border border-abc-gray-line bg-abc-gray-card p-8">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-4">//// Admin</div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Order Desk</h1>
          <p className="font-mono text-xs text-abc-gray-text leading-relaxed mb-6">
            Enter the admin token configured in Vercel. It is kept only in this browser session.
          </p>
          <input
            type="password"
            value={draftToken}
            onChange={(event) => setDraftToken(event.target.value)}
            placeholder="ADMIN_DASHBOARD_TOKEN"
            className="w-full bg-abc-black border border-abc-gray-mid px-4 py-3 text-abc-white font-mono text-sm outline-none mb-4"
            autoFocus
          />
          <button className="btn-red w-full py-4 bg-abc-red text-white border-none font-mono text-xs tracking-[0.2em] uppercase font-semibold">
            Open Orders
          </button>
          {error && <div className="mt-4 text-abc-red font-mono text-xs">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="pt-[60px] min-h-screen max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-3">//// Admin / Orders</div>
          <h1 className="text-[clamp(40px,7vw,80px)] font-black uppercase tracking-tight leading-none">Order Desk</h1>
        </div>
        <button
          onClick={() => loadOrders(token)}
          className="btn-outline border border-abc-gray-mid text-abc-gray-text px-5 py-3 bg-transparent font-mono text-xs tracking-[0.15em] uppercase"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && <div className="mb-6 border border-abc-red/50 bg-abc-red/10 px-4 py-3 text-abc-red font-mono text-xs">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-abc-gray-line mb-10">
        <div className="bg-abc-gray-card p-6"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-abc-gray-subtle">Paid Orders</div><div className="text-3xl font-black mt-2">{orders.length}</div></div>
        <div className="bg-abc-gray-card p-6"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-abc-gray-subtle">Gross Total</div><div className="text-xl font-black mt-2 text-abc-red space-y-1">{totalsByCurrency.length === 0 ? "—" : totalsByCurrency.map(([currency, amount]) => <div key={currency}>{formatMinorMoney(amount, currency)}</div>)}</div></div>
        <div className="bg-abc-gray-card p-6"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-abc-gray-subtle">Needs Shipping</div><div className="text-3xl font-black mt-2">{orders.filter((order) => !["shipped", "delivered", "cancelled"].includes(order.fulfillmentStatus)).length}</div></div>
      </div>

      {orders.length === 0 && !loading ? (
        <div className="border-t border-abc-gray-line py-12 font-mono text-sm text-abc-gray-text">No paid orders yet.</div>
      ) : (
        <div className="border-t border-abc-gray-line">
          {orders.map((order) => {
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} className="border-b border-abc-gray-line">
                <button onClick={() => setExpanded(isOpen ? null : order.id)} className="w-full text-left py-5 grid grid-cols-[1fr_auto] md:grid-cols-[1.2fr_1.4fr_0.7fr_0.8fr_auto] gap-4 items-center bg-transparent border-none text-abc-white cursor-pointer">
                  <div><div className="font-mono text-[10px] text-abc-gray-subtle uppercase">{new Date(order.created * 1000).toLocaleString()}</div><div className="font-mono text-[10px] text-abc-gray-mid mt-1">{order.id}</div></div>
                  <div className="font-semibold uppercase tracking-[0.04em]">{order.customer.name || order.customer.email || "Guest"}</div>
                  <div className="font-mono text-abc-red">{money(order.amountTotal, order.currency)}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-abc-gray-text">{order.fulfillmentStatus}</div>
                  <div className="font-mono text-lg text-abc-gray-mid">{isOpen ? "−" : "+"}</div>
                </button>

                {isOpen && (
                  <div className="pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-abc-gray-card border border-abc-gray-line p-6">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-4">Customer & Shipping</div>
                      <div className="font-semibold mb-1">{order.customer.name || "Name not provided"}</div>
                      <div className="font-mono text-xs text-abc-gray-text leading-relaxed">{order.customer.email || "No email"}<br />{order.customer.phone || "No phone"}<br /><br />{addressText(order.address)}</div>
                    </div>
                    <div className="bg-abc-gray-card border border-abc-gray-line p-6">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-4">Items & Fulfillment</div>
                      <div className="border-t border-abc-gray-line mb-5">{order.items.map((item, index) => <div key={index} className="flex justify-between gap-4 py-3 border-b border-abc-gray-line font-mono text-xs"><span>{item.name} × {item.quantity}</span><span className="text-abc-red">{money(item.amountTotal, order.currency)}</span></div>)}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <select value={statusDraft[order.id] ?? order.fulfillmentStatus} onChange={(event) => setStatusDraft((current) => ({ ...current, [order.id]: event.target.value }))} className="bg-abc-black border border-abc-gray-mid px-3 py-3 text-abc-white font-mono text-xs uppercase"><option value="unfulfilled">Unfulfilled</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>
                        <input value={carrierDraft[order.id] ?? ""} onChange={(event) => setCarrierDraft((current) => ({ ...current, [order.id]: event.target.value }))} placeholder="Carrier" className="bg-abc-black border border-abc-gray-mid px-3 py-3 text-abc-white font-mono text-xs" />
                      </div>
                      <div className="flex gap-3 flex-wrap"><input value={trackingDraft[order.id] ?? ""} onChange={(event) => setTrackingDraft((current) => ({ ...current, [order.id]: event.target.value }))} placeholder="Tracking number" className="flex-1 min-w-[180px] bg-abc-black border border-abc-gray-mid px-3 py-3 text-abc-white font-mono text-xs" /><button onClick={() => saveOrder(order)} disabled={saving === order.id} className="btn-red px-5 py-3 bg-abc-red text-white border-none font-mono text-[10px] tracking-[0.15em] uppercase font-semibold">{saving === order.id ? "Saving…" : "Save"}</button><button onClick={() => resendEmail(order)} disabled={emailing === order.id} className="btn-outline border border-abc-gray-mid text-abc-gray-text px-5 py-3 bg-transparent font-mono text-[10px] tracking-[0.15em] uppercase">{emailing === order.id ? "Sending…" : "Resend order email"}</button></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
