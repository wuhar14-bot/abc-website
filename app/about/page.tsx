"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";

const copy = {
  cn: {
    heroLabel: "//// About ABC",
    title: "非爬不可吗？",
    story: [
      "我们是ABC，三个沉迷攀岩到无可救药的人组成的兴趣小组。",
      "AnythingButClimbing，是我们对「非爬不可」的一种自嘲。",
      "ABC是我们生活的B面，是岩壁之外的另一种延伸。",
      "我们喜欢关注一些攀岩无用好物——不一定必要，但一定好玩，致力于为攀岩社区带来更多FUN-ctionality！",
      "让攀岩这件事，继续好玩下去。",
    ],
    chalkLabel: "//// 粉袋精灵",
    chalkBody: [
      "Chalkemon 是粉袋精灵。它不是专业装备，也不只是装饰品——它是一个毛茸茸、会发热的小东西，陪你在岩壁上熬过最冷的冬天。",
      "石头做的眼睛，绳子缝的嘴。每一只都是手工的，有时候遇到它也是缘分。我们也没办法解释它到底是干嘛的——就像无法解释清楚一个人为什么非爬不可。",
    ],
    contactLabel: "//// 找到我们",
    contactTitle: "Say Hello",
  },
  en: {
    heroLabel: "//// About ABC",
    title: "AnythingButClimbing?",
    story: [
      "We are ABC — three people hopelessly obsessed with climbing.",
      "AnythingButClimbing is our self-deprecating joke about being unable to stop.",
      "ABC is the B-side of our lives — an extension beyond the wall.",
      "We seek out the oddly useful things in climbing — not always necessary, but always FUN-ctional.",
      "Keep climbing. Keep it fun.",
    ],
    chalkLabel: "//// Meet the Mascot",
    chalkBody: [
      "Chalkemon is a handcrafted chalk bag companion — fuzzy, warm, and completely one-of-a-kind. It's not professional equipment, nor just decoration. It's a fluffy, heat-emitting little spirit that keeps you warm through the coldest sends.",
      "Stone eyes, rope-sewn mouth. Each one is handmade — sometimes finding one feels like fate. We can't really explain what it does. Just like we can't explain why climbers must climb.",
    ],
    contactLabel: "//// Find Us",
    contactTitle: "Say Hello",
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="pt-[60px]">


      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/chalkemon-pdp.png"
          alt="Chalkemon chalk bag"
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-6">
            {t.heroLabel}
          </div>
          <h1 className="text-[clamp(40px,8vw,100px)] font-black tracking-tight leading-[0.95]">
            {lang === "cn" ? (
              <>
                非爬不可吗？
              </>
            ) : (
              <>
                Anything
                <br />
                <span className="text-abc-red italic">But</span>
                <br />
                Climbing?
              </>
            )}
          </h1>
        </div>
      </section>

      {/* ═══ BRAND STORY ═══ */}
      <section className="border-b border-abc-gray-line py-24 px-6 max-w-[900px] mx-auto">
        <div className="space-y-5 max-w-[640px]">
          {t.story.map((line, i) => (
            <p
              key={i}
              className="text-[clamp(16px,2.2vw,20px)] leading-relaxed text-abc-gray-text"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ═══ CHALKEMON ═══ */}
      <section className="border-b border-abc-gray-line py-24 px-6 max-w-[900px] mx-auto">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-6">
          {t.chalkLabel}
        </div>
        <h2 className="text-[clamp(36px,7vw,80px)] font-black uppercase tracking-tight leading-none mb-8">
          CHALKEMON™
        </h2>
        {t.chalkBody.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-abc-gray-text max-w-[600px] mb-5">
            {p}
          </p>
        ))}
        <Link
          href="/products/chalkemon"
          className="btn-red inline-block bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold mt-4"
        >
          {lang === "cn" ? "入手 Chalkemon →" : "Shop Chalkemon →"}
        </Link>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="py-24 px-6 max-w-[900px] mx-auto text-center">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-6">
          {t.contactLabel}
        </div>
        <h2 className="text-[clamp(32px,6vw,64px)] font-black uppercase tracking-tight mb-8">
          {t.contactTitle}
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://instagram.com/anything_but_climbing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red bg-abc-red text-white px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline font-semibold"
          >
            @anything_but_climbing
          </a>
          <a
            href="mailto:hello@anythingbutclimbing.com"
            className="btn-outline border border-abc-gray-mid text-abc-gray-text px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase no-underline"
          >
            {lang === "cn" ? "发邮件给我们" : "Email Us"}
          </a>
        </div>
      </section>

    </div>
  );
}
