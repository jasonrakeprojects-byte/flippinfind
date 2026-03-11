import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Wisconsin Storage Unit Flipper",
  description:
    "The story behind FlippinFind. I hit storage-unit auctions and estate sales across Wisconsin when I need to restock — the best stuff ends up right here.",
};

const whyShopHere = [
  "No eBay fees passed to you — buy direct, pay less",
  "Smoke-free Wisconsin storage unit finds",
  "Real photos of the actual item you receive",
  "Honest condition descriptions — no sugarcoating",
  "Local pickup available in Iron Ridge, WI (Dodge County)",
  "Support a real person, not a warehouse operation",
  "Questions always answered within 24 hours",
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title">About FlippinFind</h1>
        <p className="text-charcoal/60 font-body text-lg">
          Storage Unit Treasures • Thrift Flips • Online Rummage Sale
        </p>
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-10">
        <h2 className="font-heading text-2xl text-orange mb-6">The Story</h2>
        <div className="font-body text-charcoal/80 leading-relaxed space-y-4 text-lg">
          <p>
            When I need to restock, I wake up early and drive out to
            storage-unit auctions and estate sales across Wisconsin — mostly in
            Dodge County and the surrounding area. The doors roll up, and
            it&apos;s like unwrapping a time capsule. You never know what&apos;s inside.
          </p>
          <p>
            The best stuff ends up right here on FlippinFind. Real finds, real
            prices, zero middle-man markup. I take photos of the actual item,
            describe what I see honestly, and ship it to you — or you can swing
            by for local pickup in Iron Ridge.
          </p>
          <p>
            Part online thrift shop. Part neighborhood rummage sale. Part
            treasure hunt. Come dig through the latest haul.
          </p>
          <p className="text-navy font-semibold">
            — Jason, FlippinFind (Iron Ridge, WI)
          </p>
        </div>
      </div>

      {/* Why shop here */}
      <div className="bg-navy text-cream rounded-2xl p-8 md:p-12 mb-10">
        <h2 className="font-heading text-2xl text-orange mb-6">
          Why Shop Here?
        </h2>
        <ul className="space-y-3">
          {whyShopHere.map((reason) => (
            <li key={reason} className="flex items-start gap-3 font-body">
              <CheckCircle className="text-orange shrink-0 mt-0.5" size={18} />
              <span className="text-cream/90">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="font-heading text-2xl text-navy mb-4">
          Ready to dig?
        </h2>
        <p className="font-body text-charcoal/70 mb-6">
          New hauls added whenever I hit fresh units. Browse the shop or read
          the blog to follow along.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/shop" className="btn-primary">
            Browse the Shop <ArrowRight size={18} />
          </Link>
          <Link href="/blog" className="btn-outline">
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
