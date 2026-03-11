"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/lang";

const SIZES = ["S", "M", "L", "XL"];

const COLORS = [
  { id: "burgundy", name: "Burgundy", cn: "酒红", hex: "#6b1a1a", border: "#8b2a2a", img: "/images/tshirt-burgundy.jpg" },
  { id: "black", name: "Black", cn: "黑色", hex: "#1a1a1a", border: "#444", img: "/images/tshirt-black.jpg" },
  { id: "navy", name: "Navy", cn: "藏青", hex: "#1a2a4a", border: "#2a3a5a", img: "/images/tshirt-pdp.png" },
];

const FEATURES = [
  { en: "Oversized streetwear fit", cn: "宽松街头廓形" },
  { en: "Washed-out dark gray cotton", cn: "水洗做旧棉料" },
  { en: "Hand-lettered back print", cn: "手写体背印" },
  { en: "ABC logo on chest", cn: "胸前ABC logo" },
];

export default function TshirtPage() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { lang } = useLang();

  const handleAddToCart = () => {
    addItem({
      id: `tshirt-${color.id}`,
      name: "ABC TEE",
      variant: `${lang === "cn" ? color.cn : color.name} / ${size}`,
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
              {lang === "cn" ? "商店" : "Shop"}
            </Link>
            <span className="text-abc-gray-line">/</span>
            <span className="text-abc-gray-subtle">{lang === "cn" ? "短袖" : "T-Shirt"}</span>
          </div>

          <div className="relative aspect-square bg-abc-gray-card border border-abc-gray-line overflow-hidden">
            <Image
              src={color.img}
              alt="ABC T-Shirt"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-abc-red mb-4">
            //// T-Shirt · 短袖
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
            {lang === "cn"
              ? "宽松街头短袖，背面手写体「AnythingButClimbing」印花，胸前ABC logo。"
              : <>Oversized streetwear tee with the hand-lettered &quot;AnythingButClimbing&quot; print on the back. ABC logo on the front chest.</>}
          </div>

          {/* Color selector */}
          <div className="mb-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-gray-subtle mb-3">
              {lang === "cn" ? `颜色 — ${color.cn}` : `Color — ${color.name}`}
            </div>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  title={lang === "cn" ? c.cn : c.name}
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
              {lang === "cn" ? `尺码 — ${size}` : `Size — ${size}`}
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
                key={f.en}
                className="flex gap-3 pb-2.5 mb-2.5 border-b border-abc-gray-line font-mono text-xs tracking-[0.1em] text-[#888] uppercase"
              >
                <span className="text-abc-red">+</span>
                {lang === "cn" ? f.cn : f.en}
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
            {added
              ? (lang === "cn" ? "✓ 已加入购物车" : "✓ Added to Cart")
              : (lang === "cn" ? "加入购物车 — HK$280" : "Add to Cart — HK$280")}
          </button>

          <div className="font-mono text-[10px] tracking-[0.15em] text-abc-gray-mid uppercase mt-4 text-center">
            {lang === "cn" ? "香港免运费 · 国际配送 HK$120起" : "Free shipping HK · Worldwide from HK$120"}
          </div>
        </div>
      </section>
    </div>
  );
}
