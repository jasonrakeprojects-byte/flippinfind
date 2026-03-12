// ─── eBay Browse API Integration ─────────────────────────────────────────────
// Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html

const EBAY_API_BASE = "https://api.ebay.com/buy/browse/v1";

async function getEbayToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`
  ).toString("base64");

  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  });

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface EbayItem {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image: { imageUrl: string };
  itemWebUrl: string;
  condition: string;
  shortDescription?: string;
  buyingOptions?: string[];
  categories?: { categoryId: string; categoryName: string }[];
}

export interface EbayListingsResult {
  items: EbayItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FetchListingsParams {
  page?: number;          // 1-based
  limit?: number;         // default 50
  sort?: "newlyListed" | "price" | "-price" | "endingSoonest";
  condition?: string;     // "new" | "used" | "preowned"
  priceMin?: number;
  priceMax?: number;
  localPickupOnly?: boolean;
}

function buildFilter(sellerId: string, params: FetchListingsParams): string {
  const parts: string[] = [`sellers:{${sellerId}}`];

  if (params.localPickupOnly) {
    parts.push("buyingOptions:{LOCAL_PICKUP}");
  }

  if (params.condition === "new") {
    parts.push("conditionIds:{1000}");
  } else if (params.condition === "used" || params.condition === "preowned") {
    parts.push("conditionIds:{3000|4000|5000|6000}");
  }

  if (params.priceMin !== undefined || params.priceMax !== undefined) {
    const min = params.priceMin ?? 0;
    const max = params.priceMax ?? "";
    parts.push(`price:[${min}..${max}]`);
  }

  return encodeURIComponent(parts.join(","));
}

export async function fetchListingsPaginated(
  params: FetchListingsParams = {}
): Promise<EbayListingsResult> {
  const sellerId = process.env.EBAY_SELLER_USERNAME;
  if (!process.env.EBAY_APP_ID || !sellerId) {
    return { items: [], total: 0, page: 1, totalPages: 0 };
  }

  const limit = params.limit ?? 50;
  const page = params.page ?? 1;
  const offset = (page - 1) * limit;
  const sort = params.sort ?? "newlyListed";
  const filter = buildFilter(sellerId, params);

  try {
    const token = await getEbayToken();
    const url = `${EBAY_API_BASE}/item_summary/search?category_ids=0&filter=${filter}&limit=${limit}&offset=${offset}&sort=${sort}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("eBay API error:", res.status, await res.text());
      return { items: [], total: 0, page, totalPages: 0 };
    }

    const data = (await res.json()) as {
      itemSummaries?: EbayItem[];
      total?: number;
    };

    const total = data.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      items: data.itemSummaries ?? [],
      total,
      page,
      totalPages,
    };
  } catch (err) {
    console.error("eBay fetch failed:", err);
    return { items: [], total: 0, page, totalPages: 0 };
  }
}

// Convenience wrappers used by existing routes
export async function fetchSellerListings(): Promise<EbayItem[]> {
  const result = await fetchListingsPaginated({ limit: 50 });
  return result.items;
}

export async function fetchLocalPickupListings(): Promise<EbayItem[]> {
  const result = await fetchListingsPaginated({ localPickupOnly: true, limit: 50 });
  return result.items;
}
