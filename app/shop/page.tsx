"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { seedProducts, categories } from "@/data/products";
import type { Product } from "@/data/types";
import { SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [pickupOnly, setPickupOnly] = useState(false);
  const [justListed, setJustListed] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    // Fetch live eBay products from our API route
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data as Product[]))
      .catch(() => {
        // Fall back to seed data silently
      });
  }, []);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => !pickupOnly || p.isLocalPickup)
    .filter((p) => !justListed || p.isJustListed)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">Shop All Finds</h1>
        <p className="section-subtitle">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-wrap gap-4 items-center">
        <SlidersHorizontal size={18} className="text-navy" />

        {/* Category */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-body font-medium transition-all
                ${activeCategory === cat
                  ? "bg-navy text-white"
                  : "bg-cream text-charcoal hover:bg-orange hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex gap-3 ml-auto flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-body">
            <input
              type="checkbox"
              checked={pickupOnly}
              onChange={(e) => setPickupOnly(e.target.checked)}
              className="accent-orange"
            />
            Local Pickup Only
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-body">
            <input
              type="checkbox"
              checked={justListed}
              onChange={(e) => setJustListed(e.target.checked)}
              className="accent-orange"
            />
            Just Listed
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-body border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-charcoal/50">
          <p className="font-heading text-2xl mb-2">No items found</p>
          <p className="font-body">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
