import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question about an item, need more photos, or want to schedule a local pickup? Reach out — I always respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Contact</h1>
        <p className="section-subtitle">
          Questions about an item? Want more photos? Need to schedule a pickup?
          I always respond within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="card p-6 flex gap-4">
            <Mail className="text-orange shrink-0 mt-1" size={22} />
            <div>
              <h3 className="font-heading text-navy text-lg mb-1">Email</h3>
              <a
                href="mailto:flippinfind@gmail.com"
                className="font-body text-charcoal/80 hover:text-orange transition-colors"
              >
                flippinfind@gmail.com
              </a>
              <p className="font-body text-sm text-charcoal/50 mt-1">
                Best for general questions, item inquiries, and returns.
              </p>
            </div>
          </div>

          <div className="card p-6 flex gap-4">
            <MapPin className="text-orange shrink-0 mt-1" size={22} />
            <div>
              <h3 className="font-heading text-navy text-lg mb-1">
                Local Pickup
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                Iron Ridge, Wisconsin (Dodge County)
              </p>
              <p className="font-body text-sm text-charcoal/50 mt-1">
                By appointment only. Exact address provided after purchase.
              </p>
            </div>
          </div>

          <div className="card p-6 flex gap-4">
            <Clock className="text-orange shrink-0 mt-1" size={22} />
            <div>
              <h3 className="font-heading text-navy text-lg mb-1">
                Response Time
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                I respond to all messages within <strong>24 hours</strong>,
                usually much faster on weekends when I&apos;m actively out
                hunting.
              </p>
            </div>
          </div>
        </div>

        {/* What to ask about */}
        <div className="bg-navy text-cream rounded-2xl p-6 md:p-8 h-fit">
          <h2 className="font-heading text-orange text-xl mb-4">
            Common Questions
          </h2>
          <ul className="space-y-3 font-body text-sm text-cream/80">
            <li className="flex gap-2">
              <span className="text-orange shrink-0">→</span>
              Request additional photos of an item
            </li>
            <li className="flex gap-2">
              <span className="text-orange shrink-0">→</span>
              Ask about condition, measurements, or details
            </li>
            <li className="flex gap-2">
              <span className="text-orange shrink-0">→</span>
              Schedule a local pickup appointment
            </li>
            <li className="flex gap-2">
              <span className="text-orange shrink-0">→</span>
              Report a shipping issue or damaged item
            </li>
            <li className="flex gap-2">
              <span className="text-orange shrink-0">→</span>
              General questions about FlippinFind
            </li>
          </ul>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-cream/60 text-xs font-body">
              For order-specific questions, please include your order number or
              the item name in your message.
            </p>
          </div>
        </div>
      </div>

      {/* Direct email CTA */}
      <div className="mt-10 text-center">
        <a
          href="mailto:flippinfind@gmail.com"
          className="btn-primary inline-flex"
        >
          <Mail size={18} />
          Send an Email
        </a>
      </div>
    </div>
  );
}
