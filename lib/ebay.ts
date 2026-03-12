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
    const query = encodeURIComponent(`seller:${sellerId}`);
    const res = await fetch(
      `${EBAY_API_BASE}/item_summary/search?q=${query}&limit=50&sort=newlyListed${extraParams}`,
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
  // Filter for items with local pickup available
  const items = await fetchListings("&buyingOptions=LOCAL_PICKUP");
  // Fallback: if API doesn't filter correctly, filter client-side too
  return items.filter((item: EbayItem & { buyingOptions?: string[] }) =>
    !item.buyingOptions || item.buyingOptions.includes("LOCAL_PICKUP")
  );
}
