import Stripe from "stripe";

// Lazy singleton — avoids instantiation at build time when env vars aren't set
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  }
  return _stripe;
}

export interface CheckoutLineItem {
  name: string;
  price: number; // in dollars
  quantity: number;
  productId: string;
}

export async function createCheckoutSession(
  lineItems: CheckoutLineItem[],
  shippingMethod: "ship" | "local_pickup",
  successUrl: string,
  cancelUrl: string
) {
  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          metadata: { productId: item.productId },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection:
      shippingMethod === "ship"
        ? { allowed_countries: ["US"] }
        : undefined,
    shipping_options:
      shippingMethod === "local_pickup"
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Local Pickup — Iron Ridge, WI (Free)",
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 895, currency: "usd" },
                display_name: "USPS Priority Mail",
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 599, currency: "usd" },
                display_name: "USPS Ground Advantage",
              },
            },
          ],
    metadata: { source: "flippinfind" },
  });

  return session;
}
