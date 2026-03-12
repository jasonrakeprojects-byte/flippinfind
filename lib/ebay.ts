// ─── eBay Browse API Integration ─────────────────────────────────────────────
// Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
// Set EBAY_APP_ID and EBAY_SELLER_USERNAME in .env.local to activate.

const EBAY_API_BASE = "https://api.ebay.com/buy/browse/v1";

async function getEbayToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`
  ).toString("base64");

  const res = await fetch(
    "https://api.ebay.com/identity/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
    }
  );

  const data = await res.json() as { access_token: string };
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
}

async function fetchListings(extraParams: string): Promise<EbayItem[]> {
  const sellerId = process.env.EBAY_SELLER_USERNAME;
  if (!process.env.EBAY_APP_ID || !sellerId) {
    console.warn("eBay credentials not configured — using seed data.");
    return [];
  }

  try {
    const token = await getEbayToken();
    // category_ids=0 = all categories; filter=sellers:{id} scopes to this seller
    const sellerFilter = encodeURIComponent(`sellers:{${sellerId}}`);
    const res = await fetch(
      `${EBAY_API_BASE}/item_summary/search?category_ids=0&filter=${sellerFilter}&limit=50&sort=newlyListed${extraParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("eBay API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json() as { itemSummaries?: EbayItem[] };
    return data.itemSummaries ?? [];
  } catch (err) {
    console.error("eBay fetch failed:", err);
    return [];
  }
}

export async function fetchSellerListings(): Promise<EbayItem[]> {
  return fetchListings("");
}

export async function fetchLocalPickupListings(): Promise<EbayItem[]> {
  // Append buyingOptions to the filter param (comma-separated within the filter value)
  const sellerFilter = encodeURIComponent(`sellers:{${process.env.EBAY_SELLER_USERNAME}},buyingOptions:{LOCAL_PICKUP}`);
  const sellerId = process.env.EBAY_SELLER_USERNAME;
  if (!process.env.EBAY_APP_ID || !sellerId) return [];

  try {
    const token = await getEbayToken();
    const res = await fetch(
      `${EBAY_API_BASE}/item_summary/search?category_ids=0&filter=${sellerFilter}&limit=50&sort=newlyListed`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json() as { itemSummaries?: EbayItem[] };
    return data.itemSummaries ?? [];
  } catch {
    return [];
  }
}
