import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Haul Reports & Flip Stories",
  description:
    "Follow along as I dig through storage units across Wisconsin. Haul reports, flip stories, and finds — posted whenever I hit a new haul.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="section-title">Haul Reports & Flip Stories</h1>
        <p className="section-subtitle">
          Follow along as I dig through storage units across Wisconsin —
          new finds posted whenever I hit a new haul.
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="card p-6 md:p-8 flex flex-col md:flex-row gap-6"
          >
            {/* Image */}
            {post.image && (
              <div className="md:w-48 h-40 md:h-auto rounded-xl overflow-hidden bg-cream flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-4 text-charcoal/50 text-xs font-body mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  <Tag size={12} />
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-cream px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="font-heading text-xl md:text-2xl text-navy mb-2 leading-tight">
                {post.title}
              </h2>

              <p className="font-body text-charcoal/70 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 text-orange font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit text-sm"
              >
                Read more <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
