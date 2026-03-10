import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
      },
      {
        protocol: "https",
        hostname: "**.ebayimg.com",
      },
      {
        // Spotify album art CDN
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
