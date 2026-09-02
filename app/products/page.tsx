"use client";
import Link from "next/link";
import Image from "next/image";

const PRODUCTS: {
  href: string;
  imageSrc: string;
  label: string;
  sub: string;
  price: string;
  tag: string;
  imgPosition?: string;
}[] = [
  {
    href: "/products/chalkemon",
    imageSrc: "/images/chalkemon-card.png",
    label: "CHALKEMON™",
    sub: "Chalk Bag",
    price: "HK$380",
    tag: "BESTSELLER",
  },
  {
    href: "/products/tshirt",
    imageSrc: "/images/tshirt-model-burgundy-home.jpg",
    label: "ABC TEE",
    sub: "T-Shirt",
    price: "HK$280",
    tag: "LIMITED",
    imgPosition: "center",
  },
  {
    href: "/products/brush",
    imageSrc: "/photos-brush/brush-01.jpg",
    label: "ABC BRUSH",
    sub: "Electric Chalk Brush",
    price: "HK$150",
    tag: "NEW",
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-[60px] max-w-[1200px] mx-auto px-6 py-24">
      <div className="mb-16">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-abc-red mb-4">
          //// Shop
        </div>
        <h1 className="text-[clamp(40px,8vw,96px)] font-black uppercase tracking-tight leading-none">
          All Products
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
        {PRODUCTS.map((p) => (
          <Link key={p.href} href={p.href} className="no-underline block">
            <div className="product-card bg-abc-gray-card border border-abc-gray-line flex flex-col cursor-pointer overflow-hidden">
              <div className="relative aspect-[4/5] bg-abc-black overflow-hidden">
                <div className="absolute top-4 right-4 bg-abc-red text-white font-mono text-[9px] tracking-[0.2em] px-2 py-1 uppercase z-10">
                  {p.tag}
                </div>
                <Image
                  src={p.imageSrc}
                  alt={p.label}
                  fill
                  className="object-cover"
                  style={p.imgPosition ? { objectPosition: p.imgPosition } : undefined}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#444] uppercase mb-1">
                  {p.sub}
                </div>
                <div className="text-2xl font-bold uppercase tracking-[0.05em] mb-2 text-abc-white">
                  {p.label}
                </div>
                <div className="font-mono text-abc-red text-sm">
                  {p.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
