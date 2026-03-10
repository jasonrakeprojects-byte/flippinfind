import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import type { CheckoutLineItem } from "@/lib/stripe";

interface CheckoutBody {
  lineItems: CheckoutLineItem[];
  shippingMethod: "ship" | "local_pickup";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const { lineItems, shippingMethod } = body;

    if (!lineItems?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = request.headers.get("origin") ?? "https://flippinfind.us";

    const session = await createCheckoutSession(
      lineItems,
      shippingMethod,
      `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      `${origin}/cart`
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
