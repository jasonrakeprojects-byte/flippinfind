import Link from "next/link";
import { ArrowRight, MapPin, Tag, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { seedProducts } from "@/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "FlippinFind — Storage Unit Treasures & Thrift Flips, Iron Ridge WI" },
  description:
    "Fresh storage unit finds from auctions and estate sales across Wisconsin. Real finds, real prices — shop direct and skip the eBay fees.",
};

const featuredProducts = seedProducts.slice(0, 4);
const newArrivals = seedProducts.filter((p) => p.isJustListed).slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange rounded-full px-4 py-1.5 text-sm font-body font-medium mb-6">
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              Fresh haul just dropped
            </div>

            <h1 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-6">
              Storage Unit<br />
              <span className="text-orange">Treasures</span><br />
              Thrift Flips
            </h1>

            <p className="font-body text-cream/80 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              I hit storage-unit auctions and estate sales across Wisconsin
              when I need to restock. The best stuff ends up right here — real
              finds, real prices, zero middle-man markup.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/shop" className="btn-primary text-base">
                Browse the Haul <ArrowRight size={18} />
              </Link>
              <Link href="/local-pickup" className="btn-outline !border-cream !text-cream hover:!bg-cream hover:!text-navy text-base">
                <MapPin size={18} /> Local Pickup
              </Link>
            </div>
          </div>

          {/* Hero decorative card stack */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute top-4 left-4 w-48 h-48 bg-white/10 rounded-2xl rotate-6" />
              <div className="absolute top-8 left-8 w-48 h-48 bg-orange/20 rounded-2xl -rotate-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-2xl text-center max-w-xs">
                  <p className="font-heading text-4xl text-orange mb-2">🏷️</p>
                  <p className="font-heading text-navy text-2xl">
                    Part online thrift shop.
                  </p>
                  <p className="font-heading text-orange text-2xl mt-1">
                    Part treasure hunt.
                  </p>
                  <p className="font-body text-charcoal/60 text-sm mt-3">
                    Come dig through the latest haul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-orange py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center">
          {[
            { icon: Tag, text: "No eBay markup — buy direct" },
            { icon: MapPin, text: "Local pickup available — Iron Ridge, WI" },
            { icon: Truck, text: "Nationwide shipping via USPS" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2 font-body font-semibold text-sm">
              <Icon size={16} />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Finds ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Finds</h2>
            <p className="section-subtitle">Hand-picked from the latest haul</p>
          </div>
          <Link
            href="/shop"
            className="text-orange font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">
                Just Listed{" "}
                <span className="badge-new ml-2 text-sm align-middle">New</span>
              </h2>
              <p className="section-subtitle">
                Hot off the unit — grab it before it&apos;s gone
              </p>
            </div>
            <Link
              href="/shop?filter=just-listed"
              className="text-orange font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
            >
              See all new <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick links ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center">Explore FlippinFind</h2>
        <p className="section-subtitle text-center">
          More than just the shop
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { href: "/shop", emoji: "🛍️", label: "Shop All", desc: "Browse every item" },
            { href: "/local-pickup", emoji: "📍", label: "Local Pickup", desc: "Big items, Iron Ridge WI" },
            { href: "/music", emoji: "🎵", label: "Music", desc: "4 artists to stream" },
            { href: "/books", emoji: "📚", label: "Books", desc: "KDP titles on Amazon" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card p-6 text-center hover:border-orange group border-2 border-transparent transition-all"
            >
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <h3 className="font-heading text-navy text-lg group-hover:text-orange transition-colors">
                {item.label}
              </h3>
              <p className="text-charcoal/60 text-sm font-body mt-1">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Blog teaser ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 border-t border-charcoal/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-title">From the Haul</h2>
          <p className="section-subtitle">
            Follow along as I dig through storage units across Wisconsin
          </p>
          <Link href="/blog" className="btn-secondary">
            Read the Blog <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
