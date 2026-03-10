import type { Product } from "./types";

// ─── DISCLAIMER ────────────────────────────────────────────────────────────────
// This text is auto-prepended to every synced product description.
export const PRODUCT_DISCLAIMER = `⚠️ IMPORTANT — PLEASE READ BEFORE PURCHASING ⚠️

All items are sold AS-IS from storage unit auctions and estate sales in Wisconsin. Items may show age, wear, or storage dust. Photos are of the actual item you will receive. No returns or exchanges unless item is significantly not as described. Questions? Message me before buying — I'm happy to share more photos or details!

─────────────────────────────────────────────────────`;

// ─── SEED PRODUCTS ─────────────────────────────────────────────────────────────
// Replace with live eBay API data once keys are configured.
export const seedProducts: Product[] = [
  {
    id: "ff-001",
    title: "Vintage 1970s Pyrex Friendship Bowl Set — 4 Bowls",
    price: 18,
    images: ["/placeholder-pyrex.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\nThis 1970s Pyrex set just came out of a dusty bin — and it is absolutely gorgeous. Four nesting bowls in the classic Friendship pattern. No chips, no cracks. Ready to use or display.`,
    category: "Kitchen & Housewares",
    condition: "Good — shows light age wear",
    isLocalPickup: true,
    isJustListed: true,
    quantity: 1,
  },
  {
    id: "ff-002",
    title: "Antique Cast Iron Skillet — Unmarked, Pre-1950",
    price: 35,
    images: ["/placeholder-skillet.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\nFound in a storage unit, this heavy cast iron skillet is seasoned and ready to cook. No cracks, smooth cooking surface. Approximately 10-inch diameter.`,
    category: "Kitchen & Housewares",
    condition: "Good — naturally seasoned",
    isLocalPickup: true,
    isJustListed: false,
    quantity: 1,
  },
  {
    id: "ff-003",
    title: "1980s Wooden Tool Chest — 3 Drawer, Solid Oak",
    price: 65,
    images: ["/placeholder-toolchest.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\nSolid oak tool chest from the 80s. Three drawers all open and close smoothly. Some scratches on top. LOCAL PICKUP ONLY — Juneau, WI area.`,
    category: "Tools & Hardware",
    condition: "Fair — surface scratches, solid structure",
    isLocalPickup: true,
    isJustListed: true,
    quantity: 1,
  },
  {
    id: "ff-004",
    title: "Lot of 10 Vintage National Geographic Magazines — 1960s",
    price: 22,
    images: ["/placeholder-natgeo.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\n10 issues from the 1960s. All covers intact, pages yellowed with age but readable. Great for crafts, framing maps, or display. Sold as a lot.`,
    category: "Books & Magazines",
    condition: "Fair — age yellowing, no tears",
    isLocalPickup: false,
    isJustListed: true,
    quantity: 1,
  },
  {
    id: "ff-005",
    title: "Mid-Century Modern Wooden Side Table",
    price: 95,
    images: ["/placeholder-table.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\nBeautiful mid-century side table. Tapered legs, walnut-stained top. One small ding on the edge, otherwise excellent. LOCAL PICKUP ONLY — too large to ship.`,
    category: "Furniture",
    condition: "Good — minor ding noted",
    isLocalPickup: true,
    isJustListed: false,
    quantity: 1,
  },
  {
    id: "ff-006",
    title: "Vintage Polaroid OneStep Camera + Flash Bar",
    price: 28,
    images: ["/placeholder-polaroid.jpg"],
    description: `${PRODUCT_DISCLAIMER}\n\nClassic Polaroid OneStep from the late 1970s. Includes one flash bar. Camera appears clean. Not tested — sold for display/parts or as a retro decorative piece.`,
    category: "Cameras & Photography",
    condition: "Unknown function — display/parts",
    isLocalPickup: false,
    isJustListed: true,
    quantity: 1,
  },
];

export const categories = [
  "All",
  "Kitchen & Housewares",
  "Tools & Hardware",
  "Books & Magazines",
  "Furniture",
  "Cameras & Photography",
  "Clothing & Accessories",
  "Toys & Collectibles",
  "Electronics",
  "Other",
];
