export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  condition: string;
  isLocalPickup: boolean;
  isJustListed: boolean;
  ebayListingId?: string;
  stripePriceId?: string;
  quantity: number;
}

export interface CartItem extends Product {
  cartQty: number;
  shippingMethod: "ship" | "local_pickup";
}

export interface Artist {
  name: string;
  slug: string;
  description: string;
  albumArt: string;
  spotifyUrl?: string;
  itunesUrl?: string;
  amazonUrl?: string;
}

export interface Book {
  title: string;
  coverImage: string;
  description: string;
  amazonUrl: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
}
