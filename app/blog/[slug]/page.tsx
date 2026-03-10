import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post?.title ?? "Post Not Found",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-orange font-body font-semibold text-sm mb-8 hover:gap-3 transition-all"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 text-charcoal/50 text-xs font-body mb-4">
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
            {post.tags.map((tag) => (
              <span key={tag} className="bg-cream px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl text-navy leading-tight mb-4">
          {post.title}
        </h1>
        <p className="font-body text-lg text-charcoal/70 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Hero image */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="font-body text-charcoal/80 leading-relaxed space-y-4">
        {post.content.split("\n\n").map((paragraph, i) => {
          // Simple markdown: **bold** support
          const html = paragraph
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/^#{1,3}\s+(.+)$/, (_, text) => `<h3 class="font-heading text-xl text-navy mt-6 mb-2">${text}</h3>`);

          return (
            <p
              key={i}
              dangerouslySetInnerHTML={{ __html: html }}
              className="text-base leading-7"
            />
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-cream rounded-2xl p-8 text-center">
        <p className="font-heading text-xl text-navy mb-4">
          Like what you read? Check out the shop.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse the Latest Haul
        </Link>
      </div>
    </div>
  );
}
