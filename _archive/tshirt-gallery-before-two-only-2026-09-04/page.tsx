"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const SIZES = ["S", "M", "L", "XL"];

const GALLERY = [
  { src: "/images/tshirt/model-blue-01.jpg", alt: "ABC T-Shirt worn, front view", fit: "cover" },
  { src: "/images/tshirt/model-blue-02.jpg", alt: "ABC T-Shirt worn, close-up view", fit: "cover" },
  { src: "/images/tshirt/flat-blue-front.jpg", alt: "ABC T-Shirt laid flat, front view", fit: "contain" },
  { src: "/images/tshirt/flat-blue-detail.jpg", alt: "ABC T-Shirt laid flat, word mark detail", fit: "contain" },
  { src: "/images/tshirt/detail-blue-print.jpg", alt: "AnythingButClimbing word mark on ABC T-Shirt", fit: "contain" },
];

const COLORS = [
  { id: "blue", name: "Royal Blue", hex: "#1a44b8", border: "#2a55d0", img: "/images/tshirt/model-blue-01.jpg", model: true, imgPosition: "center" },
];

const FEATURES = [
  "Oversized streetwear fit",
  "Cotton + Sorona blend, soft & wrinkle-resistant",
  "AnythingButClimbing word-mark print",
  "Royal Blue production colorway",
];

export default function TshirtPage() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS.find((c) => c.id === "blue") ?? COLORS[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `tshirt-${color.id}`,
      name: "ABC TEE",
      variant: `${color.name} / ${size}`,
      price: 35,
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
            $35
          </div>

          <div className="text-sm text-abc-gray-text leading-relaxed max-w-[480px] mb-8">
            Oversized streetwear tee featuring the AnythingButClimbing word mark across the chest, shown here on the production Royal Blue colorway.
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
            {added ? "✓ Added to Cart" : "Add to Cart — $35"}
          </button>

          <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-mid uppercase mt-4 text-center">
            Free shipping HK · Worldwide from $15
          </div>
        </div>
      </section>

      {/* Product photography / word-mark evidence */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 border-b border-abc-gray-line">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-abc-red mb-6">
          //// Product Photography
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {GALLERY.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] bg-abc-gray-card border border-abc-gray-line overflow-hidden">
              <Image src={image.src} alt={image.alt} fill className={image.fit === "contain" ? "object-contain bg-white" : "object-cover"} sizes="(max-width: 768px) 50vw, 20vw" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
