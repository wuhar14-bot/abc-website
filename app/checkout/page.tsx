"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart, useCartHydrated } from "@/lib/cart";

const PRODUCT_IMAGES: Record<string, string> = {
    chalkemon: "/images/chalkemon-card.png",
    tshirt: "/images/tshirt/model-blue-01.jpg",
    brush: "/photos-brush/brush-01.jpg",
};

function imageFor(id: string) {
    return PRODUCT_IMAGES[id.split("-")[0]] || "/images/chalkemon-card.png";
}

export default function CheckoutPage() {
    const { items, total, count } = useCart();
    const hydrated = useCartHydrated();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if the cart is genuinely empty — but only AFTER localStorage has
    // been read. Redirecting before hydration throws away a real cart on any
    // page refresh or direct visit to /checkout.
    useEffect(() => {
        if (hydrated && items.length === 0) {
            router.push("/products");
        }
    }, [hydrated, items.length, router]);

    const handlePay = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });
            const data = await res.json();
            if (!res.ok || !data.url) {
                throw new Error(data.error || "Checkout failed");
            }
            // Hand off to Stripe's hosted checkout page.
            window.location.href = data.url;
        } catch (e) {
            setError(e instanceof Error ? e.message : "Checkout failed");
            setLoading(false);
        }
    };

    // Before hydration we don't yet know whether the cart is empty, so show a
    // placeholder instead of flashing "empty" or redirecting prematurely.
    if (!hydrated) {
        return (
            <div className="pt-[60px] min-h-[60vh] flex items-center justify-center">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-subtle">
                    Loading order…
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="pt-[60px] max-w-[1000px] mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-3">
                    //// Checkout
                </div>
                <h1 className="text-[clamp(32px,5vw,56px)] font-black uppercase tracking-tight leading-none">
                    Review Order
                </h1>
            </div>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-start">
                {/* LEFT — Order items + pay */}
                <div>
                    <div className="border-t border-abc-gray-line">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.variant}`}
                                className="flex items-center gap-4 py-5 border-b border-abc-gray-line"
                            >
                                <div className="relative w-14 h-16 bg-abc-gray-card overflow-hidden flex-shrink-0">
                                    <Image
                                        src={imageFor(item.id)}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-sm uppercase tracking-[0.05em] text-abc-white">
                                        {item.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-abc-gray-subtle uppercase tracking-[0.1em]">
                                        {item.variant} × {item.qty}
                                    </div>
                                </div>
                                <div className="font-mono text-sm text-abc-red">
                                    HK${item.price * item.qty}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust / info note */}
                    <div className="mt-8 font-mono text-[10px] tracking-[0.12em] text-abc-gray-mid uppercase leading-relaxed">
                        Shipping address &amp; fees are collected on the next step (Stripe secure checkout). Payments are handled by Stripe — we never see your card details.
                    </div>

                    {error && (
                        <div className="mt-6 border border-abc-red/50 bg-abc-red/10 px-4 py-3 font-mono text-[11px] tracking-[0.1em] text-abc-red uppercase">
                            {error}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-8 flex gap-3">
                        <Link
                            href="/cart"
                            className="btn-outline border border-abc-gray-mid text-abc-gray-text px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase cursor-pointer bg-transparent no-underline"
                        >
                            ← Cart
                        </Link>
                        <button
                            onClick={handlePay}
                            disabled={loading}
                            className="btn-red flex-1 py-4 bg-abc-red text-white border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Redirecting…" : "Pay with Stripe →"}
                        </button>
                    </div>
                </div>

                {/* RIGHT — Summary */}
                <div className="bg-abc-gray-card border-l border-abc-gray-line p-6 md:p-8 md:sticky md:top-[84px]">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-6">
                        Order Summary
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-xs tracking-[0.15em] uppercase text-abc-gray-subtle">
                            Items
                        </span>
                        <span className="font-mono text-sm text-abc-gray-text">{count()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-abc-gray-line">
                        <span className="font-mono text-xs tracking-[0.15em] uppercase text-abc-gray-subtle">
                            Subtotal
                        </span>
                        <span className="font-mono text-sm text-abc-gray-text">HK${total()}</span>
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.12em] text-abc-gray-mid uppercase mb-4">
                        Shipping calculated next step
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-abc-gray-subtle">
                            Total
                        </span>
                        <span className="font-mono text-lg text-abc-red font-bold">
                            HK${total()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
