"use client";
import { X, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQty, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    const hasLocalOnly = items.some(
      (i) => i.isLocalPickup && i.shippingMethod === "ship"
    );
    const shippingMethod =
      items.every((i) => i.shippingMethod === "local_pickup")
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
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-heading text-2xl text-navy">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-charcoal/50">
              <p className="font-body text-lg">Your cart is empty.</p>
              <p className="text-sm mt-2">Find a treasure in the shop!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-gray-100 rounded-xl"
              >
                <div className="w-16 h-16 bg-cream rounded-lg flex-shrink-0 overflow-hidden">
                  {item.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-charcoal line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-orange font-semibold text-sm mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.shippingMethod === "local_pickup" && (
                    <span className="badge-pickup text-xs mt-1 inline-block">
                      Local Pickup
                    </span>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.cartQty - 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.cartQty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.cartQty + 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            {error && (
              <p className="text-red-500 text-sm font-body">{error}</p>
            )}
            <div className="flex justify-between items-center">
              <span className="font-body font-medium text-charcoal">
                Subtotal
              </span>
              <span className="font-heading text-xl text-navy">
                ${total().toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-charcoal/50 font-body">
              Shipping calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full justify-center text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                "Checkout Securely"
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-charcoal/60 hover:text-charcoal transition-colors font-body"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
