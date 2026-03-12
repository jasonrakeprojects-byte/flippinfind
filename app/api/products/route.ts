import { NextResponse } from "next/server";
import { fetchListingsPaginated } from "@/lib/ebay";
import { seedProducts, PRODUCT_DISCLAIMER } from "@/data/products";
import type { Product } from "@/data/types";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const sort = (searchParams.get("sort") as "newlyListed" | "price" | "-price") ?? "newlyListed";
  const condition = searchParams.get("condition") ?? undefined;
  const priceMin = searchParams.get("priceMin") ? parseFloat(searchParams.get("priceMin")!) : undefined;
  const priceMax = searchParams.get("priceMax") ? parseFloat(searchParams.get("priceMax")!) : undefined;

  const result = await fetchListingsPaginated({
    page,
    limit: 50,
    sort,
    condition: condition ?? undefined,
    priceMin,
    priceMax,
  });

  // Fall back to seed data if eBay returned nothing
  if (result.items.length === 0) {
    return NextResponse.json({
      products: seedProducts,
      total: seedProducts.length,
      page: 1,
      totalPages: 1,
    });
  }

  const products: Product[] = result.items.map((item) => ({
    id: item.itemId,
    title: item.title,
    price: parseFloat(item.price?.value ?? "0"),
    images: [item.image?.imageUrl ?? ""],
    description: PRODUCT_DISCLAIMER,
    category: item.categories?.[1]?.categoryName ?? item.categories?.[0]?.categoryName ?? "General",
    condition: item.condition,
    isLocalPickup: item.buyingOptions?.includes("LOCAL_PICKUP") ?? false,
    isJustListed: true,
    ebayListingId: item.itemId,
    quantity: 1,
  }));

  return NextResponse.json({
    products,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
  });
}
