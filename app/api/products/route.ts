import { NextResponse } from "next/server";
import { fetchSellerListings } from "@/lib/ebay";
import { seedProducts, PRODUCT_DISCLAIMER } from "@/data/products";
import type { Product } from "@/data/types";

export async function GET() {
  const ebayItems = await fetchSellerListings();

  if (ebayItems.length === 0) {
    // Fall back to seed data when eBay isn't configured
    return NextResponse.json(seedProducts);
  }

  const products: Product[] = ebayItems.map((item) => ({
    id: item.itemId,
    title: item.title,
    price: parseFloat(item.price.value),
    images: [item.image.imageUrl],
    description: `${PRODUCT_DISCLAIMER}\n\n${item.shortDescription ?? ""}`,
    category: "General",
    condition: item.condition,
    isLocalPickup: false,
    isJustListed: true,
    ebayListingId: item.itemId,
    quantity: 1,
  }));

  return NextResponse.json(products);
}
