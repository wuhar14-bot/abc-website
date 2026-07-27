"use client";
import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="pt-[60px] min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-mid">
                //// Payment Cancelled
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#ccc]">
                No Charge Made
            </h1>
            <p className="font-mono text-sm text-abc-gray-text tracking-[0.1em] max-w-md leading-relaxed">
                You cancelled the payment. Your cart is still saved — come back whenever you&apos;re ready.
            </p>
            <Link
                href="/cart"
                className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
            >
                Back to Cart
            </Link>
        </div>
    );
}
