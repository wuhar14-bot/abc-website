"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";

type OrderState =
    | { status: "loading" }
    | { status: "not_found" }
    | {
        status: "paid";
        email: string | null;
        amountTotal: number | null;
        currency: string | null;
        items: { description: string | null; qty: number | null; amount: number | null }[];
    };

function money(amount: number | null, currency: string | null) {
    if (amount === null) return "—";
    const symbol = (currency ?? "hkd").toLowerCase() === "hkd" ? "HK$" : "";
    return `${symbol}${(amount / 100).toFixed(2)}`;
}

function SuccessBody() {
    const params = useSearchParams();
    const sessionId = params.get("session_id");
    const clear = useCart((s) => s.clear);
    const [order, setOrder] = useState<OrderState>({ status: "loading" });

    useEffect(() => {
        if (!sessionId) {
            setOrder({ status: "not_found" });
            return;
        }
        let alive = true;
        (async () => {
            try {
                const res = await fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`);
                const data = await res.json();
                if (!alive) return;
                if (res.ok && data.paid) {
                    setOrder({ status: "paid", ...data });
                    // Only empty the cart once payment is actually confirmed.
                    clear();
                } else {
                    setOrder({ status: "not_found" });
                }
            } catch {
                if (alive) setOrder({ status: "not_found" });
            }
        })();
        return () => {
            alive = false;
        };
    }, [sessionId, clear]);

    if (order.status === "loading") {
        return (
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-subtle">
                Confirming payment…
            </div>
        );
    }

    if (order.status === "not_found") {
        return (
            <>
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-mid">
                    //// No Order Found
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-abc-white">
                    Nothing to show
                </h1>
                <p className="font-mono text-sm text-abc-gray-text tracking-[0.1em] max-w-md leading-relaxed">
                    We couldn&apos;t find a completed order for this link. If you just paid and see
                    this, contact us and we&apos;ll sort it out.
                </p>
                <Link
                    href="/products"
                    className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
                >
                    Browse Products
                </Link>
            </>
        );
    }

    return (
        <>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red">
                //// Order Confirmed
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-abc-white">
                Thank You!
            </h1>

            <div className="w-full max-w-sm border-t border-abc-gray-line text-left">
                {order.items.map((it, i) => (
                    <div
                        key={i}
                        className="flex justify-between gap-4 py-3 border-b border-abc-gray-line"
                    >
                        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-abc-gray-text">
                            {it.description} × {it.qty}
                        </span>
                        <span className="font-mono text-[11px] text-abc-gray-text">
                            {money(it.amount, order.currency)}
                        </span>
                    </div>
                ))}
                <div className="flex justify-between gap-4 pt-4">
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-abc-gray-subtle">
                        Total Paid
                    </span>
                    <span className="font-mono text-base text-abc-red font-bold">
                        {money(order.amountTotal, order.currency)}
                    </span>
                </div>
            </div>

            {/* No automated email is wired up yet, so don't promise one. */}
            <p className="font-mono text-sm text-abc-gray-text tracking-[0.1em] max-w-md leading-relaxed">
                Payment received{order.email ? ` for ${order.email}` : ""}. Keep this page or your
                Stripe receipt as proof of purchase.
            </p>
            <Link
                href="/"
                className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
            >
                Back to Home
            </Link>
        </>
    );
}

export default function SuccessPage() {
    return (
        <div className="pt-[60px] min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">
            <Suspense
                fallback={
                    <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-subtle">
                        Confirming payment…
                    </div>
                }
            >
                <SuccessBody />
            </Suspense>
        </div>
    );
}
