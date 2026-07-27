"use client";
import Link from "next/link";
import Image from "next/image";
import HeroBrandImage from "@/components/HeroBrandImage";
import { useLang } from "@/lib/lang";

export default function Home() {
  const { lang } = useLang();
  const cn = lang === "cn";

  return (
    <div className="pt-[60px]">
      {/* ═══ HERO ═══ */}
      <section className="min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden border-b border-abc-gray-line">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative red slashes */}
        <div className="absolute top-[15%] left-[8%] font-mono text-5xl text-abc-red opacity-25 tracking-[-0.1em]">
          ////
        </div>
        <div className="absolute bottom-[20%] right-[8%] font-mono text-5xl text-abc-red opacity-25 tracking-[-0.1em]">
          ////
        </div>

        <div className="relative z-10 max-w-[800px]">
          <div
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-8 opacity-0"
            style={{ animation: "fadeIn 0.6s ease 2.7s forwards" }}
          >
            {cn ? "— 新品上架 —" : "— New Drop Available —"}
          </div>

          <HeroBrandImage />

          <p
            className="font-mono text-[13px] tracking-[0.2em] uppercase text-abc-gray-subtle max-w-[420px] mx-auto mb-12 leading-relaxed opacity-0"
            style={{ animation: "fadeIn 0.6s ease 2.7s forwards" }}
          >
            {cn ? (
              <>
                Oddly useful. Always FUNctional.
                <br />
                认识 Chalkemon 粉袋精灵。
              </>
            ) : (
              <>
                Oddly useful. Always FUNctional.
                <br />
                Meet Chalkemon — your chalk bag companion.
              </>
            )}
          </p>

          <div
            className="flex gap-4 justify-center flex-wrap opacity-0"
            style={{ animation: "fadeIn 0.6s ease 2.9s forwards" }}
          >
            <Link
              href="/products/chalkemon"
              className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold inline-block"
            >
              {cn ? "入手 Chalkemon" : "Shop Chalkemon"}
            </Link>
            <Link
              href="/about"
              className="btn-outline border border-abc-gray-mid text-abc-gray-text px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline inline-block"
            >
              {cn ? "我们的故事" : "Our Story"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-abc-red py-3 overflow-hidden whitespace-nowrap">
        <div
          className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-white"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {Array(8)
            .fill("ODDLY USEFUL. ALWAYS FUN-CTIONAL. ★ #HOPELESSLYOBSESSED ★ ")
            .join("")}
        </div>
      </div>

      {/* ═══ PRODUCTS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="mb-16 flex justify-between items-end flex-wrap gap-4">
          <h2 className="text-[clamp(32px,6vw,72px)] font-black uppercase tracking-tight leading-none">
            <span className="text-abc-red font-mono text-xs tracking-[0.2em] block mb-2">
              //// {cn ? "新品上架" : "NEW DROP"}
            </span>
            {cn ? "本季系列" : "The Collection"}
          </h2>
          <Link
            href="/products"
            className="nav-link font-mono text-[11px] tracking-[0.2em] uppercase text-abc-gray-subtle no-underline"
          >
            {cn ? "查看全部 →" : "View All →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          <ProductCard
            href="/products/chalkemon"
            imageSrc="/images/chalkemon-card.png"
            label="CHALKEMON™"
            sub={cn ? "粉袋精灵" : "Chalk Bag"}
            price="HK$380"
            tag={cn ? "热销" : "BESTSELLER"}
          />
          <ProductCard
            href="/products/tshirt"
            imageSrc="/images/tshirt-model-burgundy-home.jpg"
            label="ABC TEE"
            sub={cn ? "短袖" : "T-Shirt"}
            price="HK$280"
            tag={cn ? "限量" : "LIMITED"}
            imgPosition="center 72%"
          />
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="border-t border-abc-gray-line">
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/images/chalkemon-pdp.png"
            alt="Chalkemon chalk bag"
            fill
            className="object-cover object-center opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-6">
              //// {cn ? "品牌宣言" : "Manifesto"}
            </div>
            <blockquote className="text-[clamp(20px,4vw,42px)] font-bold max-w-[800px] leading-snug mb-8">
              Oddly useful.
              <br />
              <span className="text-abc-red">Always FUNctional.</span>
            </blockquote>
            <Link
              href="/about"
              className="nav-link font-mono text-[11px] tracking-[0.2em] uppercase text-abc-gray-subtle no-underline border-b border-abc-gray-mid pb-0.5"
            >
              {cn ? "了解我们 →" : "Read Our Story →"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Product Card Component ─── */
function ProductCard({
  href,
  imageSrc,
  label,
  sub,
  price,
  tag,
  imgPosition = "center",
}: {
  href: string;
  imageSrc: string;
  label: string;
  sub: string;
  price: string;
  tag: string;
  imgPosition?: string;
}) {
  return (
    <Link href={href} className="no-underline block">
      <div className="product-card bg-abc-gray-card border border-abc-gray-line flex flex-col cursor-pointer overflow-hidden">
        <div className="relative aspect-[4/5] bg-abc-black overflow-hidden">
          <div className="absolute top-4 right-4 bg-abc-red text-white font-mono text-[9px] tracking-[0.2em] px-2 py-1 uppercase z-10">
            {tag}
          </div>
          <Image
            src={imageSrc}
            alt={label}
            fill
            className="object-cover"
            style={{ objectPosition: imgPosition }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#444] uppercase mb-1">
            {sub}
          </div>
          <div className="text-[22px] font-bold uppercase tracking-[0.05em] mb-2 text-abc-white">
            {label}
          </div>
          <div className="font-mono text-abc-red text-sm">
            {price}
          </div>
        </div>
      </div>
    </Link>
  );
}
