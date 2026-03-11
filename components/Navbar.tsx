"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/local-pickup", label: "Local Pickup" },
  { href: "/music", label: "Music" },
  { href: "/books", label: "Books" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart, isOpen, closeCart } = useCartStore();
  const count = itemCount();

  return (
    <>
      <header className="sticky top-0 z-40 bg-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group flex-shrink-0">
              <div className="bg-white rounded-xl px-2 py-1 shadow-sm group-hover:shadow-md transition-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="FlippinFind — Storage Unit Treasures, Iron Ridge WI"
                  className="h-11 w-auto block"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream font-body font-medium hover:text-orange transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + Mobile menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={openCart}
                className="relative p-2 text-cream hover:text-orange transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={24} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-cream hover:text-orange transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4">
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream font-body font-medium hover:text-orange transition-colors py-2 text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}
