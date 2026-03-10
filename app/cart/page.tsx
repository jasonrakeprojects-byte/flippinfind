"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    const shippingMethod = items.every((i) => i.shippingMethod === "local_pickup")
      ? "local_pickup"
      : "ship";
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: items.map((i) => ({
            name: i.title,
            price: i.price,
            quantity: i.cartQty,
            productId: i.id,
          })),
          shippingMethod,
        }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-charcoal/20 mx-auto mb-6" />
        <h1 className="font-heading text-3xl text-navy mb-4">Your cart is empty</h1>
        <p className="font-body text-charcoal/60 mb-8">
          Head to the shop and find something great.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse the Shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-body font-semibold text-charcoal leading-tight">{item.title}</p>
                <p className="text-charcoal/50 text-xs mt-1">{item.condition}</p>
                {item.shippingMethod === "local_pickup" && (
                  <span className="badge-pickup text-xs mt-1 inline-block">Local Pickup</span>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQty(item.id, item.cartQty - 1)}
                    className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                  <span className="font-body font-medium text-sm">{item.cartQty}</span>
                  <button onClick={() => updateQty(item.id, item.cartQty + 1)}
                    className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="font-heading text-lg text-navy">${(item.price * item.cartQty).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="font-heading text-xl text-navy mb-4">Order Summary</h2>
          <div className="space-y-2 font-body text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-charcoal/70">Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/70">Shipping</span>
              <span className="text-charcoal/50">Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
            <span className="font-body font-semibold">Total</span>
            <span className="font-heading text-2xl text-navy">${total().toFixed(2)}</span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button onClick={handleCheckout} disabled={loading} className="btn-primary w-full justify-center">
            {loading ? "Redirecting…" : "Checkout Securely"}
          </button>
          <Link href="/shop" className="block text-center text-sm text-charcoal/60 hover:text-charcoal mt-4 font-body">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
