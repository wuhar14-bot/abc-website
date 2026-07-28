"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const SIZES = ["S", "M", "L", "XL"];

const COLORS = [
  { id: "black", name: "Black", hex: "#1a1a1a", border: "#444", img: "/images/tshirt-model-black.jpg", model: true, imgPosition: "center 26%" },
  { id: "burgundy", name: "Burgundy", hex: "#6b1a1a", border: "#8b2a2a", img: "/images/tshirt-burgundy-5_focus.jpg", model: true, imgPosition: "center" },
  { id: "navy", name: "Navy", hex: "#1a2a4a", border: "#2a3a5a", img: "/images/tshirt-spec-navy.png" },
  { id: "armygreen", name: "Army Green", hex: "#3d4a2a", border: "#556b3a", img: "/images/tshirt-spec-armygreen.png" },
  { id: "blue", name: "Royal Blue", hex: "#1a44b8", border: "#2a55d0", img: "/images/tshirt-spec-blue.png" },
  { id: "lightblue", name: "Sky Blue", hex: "#a9c9e8", border: "#c0d8f0", img: "/images/tshirt-spec-lightblue.png" },
  { id: "gray", name: "Heather Gray", hex: "#8a8a8a", border: "#a0a0a0", img: "/images/tshirt-spec-gray.png" },
  { id: "lightgray", name: "Light Gray", hex: "#d0d0d0", border: "#e0e0e0", img: "/images/tshirt-spec-lightgray.png" },
  { id: "apricot", name: "Apricot", hex: "#ede4cf", border: "#f0e8d8", img: "/images/tshirt-spec-apricot.png" },
  { id: "pink", name: "Pink", hex: "#f0c4cc", border: "#f5d5db", img: "/images/tshirt-spec-pink.png" },
];

const FEATURES = [
  "Oversized streetwear fit",
  "Cotton + Sorona blend, soft & wrinkle-resistant",
  "Hand-lettered back print",
  "10 colorways available",
];

export default function TshirtPage() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `tshirt-${color.id}`,
      name: "ABC TEE",
      variant: `${color.name} / ${size}`,
      price: 280,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-[60px] min-h-screen">
      <section className="product-grid border-b border-abc-gray-line px-6 py-16 max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-center">
        {/* Left: image */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-6 flex gap-2">
            <Link href="/products" className="nav-link text-abc-gray-mid no-underline">
              Shop
            </Link>
            <span className="text-abc-gray-line">/</span>
            <span className="text-abc-gray-subtle">T-Shirt</span>
          </div>

          <div
            className={`relative aspect-square border border-abc-gray-line overflow-hidden ${
              "model" in color && color.model ? "bg-abc-black" : "bg-white"
            }`}
          >
            <Image
              src={color.img}
              alt={`ABC T-Shirt — ${color.name}`}
              fill
              className={"model" in color && color.model ? "object-cover" : "object-contain"}
              style={"imgPosition" in color && color.imgPosition ? { objectPosition: color.imgPosition } : undefined}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-4">
            //// T-Shirt
          </div>

          <h1 className="text-[clamp(40px,6vw,72px)] font-black uppercase tracking-tight leading-none mb-2">
            ABC TEE
          </h1>

          <div className="font-mono text-[11px] tracking-[0.1em] text-abc-gray-subtle uppercase mb-4">
            AnythingButClimbing
          </div>

          <div className="font-mono text-2xl text-abc-red mb-8">
            HK$280
          </div>

          <div className="text-sm text-abc-gray-text leading-relaxed max-w-[480px] mb-8">
            Oversized streetwear tee with the hand-lettered &quot;AnythingButClimbing&quot; print on the back. ABC logo on the front chest.
          </div>

          {/* Color selector */}
          <div className="mb-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-3">
              {`Color — ${color.name}`}
            </div>
            <div className="flex gap-3 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  title={c.name}
                  className="w-8 h-8 rounded-full cursor-pointer outline-none"
                  style={{
                    background: c.hex,
                    border: color.id === c.id ? `2px solid #e63232` : `2px solid ${c.border}`,
                    boxShadow: color.id === c.id ? "0 0 0 2px #e63232" : "none",
                    transition: "box-shadow 150ms ease, border-color 150ms ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-3">
              {`Size — ${size}`}
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="w-12 h-12 font-mono text-xs tracking-[0.1em] cursor-pointer outline-none font-semibold"
                  style={{
                    background: size === s ? "#e63232" : "transparent",
                    border: size === s ? "2px solid #e63232" : "2px solid #333",
                    color: size === s ? "#fff" : "#aaa",
                    transition: "border-color 150ms ease, background 150ms ease, color 150ms ease",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
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
            {added ? "✓ Added to Cart" : "Add to Cart — HK$280"}
          </button>

          <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-mid uppercase mt-4 text-center">
            Free shipping HK · Worldwide from HK$120
          </div>
        </div>
      </section>
    </div>
  );
}
