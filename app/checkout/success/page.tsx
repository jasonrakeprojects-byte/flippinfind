import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed — FlippinFind" };

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CheckCircle size={72} className="text-green-500 mx-auto mb-6" />
      <h1 className="font-heading text-4xl text-navy mb-4">
        Order Confirmed!
      </h1>
      <p className="font-body text-lg text-charcoal/70 mb-4 leading-relaxed">
        Thank you for your purchase. You&apos;ll receive a confirmation email
        shortly with your order details.
      </p>
      <p className="font-body text-charcoal/60 mb-10">
        If you selected local pickup, I&apos;ll reach out within 24 hours to
        schedule your pickup time in Juneau, WI.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/shop" className="btn-primary">
          Keep Shopping
        </Link>
        <Link href="/blog" className="btn-outline">
          Read the Blog
        </Link>
      </div>
    </div>
  );
}
