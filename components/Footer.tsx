"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#222] py-12 px-6 mt-20 font-mono text-[11px] tracking-[0.12em] uppercase text-abc-gray-subtle">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-8">
        {/* Brand */}
        <div>
          <div className="mb-2">
            <Image src="/images/logo.png" alt="ABC" height={36} width={90} className="object-contain" />
          </div>
          <div className="text-[#444]">AnythingButClimbing™</div>
        </div>

        {/* 3-column links — Decision #7 */}
        <div className="flex gap-12 flex-wrap">
          {/* Shop */}
          <div>
            <div className="text-abc-gray-subtle mb-3">Shop</div>
            {[
              ["Chalkemon", "/products/chalkemon"],
              ["T-Shirt", "/products/tshirt"],
              ["ABC Brush", "/products/brush"],
              ["All Products", "/products"],
            ].map(([label, href]) => (
              <div key={href} className="mb-2">
                <Link
                  href={href}
                  className="footer-link text-abc-gray-text no-underline"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Info */}
          <div>
            <div className="text-abc-gray-subtle mb-3">Info</div>
            {[
              ["About", "/about"],
              ["Contact", "mailto:hello@anythingbutclimbing.com"],
            ].map(([label, href]) => (
              <div key={href} className="mb-2">
                <Link
                  href={href}
                  className="footer-link text-abc-gray-text no-underline"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Social — Decision #7: third column */}
          <div>
            <div className="text-abc-gray-subtle mb-3">Social</div>
            <div className="mb-2">
              <a
                href="https://instagram.com/anything_but_climbing"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-abc-gray-text no-underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto mt-8 border-t border-abc-gray-line pt-6 text-abc-gray-mid">
        © 2025 AnythingButClimbing. All rights reserved.
      </div>
    </footer>
  );
}
