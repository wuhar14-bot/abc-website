"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/lang";

export default function Navbar() {
  const cartCount = useCart((s) => s.count());
  const { lang, setLang } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [drawerOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 h-[60px] flex items-center justify-between px-6 border-b border-[#222] bg-[rgba(10,10,10,0.88)] backdrop-blur-md">
        {/* Logo — left */}
        <Link href="/" className="no-underline">
          <Image src="/images/logo.png" alt="ABC" height={32} width={80} className="object-contain" />
        </Link>

        {/* Center nav: Shop · About (desktop only) */}
        <div className="hidden-mobile absolute left-1/2 -translate-x-1/2 flex gap-8 font-mono text-[11px] tracking-[0.15em] uppercase">
          <Link href="/products" className="nav-link text-abc-gray-text no-underline">
            Shop
          </Link>
          <Link href="/about" className="nav-link text-abc-gray-text no-underline">
            About
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Lang toggle */}
          <div className="flex font-mono text-[10px] tracking-[0.15em] border border-abc-gray-mid">
            <button
              onClick={() => setLang("cn")}
              className="px-2.5 py-1 cursor-pointer border-none"
              style={{ background: lang === "cn" ? "#e63232" : "transparent", color: lang === "cn" ? "#fff" : "#888" }}
            >
              CN
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-2.5 py-1 cursor-pointer border-none border-l border-abc-gray-mid"
              style={{ background: lang === "en" ? "#e63232" : "transparent", color: lang === "en" ? "#fff" : "#888" }}
            >
              EN
            </button>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="text-abc-white font-mono text-[11px] tracking-[0.1em] no-underline flex items-center gap-1.5"
          >
            <span>CART</span>
            <span className="bg-abc-red rounded-full w-4 h-4 text-[10px] flex items-center justify-center text-white">
              {cartCount}
            </span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="hidden-desktop flex flex-col justify-center items-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-[1.5px] bg-abc-white" />
            <span className="block w-5 h-[1.5px] bg-abc-white" />
            <span className="block w-5 h-[1.5px] bg-abc-white" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/60"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[201] w-[240px] bg-abc-gray-dark border-l border-abc-gray-mid flex flex-col"
        style={{
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 250ms ease",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-abc-white text-xl bg-transparent border-none cursor-pointer w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex flex-col gap-0 px-6 pt-4">
          {[
            { label: "Shop", href: "/products" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className="nav-link text-abc-gray-text no-underline font-mono text-[13px] tracking-[0.15em] uppercase py-4 border-b border-abc-gray-line"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setDrawerOpen(false)}
            className="nav-link text-abc-red no-underline font-mono text-[13px] tracking-[0.15em] uppercase py-4 border-b border-abc-gray-line"
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </>
  );
}
