"use client";
import { useState, useEffect, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import { seedProducts } from "@/data/products";
import type { Product } from "@/data/types";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ShopResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const SORT_OPTIONS = [
  { value: "newlyListed", label: "Newest First" },
  { value: "price",       label: "Price: Low to High" },
  { value: "-price",      label: "Price: High to Low" },
  { value: "endingSoonest", label: "Ending Soon" },
];

const CONDITION_OPTIONS = [
  { value: "",         label: "Any Condition" },
  { value: "new",      label: "New" },
  { value: "preowned", label: "Pre-Owned / Used" },
];

export default function ShopPage() {
  const [products, setProducts]     = useState<Product[]>(seedProducts);
  const [total, setTotal]           = useState(seedProducts.length);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);

  // Filters
  const [sort, setSort]           = useState("newlyListed");
  const [condition, setCondition] = useState("");
  const [priceMin, setPriceMin]   = useState("");
  const [priceMax, setPriceMax]   = useState("");

  const fetchProducts = useCallback(async (currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(currentPage), sort });
      if (condition) params.set("condition", condition);
      if (priceMin)  params.set("priceMin", priceMin);
      if (priceMax)  params.set("priceMax", priceMax);

      const res  = await fetch(`/api/products?${params}`);
      const data: ShopResponse = await res.json();

      setProducts(data.products);
      setTotal(data.total);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      // keep existing products on error
    } finally {
      setLoading(false);
    }
  }, [sort, condition, priceMin, priceMax]);

  // Fetch on mount and whenever filters change (reset to page 1)
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [sort, condition, priceMin, priceMax]); // eslint-disable-line

  // Fetch when page changes
  useEffect(() => {
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]); // eslint-disable-line

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">Shop All Finds</h1>
        <p className="section-subtitle">
          {loading ? "Loading..." : `${total.toLocaleString()} items available`}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-wrap gap-4 items-end">
        <SlidersHorizontal size={18} className="text-navy self-center" />

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-body text-charcoal/50 uppercase tracking-wide">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm font-body border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-body text-charcoal/50 uppercase tracking-wide">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="text-sm font-body border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
          >
            {CONDITION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-body text-charcoal/50 uppercase tracking-wide">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-20 text-sm font-body border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <span className="text-charcoal/40 text-sm">–</span>
            <input
              type="number"
              placeholder="Max $"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-20 text-sm font-body border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>
        </div>

        {/* Clear filters */}
        {(condition || priceMin || priceMax || sort !== "newlyListed") && (
          <button
            onClick={() => { setSort("newlyListed"); setCondition(""); setPriceMin(""); setPriceMax(""); }}
            className="text-sm font-body text-orange underline self-end pb-2"
          >
            Clear filters
          </button>
        )}

        {/* Page indicator */}
        <div className="ml-auto self-end pb-1 text-sm font-body text-charcoal/50">
          {!loading && totalPages > 1 && `Page ${page} of ${totalPages.toLocaleString()}`}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-orange" size={40} />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-charcoal/50">
          <p className="font-heading text-2xl mb-2">No items found</p>
          <p className="font-body">Try adjusting your filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm bg-navy text-white disabled:opacity-30 hover:bg-navy/80 transition"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span className="font-body text-sm text-charcoal/60">
            {page.toLocaleString()} / {totalPages.toLocaleString()}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm bg-navy text-white disabled:opacity-30 hover:bg-navy/80 transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
