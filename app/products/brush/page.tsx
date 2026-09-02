"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

// Photos are ordered by how clearly the AnythingButClimbing mark reads —
// the first two are flat-on shots where the engraving is unambiguous.
const PHOTOS = [
  "/photos-brush/brush-01.jpg",
  "/photos-brush/brush-02.jpg",
  "/photos-brush/brush-03.jpg",
  "/photos-brush/brush-04.jpg",
  "/photos-brush/brush-05.jpg",
  "/photos-brush/brush-06.jpg",
];

// Intro price in HKD — must match BRUSH_PRICE in lib/products.ts or
// checkout rejects the item as an invalid price.
const PRICE = 150;

const FEATURES = [
  "Built-in fan clears chalk dust as you brush",
  "Boar bristle head, holds shape on textured rock",
  "AnythingButClimbing engraved on the body",
  "USB-C rechargeable",
  "Contoured grip, one-handed operation",
];

export default function BrushPage() {
  const [photo, setPhoto] = useState(PHOTOS[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: "brush",
      name: "ABC BRUSH",
      variant: "Standard",
      price: PRICE,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-[60px] min-h-screen">
      <section className="product-grid border-b border-abc-gray-line px-6 py-16 max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-start">
        {/* Left: gallery */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-6 flex gap-2">
            <Link href="/products" className="nav-link text-abc-gray-mid no-underline">
              Shop
            </Link>
            <span className="text-abc-gray-line">/</span>
            <span className="text-abc-gray-subtle">Brush</span>
          </div>

          <div className="relative aspect-square bg-white border border-abc-gray-line overflow-hidden mb-2">
            <Image
              src={photo}
              alt="ABC Brush — electric climbing chalk brush"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="grid grid-cols-6 gap-2">
            {PHOTOS.map((p, i) => (
              <button
                key={p}
                onClick={() => setPhoto(p)}
                aria-label={`View photo ${i + 1}`}
                className="relative aspect-square bg-white overflow-hidden cursor-pointer p-0"
                style={{
                  border: photo === p ? "2px solid #e63232" : "1px solid #333",
                  transition: "border-color 150ms ease",
                }}
              >
                <Image
                  src={p}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-4">
            //// Brush
          </div>

          <h1 className="text-[clamp(40px,6vw,72px)] font-black uppercase tracking-tight leading-none mb-2">
            ABC BRUSH
          </h1>

          <div className="font-mono text-[11px] tracking-[0.1em] text-abc-gray-subtle uppercase mb-4">
            AnythingButClimbing
          </div>

          <div className="font-mono text-2xl text-abc-red mb-8">
            HK${PRICE}
</div>

          <div className="text-sm text-abc-gray-text leading-relaxed max-w-[480px] mb-8">
            An electric chalk brush for cleaning holds. The fan pulls loose chalk
            off the rock while you brush, so you are not just moving dust around.
            Boar bristle head, machined body with the AnythingButClimbing mark
            engraved into the side.
          </div>

          {/* Features */}
          <div className="mb-10">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="flex gap-3 pb-2.5 mb-2.5 border-b border-abc-gray-line font-mono text-xs tracking-[0.1em] text-[#888] uppercase"
              >
                <span className="text-abc-red">+</span>
                {f}
              </div>
            ))}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="btn-red w-full py-5 border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer font-semibold text-white"
            style={{
              background: added ? "#1a5c1a" : "#e63232",
              transition: "background 150ms ease",
            }}
          >
            {added ? "✓ Added to Cart" : `Add to Cart — HK$${PRICE}`}
          </button>

          <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-mid uppercase mt-4 text-center">
            Free shipping HK · Worldwide from HK$120
          </div>
        </div>
      </section>
    </div>
  );
}
