"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const COLORWAYS = [
  {
    id: "sooty-boo",
    name: "Sooty Boo",
    color: "#1a1a1a",
    border: "#444",
    price: 380,
    photos: [
      "/photos-web/DSC01208.jpg",
      "/photos-web/DSC01237.jpg",
      "/photos-web/DSC01266.jpg",
      "/photos-web/DSC01283.jpg",
    ],
  },
  {
    id: "muddy-buddy",
    name: "Muddy Buddy",
    color: "#8B6914",
    border: "#c49a2a",
    price: 420,
    photos: ["/photos-web/DSC01252.jpg"],
  },
  {
    id: "dolong-odo",
    name: "Dolong Odo",
    color: "#c8c5c0",
    border: "#888",
    price: 420,
    photos: ["/photos-web/DSC01256.jpg"],
  },
];

const FEATURES = [
  "Handcrafted & One-of-a-Kind",
  "Stone eyes, rope-sewn mouth",
  "2-in-1: chalk bag + hand warmer",
  "Includes 6 custom heat packs",
  "Carabiner clip attachment",
  "FUNctional — not just decoration",
];

const DETAILS = [
  {
    title: "Craft",
    body: "Each Chalkemon is handmade. Stone eyes, rope-stitched mouth, carabiner loop. No two are exactly alike.",
  },
  {
    title: "Function",
    body: "Chalk distribution system + hand warmer. Insert a heat pack for 6+ hours of warmth during cold-weather climbing.",
  },
  {
    title: "Includes",
    body: "1× Chalkemon body, 6× custom heat packs, carabiner clip, special packaging.",
  },
];

export default function ChalkemonPage() {
  const [selected, setSelected] = useState(COLORWAYS[0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: "chalkemon",
      name: "CHALKEMON™",
      variant: selected.name,
      price: selected.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleColorwayChange = (c: typeof COLORWAYS[0]) => {
    setSelected(c);
    setActivePhoto(0);
  };

  return (
    <div className="pt-[60px] min-h-screen">
      {/* ═══ PDP Hero ═══ */}
      <section className="product-grid border-b border-abc-gray-line px-6 py-16 max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-start">
        {/* Left: photo gallery */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-6 flex gap-2">
            <Link href="/products" className="nav-link text-abc-gray-mid no-underline">Shop</Link>
            <span className="text-abc-gray-line">/</span>
            <span className="text-abc-gray-subtle">Chalkemon</span>
          </div>

          <div className="relative aspect-[3/4] bg-abc-gray-card border border-abc-gray-line overflow-hidden mb-2">
            <Image
              src={selected.photos[activePhoto] ?? selected.photos[0]}
              alt={`Chalkemon ${selected.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {selected.photos.length > 1 && (
            <div className="flex gap-1">
              {selected.photos.map((photo, i) => (
                <button
                  key={photo}
                  onClick={() => setActivePhoto(i)}
                  className={`relative w-[72px] aspect-square bg-abc-gray-card overflow-hidden cursor-pointer p-0 border-2 ${activePhoto === i ? "border-abc-red" : "border-abc-gray-line"}`}
                  style={{ transition: "border-color 150ms ease" }}
                >
                  <Image src={photo} alt="" fill className="object-cover" sizes="72px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: product info */}
        <div className="pt-2">
          {/* Label */}
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-3">
            //// Chalk Bag
          </div>

          <h1 className="text-[clamp(36px,5vw,64px)] font-black uppercase tracking-tight leading-none mb-2">
            CHALKEMON™
          </h1>

          <div className="font-mono text-[13px] text-abc-gray-subtle tracking-[0.1em] mb-1">
            Your chalk bag companion.
          </div>

          <div className="font-mono text-[26px] text-abc-red mb-8 font-bold">
            HK${selected.price}
            {selected.id !== "sooty-boo" && (
              <span className="text-xs text-abc-gray-subtle ml-2">Limited Edition</span>
            )}
          </div>

          {/* Colorway selector */}
          <div className="mb-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-3">
              {`Colorway — ${selected.name}`}
            </div>
            <div className="flex gap-2.5">
              {COLORWAYS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorwayChange(c)}
                  title={c.name}
                  className="w-9 h-9 rounded-full cursor-pointer outline-none"
                  style={{
                    background: c.color,
                    border: selected.id === c.id ? "2px solid #e63232" : `2px solid ${c.border}`,
                    transition: "border-color 150ms ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 text-sm text-abc-gray-text leading-relaxed max-w-[480px]">
            Chalkemon is a handcrafted chalk bag companion — fuzzy, warm, and completely one-of-a-kind. Each one features stone eyes, a rope-sewn mouth, and a built-in hand warmer.
          </div>

          {/* Features */}
          <div className="mb-8">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="flex gap-2.5 pb-2.5 mb-2.5 border-b border-abc-gray-dark"
              >
                <span className="text-abc-red font-mono flex-shrink-0 mt-0.5">+</span>
                <div className="font-mono text-[11px] tracking-[0.1em] text-[#ccc] uppercase">
                  {f}
                </div>
              </div>
            ))}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="btn-red w-full py-[18px] border-none font-mono text-[13px] tracking-[0.25em] uppercase cursor-pointer font-semibold mb-3 text-white"
            style={{
              background: added ? "#1a5c1a" : "#e63232",
              transition: "background 150ms ease",
            }}
          >
            {added ? "✓ Added to Cart" : `Add to Cart — HK$${selected.price}`}
          </button>

          <div className="font-mono text-[10px] tracking-[0.12em] text-abc-gray-mid uppercase text-center">
            Free shipping HK · Worldwide from HK$120
          </div>
        </div>
      </section>

      {/* ═══ BRAND COPY ═══ */}
      <section className="border-b border-abc-gray-line py-20 px-6 max-w-[900px] mx-auto text-center">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-8">
          //// What is it, exactly?
        </div>
        <div className="text-[clamp(16px,2.5vw,22px)] leading-relaxed text-abc-gray-text max-w-[680px] mx-auto">
          <>
            <p className="mb-5">
              It&apos;s not professional equipment,<br />
              nor just decoration —<br />
              it&apos;s a fluffy, heat-emitting little spirit.
            </p>
            <p className="mb-5">
              Its eyes are made of stone.<br />
              Its mouth is sewn from rope.<br />
              It smiles — and judges your beta in silence.
            </p>
            <p className="text-abc-gray-subtle">
              We can&apos;t really explain what it does.<br />
              Just like we can&apos;t explain why climbers <span className="text-abc-red">must</span> climb.
            </p>
          </>
        </div>
      </section>

      {/* ═══ PHOTO GRID ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <SectionHeader label="In the Wild" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 mt-8">
          {[
            "/photos-web/DSC01215.jpg",
            "/photos-web/DSC01234.jpg",
            "/photos-web/DSC01246.jpg",
            "/photos-web/DSC01252.jpg",
            "/photos-web/DSC01270.jpg",
            "/photos-web/DSC01277.jpg",
          ].map((src) => (
            <div key={src} className="relative aspect-[3/4] bg-abc-gray-card overflow-hidden">
              <Image src={src} alt="Chalkemon in use" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DETAILS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <SectionHeader label="Product Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-8">
          {DETAILS.map((item) => (
            <div key={item.title} className="bg-abc-gray-card border border-abc-gray-line p-9">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-red mb-4">
                {item.title}
              </div>
              <div className="text-[#888] text-sm leading-relaxed">
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COLORWAY EDITIONS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <SectionHeader label="Colorways" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 mt-8">
          {COLORWAYS.map((c) => (
            <div
              key={c.id}
              onClick={() => handleColorwayChange(c)}
              className="product-card bg-abc-gray-card border border-abc-gray-line p-9 cursor-pointer"
              style={{ borderColor: selected.id === c.id ? "#e63232" : undefined }}
            >
              <div
                className="w-14 h-14 rounded-full mb-5"
                style={{ background: c.color, border: `2px solid ${c.border}` }}
              />
              <div className="font-bold uppercase tracking-[0.05em] mb-1 text-abc-white">
                {c.name}
              </div>
              <div className="font-mono text-xs text-abc-red mt-2">
                HK${c.price}
                {c.id !== "sooty-boo" && (
                  <span className="text-[10px] text-abc-gray-subtle ml-2">Limited</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-abc-gray-line pb-5">
      <h2 className="text-[clamp(24px,4vw,48px)] font-black uppercase tracking-tight">
        {label}
      </h2>
    </div>
  );
}
