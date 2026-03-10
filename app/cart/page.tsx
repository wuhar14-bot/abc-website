"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import Image from "next/image";

const PRODUCT_IMAGES: Record<string, string> = {
  chalkemon: "/images/chalkemon-card.png",
  tshirt: "/images/tshirt-card.png",
};

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-[60px] min-h-screen flex flex-col items-center justify-center text-center gap-6">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-gray-mid">
          //// Your Cart
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222]">
          Empty
        </h1>
        <Link
          href="/products"
          className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[60px] max-w-[900px] mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-3">
          //// Your Cart
        </div>
        <h1 className="text-[clamp(40px,7vw,80px)] font-black uppercase tracking-tight leading-none">
          {count()} {count() === 1 ? "Item" : "Items"}
        </h1>
      </div>

      {/* Cart items */}
      <div className="border-t border-abc-gray-line mb-10">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.variant}`}
            className="flex items-center gap-4 py-6 border-b border-abc-gray-line flex-wrap"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-20 bg-abc-gray-card overflow-hidden flex-shrink-0">
              <Image
                src={PRODUCT_IMAGES[item.id] || "/images/chalkemon-card.png"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Name + variant */}
            <div className="flex-1 min-w-[120px]">
              <div className="font-bold text-base uppercase tracking-[0.05em] mb-1 text-abc-white">
                {item.name}
              </div>
              <div className="font-mono text-[11px] text-abc-gray-subtle tracking-[0.1em] uppercase">
                {item.variant}
              </div>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.id, item.variant, item.qty - 1)}
                className="w-8 h-8 bg-abc-gray-line border border-abc-gray-mid text-abc-white cursor-pointer text-base flex items-center justify-center"
              >
                −
              </button>
              <span className="font-mono text-sm min-w-6 text-center text-abc-white">
                {item.qty}
              </span>
              <button
                onClick={() => updateQty(item.id, item.variant, item.qty + 1)}
                className="w-8 h-8 bg-abc-gray-line border border-abc-gray-mid text-abc-white cursor-pointer text-base flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="font-mono text-abc-red text-base min-w-20 text-right">
              HK${item.price * item.qty}
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id, item.variant)}
              className="btn-text bg-transparent border-none text-abc-gray-mid cursor-pointer font-mono text-[11px] tracking-[0.1em] uppercase"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total + checkout */}
      <div className="bg-abc-gray-card border border-abc-gray-line p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-abc-gray-subtle">
            Subtotal
          </span>
          <span className="font-mono text-xl text-abc-red font-bold">
            HK${total()}
          </span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-mid uppercase mb-6">
          Shipping calculated at checkout
        </div>
        <Link
          href="/checkout"
          className="btn-red block w-full py-5 bg-abc-red text-white border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer no-underline font-semibold text-center"
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
