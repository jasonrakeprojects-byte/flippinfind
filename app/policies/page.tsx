import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies — Shipping, Returns & Privacy",
};

export default function PoliciesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title mb-2">Policies</h1>
      <p className="text-charcoal/60 font-body mb-10">
        Shipping, returns, and privacy for FlippinFind.
      </p>

      <div className="space-y-10">
        {/* Shipping & Pickup */}
        <section id="shipping" className="bg-white rounded-2xl p-8 shadow-sm scroll-mt-20">
          <h2 className="font-heading text-2xl text-navy mb-4">
            Shipping & Local Pickup
          </h2>
          <div className="font-body text-charcoal/80 space-y-3 leading-relaxed">
            <p>
              <strong>Shipping:</strong> All orders ship via USPS Priority Mail
              or USPS Ground Advantage. Shipping cost is calculated at checkout
              based on item size and weight. Most items ship within 2 business
              days of payment.
            </p>
            <p>
              <strong>Local Pickup:</strong> Available in Iron Ridge, Wisconsin
              (Dodge County). Select &quot;Local Pickup&quot; at checkout —
              it&apos;s always free. After purchase, message me to schedule a
              pickup time. Pickup is by appointment only at my storage unit.
              Exact address provided upon scheduling.
            </p>
            <p>
              <strong>Fragile items:</strong> All fragile items are packed
              carefully. I reuse packaging materials when clean and sturdy. If
              your item arrives damaged, contact me immediately with photos —
              I&apos;ll make it right.
            </p>
          </div>
        </section>

        {/* Returns */}
        <section id="returns" className="bg-white rounded-2xl p-8 shadow-sm scroll-mt-20">
          <h2 className="font-heading text-2xl text-navy mb-4">
            Returns (As-Is Policy)
          </h2>
          <div className="font-body text-charcoal/80 space-y-3 leading-relaxed">
            <p>
              <strong>All sales are final.</strong> Items are sold as-is from
              storage unit auctions and estate sales. I describe and photograph
              every item honestly — including all known flaws, wear, and
              condition issues.
            </p>
            <p>
              <strong>Exceptions:</strong> If an item is significantly not as
              described (wrong item shipped, major undisclosed damage), I will
              accept a return and refund the full purchase price including
              original shipping.
            </p>
            <p>
              <strong>Before you buy:</strong> Have questions about an
              item? Ask! I&apos;m happy to take additional photos, measure, or
              provide more detail before you commit. Message me through the
              contact page.
            </p>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="bg-white rounded-2xl p-8 shadow-sm scroll-mt-20">
          <h2 className="font-heading text-2xl text-navy mb-4">
            Privacy Policy
          </h2>
          <div className="font-body text-charcoal/80 space-y-3 leading-relaxed">
            <p>
              FlippinFind collects only the information needed to process your
              order and communicate with you: name, shipping address, email
              address, and payment information.
            </p>
            <p>
              <strong>Payment:</strong> All payments are processed by Stripe.
              FlippinFind never stores your credit card details.
            </p>
            <p>
              <strong>Email:</strong> If you sign up for the newsletter, your
              email is used only to notify you of new listings and haul reports.
              You can unsubscribe at any time.
            </p>
            <p>
              <strong>No data selling:</strong> Your information is never sold
              or shared with third parties for marketing purposes.
            </p>
            <p>
              Questions? Email flippinfind@gmail.com or use the contact page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
