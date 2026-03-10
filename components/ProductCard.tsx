"use client";
import Link from "next/link";
import { ShoppingCart, MapPin } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/data/types";

interface Props {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: Props) {
  const { addItem } = useCartStore();

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0] ?? "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isJustListed && (
            <span className="badge-new">Just Listed</span>
          )}
          {product.isLocalPickup && (
            <span className="badge-pickup flex items-center gap-1">
              <MapPin size={10} /> Local Pickup
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-body font-semibold text-charcoal text-sm leading-tight line-clamp-2 flex-1">
          {product.title}
        </h3>

        <p className="text-charcoal/50 text-xs font-body mt-1 mb-3">
          {product.condition}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-heading text-2xl text-navy">
            ${product.price.toFixed(2)}
          </span>

          {showAddToCart && (
            <button
              onClick={() =>
                addItem(
                  product,
                  product.isLocalPickup ? "local_pickup" : "ship"
                )
              }
              className="bg-orange text-white p-2 rounded-lg hover:bg-orange/90
                         active:scale-95 transition-all duration-150"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
