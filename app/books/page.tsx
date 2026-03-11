import { books } from "@/data/books";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "Books published on Amazon KDP. Click to buy on Amazon.",
};

export default function BooksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Books</h1>
        <p className="section-subtitle">
          Published on Amazon KDP. Click any cover to buy on Amazon.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16 text-charcoal/50">
          <p className="font-heading text-2xl mb-2">Coming soon</p>
          <p className="font-body">Books will appear here once published.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <a
              key={book.title}
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card group text-center"
            >
              {/* Cover */}
              <div className="aspect-[2/3] overflow-hidden bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-body font-semibold text-charcoal text-sm leading-tight mb-2">
                  {book.title}
                </h3>
                <p className="text-charcoal/60 text-xs font-body mb-3 line-clamp-2">
                  {book.description}
                </p>
                <span className="inline-flex items-center gap-1 text-orange font-body font-semibold text-xs hover:underline">
                  Buy on Amazon <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
