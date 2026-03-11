import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "FlippinFind — Storage Unit Treasures & Thrift Flips, Iron Ridge WI",
    template: "%s | FlippinFind",
  },
  description:
    "Every weekend I hit storage-unit auctions and estate sales in Wisconsin. Real finds, real prices, zero middle-man markup. Part online thrift shop, part neighborhood rummage sale.",
  keywords: [
    "storage unit auction finds",
    "thrift flip",
    "online rummage sale",
    "Wisconsin estate sale",
    "vintage items for sale",
    "Iron Ridge Wisconsin",
    "local pickup Wisconsin",
  ],
  openGraph: {
    siteName: "FlippinFind",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
