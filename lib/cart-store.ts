"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/data/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, shippingMethod: "ship" | "local_pickup") => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, shippingMethod) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === product.id ? { ...i, cartQty: i.cartQty + 1 } : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...product, cartQty: 1, shippingMethod }],
            isOpen: true,
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQty: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, cartQty: qty } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.cartQty, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.cartQty, 0),
    }),
    {
      name: "flippinfind-cart",
    }
  )
);
