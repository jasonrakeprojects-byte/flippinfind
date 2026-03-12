import { fetchLocalPickupListings, EbayItem } from "@/lib/ebay";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Pickup Only — Iron Ridge, WI",
  description:
    "Large furniture and big items available for local pickup in Iron Ridge, Wisconsin. Message for appointment.",
};

export const revalidate = 3600; // refresh every hour

function EbayItemCard({ item }: { item: EbayItem }) {
  return (
    <a
      href={item.itemWebUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl shadow-sm border border-charcoal/10 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="aspect-square bg-cream overflow-hidden">
        {item.image?.imageUrl ? (
          <img
            src={item.image.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-sm">
            No photo
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-body text-sm text-charcoal line-clamp-2 flex-1">{item.title}</p>
        {item.condition && (
          <span className="text-xs text-charcoal/50">{item.condition}</span>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-heading text-lg text-navy">
            ${parseFloat(item.price?.value ?? "0").toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-xs text-orange font-body">
            View on eBay <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

export default async function LocalPickupPage() {
  const items = await fetchLocalPickupListings();

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-navy">
          Available for Pickup {items.length > 0 && `(${items.length} items)`}
        </h2>
        {items.length > 0 && (
          <p className="font-body text-sm text-charcoal/50">Updated hourly from eBay</p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <EbayItemCard key={item.itemId} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-charcoal/50">
          <p className="font-heading text-2xl mb-2">No local items right now</p>
          <p className="font-body">Check back when I hit a new haul — new items are added whenever I restock!</p>
        </div>
      )}
    </div>
  );
}
