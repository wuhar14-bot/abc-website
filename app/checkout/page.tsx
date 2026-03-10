"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const PRODUCT_IMAGES: Record<string, string> = {
    chalkemon: "/images/chalkemon-card.png",
    tshirt: "/images/tshirt-card.png",
};

const STEPS = ["Shipping", "Payment", "Confirm"];

export default function CheckoutPage() {
    const { items, total, count } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [placed, setPlaced] = useState(false);

    // Redirect if cart is empty (client-side only)
    useEffect(() => {
        if (items.length === 0 && !placed) {
            router.push("/products");
        }
    }, [items.length, placed, router]);

    // Form fields (static/fake)
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        card: "",
        expiry: "",
        cvv: "",
    });

    const updateField = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            setPlaced(true);
        }
    };

    const ctaLabels = ["Next: Payment →", "Next: Confirm →", "Place Order →"];

    if (placed) {
        return (
            <div className="pt-[60px] min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red">
          //// Order Placed
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tight text-abc-white">
                    Thank You!
                </h1>
                <p className="font-mono text-sm text-abc-gray-text tracking-[0.1em] max-w-md">
                    Your order has been placed successfully. You&apos;ll receive a confirmation email shortly.
                </p>
                <Link
                    href="/"
                    className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="pt-[60px] max-w-[1200px] mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-3">
          //// Checkout
                </div>
                <h1 className="text-[clamp(32px,5vw,56px)] font-black uppercase tracking-tight leading-none">
                    Checkout
                </h1>
            </div>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-start">
                {/* LEFT — Multi-step form */}
                <div>
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-10">
                        {STEPS.map((label, i) => (
                            <div key={label} className="flex items-center gap-3">
                                {i > 0 && <div className="w-8 h-[1px] bg-abc-gray-line" />}
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${i <= step ? "bg-abc-red" : "bg-abc-gray-mid"
                                            }`}
                                    />
                                    <span
                                        className={`font-mono text-[10px] tracking-[0.15em] uppercase ${i <= step ? "text-abc-white" : "text-abc-gray-mid"
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step 0: Shipping */}
                    {step === 0 && (
                        <div className="flex flex-col gap-4">
                            <FormField
                                label="Full Name"
                                value={form.name}
                                onChange={(v) => updateField("name", v)}
                                placeholder="John Smith"
                            />
                            <FormField
                                label="Address"
                                value={form.address}
                                onChange={(v) => updateField("address", v)}
                                placeholder="123 Climbing Street"
                            />
                            <FormField
                                label="City"
                                value={form.city}
                                onChange={(v) => updateField("city", v)}
                                placeholder="Hong Kong"
                            />
                            <FormField
                                label="Phone"
                                value={form.phone}
                                onChange={(v) => updateField("phone", v)}
                                placeholder="+852 9123 4567"
                            />
                        </div>
                    )}

                    {/* Step 1: Payment */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4">
                            <FormField
                                label="Card Number"
                                value={form.card}
                                onChange={(v) => updateField("card", v)}
                                placeholder="4242 4242 4242 4242"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Expiry"
                                    value={form.expiry}
                                    onChange={(v) => updateField("expiry", v)}
                                    placeholder="12/28"
                                />
                                <FormField
                                    label="CVV"
                                    value={form.cvv}
                                    onChange={(v) => updateField("cvv", v)}
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Confirm */}
                    {step === 2 && (
                        <div>
                            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-4">
                                Review Your Order
                            </div>
                            <div className="bg-abc-gray-dark border border-abc-gray-line p-6 mb-4">
                                <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-subtle uppercase mb-3">
                                    Shipping to
                                </div>
                                <div className="text-sm text-abc-gray-text leading-relaxed">
                                    {form.name || "—"}<br />
                                    {form.address || "—"}<br />
                                    {form.city || "—"}<br />
                                    {form.phone || "—"}
                                </div>
                            </div>
                            <div className="bg-abc-gray-dark border border-abc-gray-line p-6">
                                <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-subtle uppercase mb-3">
                                    Payment
                                </div>
                                <div className="text-sm text-abc-gray-text">
                                    Card ending in {form.card ? form.card.slice(-4) : "••••"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA button */}
                    <div className="mt-8 flex gap-3">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="btn-outline border border-abc-gray-mid text-abc-gray-text px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase cursor-pointer bg-transparent"
                            >
                                ← Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="btn-red flex-1 py-4 bg-abc-red text-white border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer font-semibold"
                        >
                            {ctaLabels[step]}
                        </button>
                    </div>
                </div>

                {/* RIGHT — Order Summary */}
                <div className="bg-abc-gray-card border-l border-abc-gray-line p-6 md:p-8 md:sticky md:top-[84px]">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-6">
                        Order Summary
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-4 mb-6">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.variant}`}
                                className="flex items-center gap-3 pb-4 border-b border-abc-gray-line"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-12 h-14 bg-abc-gray-dark overflow-hidden flex-shrink-0">
                                    <Image
                                        src={PRODUCT_IMAGES[item.id] || "/images/chalkemon-card.png"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold uppercase tracking-[0.05em] text-abc-white">
                                        {item.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-abc-gray-subtle uppercase">
                                        {item.variant} × {item.qty}
                                    </div>
                                </div>
                                <div className="font-mono text-sm text-abc-gray-text">
                                    HK${item.price * item.qty}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-abc-gray-line">
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

function FormField({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
}) {
    return (
        <div>
            <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-abc-gray-subtle mb-2">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-abc-gray-dark border border-[#222] text-abc-white px-4 py-3 font-mono text-sm tracking-[0.05em] outline-none placeholder:text-abc-gray-mid focus:border-abc-red"
                style={{ transition: "border-color 150ms ease" }}
            />
        </div>
    );
}
