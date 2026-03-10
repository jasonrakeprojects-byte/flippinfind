"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to Mailchimp or ConvertKit API endpoint
    // For now, just show success
    if (email) {
      setStatus("success");
      setEmail("");
    }
  }

  if (status === "success") {
    return (
      <p className="text-white font-body font-semibold text-lg">
        You&apos;re in! Watch your inbox for the next haul drop.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        suppressHydrationWarning
        className="flex-1 px-4 py-3 rounded-lg font-body text-charcoal placeholder:text-charcoal/40
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <button
        type="submit"
        className="bg-navy text-white font-body font-semibold px-6 py-3 rounded-lg
                   hover:bg-navy/90 active:scale-95 transition-all duration-150 whitespace-nowrap"
      >
        Get First Dibs
      </button>
    </form>
  );
}
