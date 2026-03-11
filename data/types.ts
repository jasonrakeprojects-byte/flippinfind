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
  spotifyArtistId: string;
  itunesArtistId?: number;   // optional — speeds up lookup if known
  youtubeChannelUrl?: string; // e.g. "https://youtube.com/@ArtistHandle"
}

export interface ItunesRelease {
  id: number;
  name: string;
  type: "album" | "single" | "ep";
  releaseDate: string;
  coverUrl: string;
  appleMusicUrl: string;
  smartUrl: string; // album.link — resolves to Spotify, Amazon, YouTube, etc.
  trackCount: number;
  artistName: string;
  artistSlug: string;
}

export interface SpotifyRelease {
  id: string;
  name: string;
  type: string; // "album" | "single" | "compilation"
  releaseDate: string;
  coverUrl: string;
  spotifyUrl: string;
  smartUrl: string; // album.link smart link — works on Spotify, Apple Music, Amazon, etc.
  trackCount: number;
  artistName: string;
  artistSlug: string;
  artistSpotifyId: string;
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
