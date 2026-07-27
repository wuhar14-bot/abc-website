"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function SuccessPage() {
    const { clear } = useCart();

    // Payment succeeded — empty the cart so it's not re-submitted.
    useEffect(() => {
        clear();
    }, [clear]);

    return (
        <div className="pt-[60px] min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red">
                //// Order Placed
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-abc-white">
                Thank You!
            </h1>
            <p className="font-mono text-sm text-abc-gray-text tracking-[0.1em] max-w-md leading-relaxed">
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
