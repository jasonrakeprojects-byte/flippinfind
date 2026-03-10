import Stripe from "stripe";

// Stripe is initialized server-side only (API routes / Server Components)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
});

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
  const session = await stripe.checkout.sessions.create({
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
                display_name: "Local Pickup — Juneau, WI (Free)",
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
