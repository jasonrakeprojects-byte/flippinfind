import ProductCard from "@/components/ProductCard";
import { seedProducts } from "@/data/products";
import { MapPin, Clock, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Pickup Only — Iron Ridge, WI",
  description:
    "Large furniture and big items available for local pickup in Iron Ridge, Wisconsin. Message for appointment.",
};

const localItems = seedProducts.filter((p) => p.isLocalPickup);

export default function LocalPickupPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="section-title">Local Pickup Only</h1>
        <p className="section-subtitle">
          Furniture, large items, and anything too big to ship. Iron Ridge, WI area.
        </p>
      </div>

      {/* Info card */}
      <div className="bg-navy text-cream rounded-2xl p-6 md:p-8 mb-10 grid md:grid-cols-3 gap-6">
        <div className="flex gap-3">
          <MapPin className="text-orange shrink-0 mt-1" size={22} />
          <div>
            <h3 className="font-heading text-orange text-lg mb-1">Location</h3>
            <p className="font-body text-cream/80 text-sm leading-relaxed">
              Pickup at my storage unit in Iron Ridge, Wisconsin (Dodge County).
              Exact address provided after purchase.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock className="text-orange shrink-0 mt-1" size={22} />
          <div>
            <h3 className="font-heading text-orange text-lg mb-1">Hours</h3>
            <p className="font-body text-cream/80 text-sm leading-relaxed">
              By appointment only. Weekends preferred. Message after checkout to
              schedule your pickup time.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Phone className="text-orange shrink-0 mt-1" size={22} />
          <div>
            <h3 className="font-heading text-orange text-lg mb-1">Contact</h3>
            <p className="font-body text-cream/80 text-sm leading-relaxed">
              Questions before buying? Use the contact page or message me
              directly — I always respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Map embed */}
      <div className="rounded-2xl overflow-hidden mb-10 shadow-md h-64">
        <iframe
          src="https://maps.google.com/maps?q=Iron+Ridge,+WI+53035&z=13&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          title="Iron Ridge, Wisconsin map"
        />
      </div>

      {/* Items */}
      <h2 className="font-heading text-2xl text-navy mb-6">
        Available for Pickup ({localItems.length} items)
      </h2>

      {localItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {localItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-charcoal/50">
          <p className="font-heading text-2xl mb-2">No local items right now</p>
          <p className="font-body">Check back after the next weekend haul!</p>
        </div>
      )}
    </div>
  );
}
