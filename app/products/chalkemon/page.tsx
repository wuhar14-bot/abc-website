"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/lang";

const COLORWAYS = [
  {
    id: "sooty-boo",
    name: "Sooty Boo",
    cn: "煤球精灵",
    color: "#1a1a1a",
    border: "#444",
    price: 380,
    photos: [
      "/images/chalkemon-pdp.png",
      "/images/chalkemon-card.png",
    ],
  },
  {
    id: "muddy-buddy",
    name: "Muddy Buddy",
    cn: "泥巴精灵",
    color: "#8B6914",
    border: "#c49a2a",
    price: 420,
    photos: ["/images/chalkemon-pdp.png"],
  },
  {
    id: "dolong-odo",
    name: "Dolong Odo",
    cn: "石笋精灵",
    color: "#c8c5c0",
    border: "#888",
    price: 420,
    photos: ["/images/chalkemon-pdp.png"],
  },
];

const FEATURES = [
  { en: "Handcrafted & One-of-a-Kind", cn: "每只都是独一无二的手工制作" },
  { en: "Stone eyes, rope-sewn mouth", cn: "石头眼睛，绳子缝的嘴" },
  { en: "2-in-1: chalk bag + hand warmer", cn: "粉袋 + 暖手器双功能" },
  { en: "Includes 6 custom heat packs", cn: "附赠6个定制暖宝宝" },
  { en: "Carabiner clip attachment", cn: "登山扣挂环，挂哪都行" },
  { en: "FUNctional — not just decoration", cn: "不是玩具，但也不只是装备" },
];

const DETAILS = [
  {
    title: "Craft",
    cn: "手工制作",
    body: {
      en: "Each Chalkemon is handmade. Stone eyes, rope-stitched mouth, carabiner loop. No two are exactly alike.",
      cn: "每只都是手工制作。石头眼睛，绳子缝嘴，登山扣挂环。没有两只完全一样。",
    },
  },
  {
    title: "Function",
    cn: "双重功能",
    body: {
      en: "Chalk distribution system + hand warmer. Insert a heat pack for 6+ hours of warmth during cold-weather climbing.",
      cn: "粉袋 + 暖手器双功能。塞入暖宝宝，寒冬攀岩持续保暖6小时以上。",
    },
  },
  {
    title: "Includes",
    cn: "套装内容",
    body: {
      en: "1× Chalkemon body, 6× custom heat packs, carabiner clip, special packaging.",
      cn: "1× Chalkemon 本体，6× 定制暖宝宝，登山扣，特别包装。",
    },
  },
];

export default function ChalkemonPage() {
  const [selected, setSelected] = useState(COLORWAYS[0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [added, setAdded] = useState(false);
  const { lang } = useLang();
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
            //// {lang === "cn" ? "粉袋精灵" : "Chalk Bag"}
          </div>

          <h1 className="text-[clamp(36px,5vw,64px)] font-black uppercase tracking-tight leading-none mb-2">
            CHALKEMON™
          </h1>

          <div className="font-mono text-[13px] text-abc-gray-subtle tracking-[0.1em] mb-1">
            {lang === "cn" ? "陪你非爬不可的小毛球" : "Your chalk bag companion."}
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
              {lang === "cn"
                ? `颜色版本 — ${selected.cn}`
                : `Colorway — ${selected.name}`}
            </div>
            <div className="flex gap-2.5">
              {COLORWAYS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorwayChange(c)}
                  title={lang === "cn" ? c.cn : c.name}
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
            {lang === "cn"
              ? "Chalkemon 是手工制作的粉袋精灵——毛茸茸、暖烘烘，每一只都是独一无二的。石头眼睛，绳子缝的嘴，内置暖手器。"
              : "Chalkemon is a handcrafted chalk bag companion — fuzzy, warm, and completely one-of-a-kind. Each one features stone eyes, a rope-sewn mouth, and a built-in hand warmer."}
          </div>

          {/* Features */}
          <div className="mb-8">
            {FEATURES.map((f) => (
              <div
                key={f.en}
                className="flex gap-2.5 pb-2.5 mb-2.5 border-b border-abc-gray-dark"
              >
                <span className="text-abc-red font-mono flex-shrink-0 mt-0.5">+</span>
                <div className="font-mono text-[11px] tracking-[0.1em] text-[#ccc] uppercase">
                  {lang === "cn" ? f.cn : f.en}
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
          {lang === "cn" ? "//// 它到底是什么？" : "//// What is it, exactly?"}
        </div>
        <div className="text-[clamp(16px,2.5vw,22px)] leading-relaxed text-abc-gray-text max-w-[680px] mx-auto">
          {lang === "cn" ? (
            <>
              <p className="mb-5">
                它不是专业装备，<br />
                也不只是装饰品——<br />
                它是一个毛茸茸、会发热的小东西。
              </p>
              <p className="mb-5">
                眼睛是石头做的。<br />
                嘴是绳子缝的。<br />
                它会微笑——然后默默评判你的动作序列。
              </p>
              <p className="text-abc-gray-subtle">
                我们也没办法解释它到底是干嘛的。<br />
                就像无法解释一个人为什么<span className="text-abc-red">非爬不可</span>。
              </p>
            </>
          ) : (
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
          )}
        </div>
      </section>

      {/* ═══ PHOTO GRID ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <SectionHeader label="In the Wild" cn="使用场景" lang={lang} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 mt-8">
          {[
            "/photos/DSC01215.png",
            "/photos/DSC01234.png",
            "/photos/DSC01246.png",
            "/photos/DSC01252.png",
            "/photos/DSC01270.png",
            "/photos/DSC01277.png",
          ].map((src) => (
            <div key={src} className="relative aspect-[3/4] bg-abc-gray-card overflow-hidden">
              <Image src={src} alt="Chalkemon in use" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DETAILS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <SectionHeader label="Product Details" cn="产品细节" lang={lang} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-8">
          {DETAILS.map((item) => (
            <div key={item.title} className="bg-abc-gray-card border border-abc-gray-line p-9">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-abc-red mb-4">
                {lang === "cn" ? item.cn : item.title}
              </div>
              <div className="text-[#888] text-sm leading-relaxed">
                {lang === "cn" ? item.body.cn : item.body.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COLORWAY EDITIONS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <SectionHeader label="Colorways" cn="颜色特别版" lang={lang} />
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
                {lang === "cn" ? c.cn : c.name}
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

function SectionHeader({ label, cn, lang }: { label: string; cn: string; lang: "cn" | "en" }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-abc-gray-line pb-5">
      <h2 className="text-[clamp(24px,4vw,48px)] font-black uppercase tracking-tight">
        {lang === "cn" ? cn : label}
      </h2>
    </div>
  );
}
