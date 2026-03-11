import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream mt-20">
      {/* Newsletter Bar */}
      <div className="bg-orange py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-2xl text-white mb-2">
            Get First Dibs on New Finds
          </h3>
          <p className="text-white/90 font-body mb-6">
            New finds added whenever I hit a fresh unit. Subscribe and be
            first in line when new items drop.
          </p>
          <NewsletterSignup />
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <div className="bg-white rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="FlippinFind"
                className="h-20 w-auto block"
              />
            </div>
          </Link>
          <p className="text-cream/70 text-sm font-body leading-relaxed">
            Storage unit treasures, thrift flips, and real finds from Wisconsin.
            I dig through units so you don't have to.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange transition-colors"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-heading text-sm text-orange uppercase tracking-widest mb-3">
            Shop
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/local-pickup", label: "Local Pickup Only" },
              { href: "/shop?filter=just-listed", label: "Just Listed" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 hover:text-orange transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More */}
        <div>
          <h4 className="font-heading text-sm text-orange uppercase tracking-widest mb-3">
            Explore
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/music", label: "Music" },
              { href: "/books", label: "Books" },
              { href: "/blog", label: "Blog / Haul Reports" },
              { href: "/about", label: "About FlippinFind" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 hover:text-orange transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-heading text-sm text-orange uppercase tracking-widest mb-3">
            Info
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/policies#shipping", label: "Shipping & Pickup" },
              { href: "/policies#returns", label: "Returns (As-Is)" },
              { href: "/policies#privacy", label: "Privacy Policy" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 hover:text-orange transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4 text-center">
        <p className="text-cream/40 text-xs font-body">
          © {new Date().getFullYear()} FlippinFind · Iron Ridge, Wisconsin ·{" "}
          <Link href="/policies" className="hover:text-orange transition-colors">
            Policies
          </Link>
        </p>
      </div>
    </footer>
  );
}
