"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/lang";

const PRODUCT_IMAGES: Record<string, string> = {
    chalkemon: "/images/chalkemon-card.png",
    tshirt: "/images/tshirt-card.png",
};

function imageFor(id: string) {
    return PRODUCT_IMAGES[id.split("-")[0]] || "/images/chalkemon-card.png";
}

export default function CheckoutPage() {
    const { items, total, count } = useCart();
    const { lang } = useLang();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if cart is empty (client-side only)
    useEffect(() => {
        if (items.length === 0) {
            router.push("/products");
        }
    }, [items.length, router]);

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

    if (items.length === 0) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="pt-[60px] max-w-[1000px] mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-3">
                    //// {lang === "cn" ? "结账" : "Checkout"}
                </div>
                <h1 className="text-[clamp(32px,5vw,56px)] font-black uppercase tracking-tight leading-none">
                    {lang === "cn" ? "确认订单" : "Review Order"}
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
                        {lang === "cn"
                            ? "收货地址与运费将在下一步（Stripe 安全收银台）填写。支付由 Stripe 处理，我们不接触你的银行卡信息。"
                            : "Shipping address & fees are collected on the next step (Stripe secure checkout). Payments are handled by Stripe — we never see your card details."}
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
                            ← {lang === "cn" ? "购物车" : "Cart"}
                        </Link>
                        <button
                            onClick={handlePay}
                            disabled={loading}
                            className="btn-red flex-1 py-4 bg-abc-red text-white border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? lang === "cn" ? "跳转中…" : "Redirecting…"
                                : lang === "cn" ? "前往支付 →" : "Pay with Stripe →"}
                        </button>
                    </div>
                </div>

                {/* RIGHT — Summary */}
                <div className="bg-abc-gray-card border-l border-abc-gray-line p-6 md:p-8 md:sticky md:top-[84px]">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-6">
                        {lang === "cn" ? "订单摘要" : "Order Summary"}
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-xs tracking-[0.15em] uppercase text-abc-gray-subtle">
                            {lang === "cn" ? "件数" : "Items"}
                        </span>
                        <span className="font-mono text-sm text-abc-gray-text">{count()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-abc-gray-line">
                        <span className="font-mono text-xs tracking-[0.15em] uppercase text-abc-gray-subtle">
                            {lang === "cn" ? "小计" : "Subtotal"}
                        </span>
                        <span className="font-mono text-sm text-abc-gray-text">HK${total()}</span>
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.12em] text-abc-gray-mid uppercase mb-4">
                        {lang === "cn" ? "运费下一步计算" : "Shipping calculated next step"}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-abc-gray-subtle">
                            {lang === "cn" ? "合计" : "Total"}
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
