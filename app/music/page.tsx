import { artists } from "@/data/music";
import { getLatestReleases } from "@/lib/spotify";
import { ExternalLink, Music, Disc3 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { SpotifyRelease } from "@/data/types";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Stream music from Grandpa's Jetpack, Silver Wake Syndicate, Sisissippi Skies, and Rosehaven Echo — available on Spotify, Apple Music, Amazon Music, and more.",
};

// Revalidate the page every hour to pick up new releases automatically
export const revalidate = 3600;

function ReleaseBadge({ type }: { type: string }) {
  const label = type === "single" ? "Single" : type === "album" ? "Album" : "EP";
  return (
    <span className="text-xs font-body font-semibold uppercase tracking-wider bg-orange/10 text-orange px-2 py-0.5 rounded-full">
      {label}
    </span>
  );
}

function NewReleaseCard({ release }: { release: SpotifyRelease }) {
  const year = release.releaseDate.split("-")[0];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Cover art */}
      <div className="relative aspect-square bg-navy">
        {release.coverUrl ? (
          <Image
            src={release.coverUrl}
            alt={`${release.name} cover art`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Disc3 size={48} className="text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <ReleaseBadge type={release.type} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-body text-charcoal/50 mb-1">{release.artistName} · {year}</p>
        <h3 className="font-heading text-navy text-base leading-tight mb-3 line-clamp-2">
          {release.name}
        </h3>
        <a
          href={release.smartUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-navy text-white font-body
                     font-semibold px-3 py-2 rounded-lg text-sm hover:bg-orange transition-colors"
        >
          🎵 Listen Everywhere
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

export default async function MusicPage() {
  // Fetch latest release per artist — auto-updates every hour, no manual work needed
  const latestReleases = await getLatestReleases(artists);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="section-title">Music</h1>
        <p className="section-subtitle">
          Four artists. Every platform. One click.
        </p>
      </div>

      {/* ── New Releases ── */}
      {latestReleases.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Disc3 size={22} className="text-orange" />
            <h2 className="font-heading text-2xl text-navy">New Releases</h2>
            <span className="text-xs font-body text-charcoal/40 ml-1">
              auto-updated hourly
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {latestReleases.map((release) => (
              <NewReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </section>
      )}

      {/* ── Artist Profiles ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Music size={22} className="text-orange" />
          <h2 className="font-heading text-2xl text-navy">The Artists</h2>
        </div>

        <div className="grid gap-8 md:gap-10">
          {artists.map((artist, i) => (
            <div
              key={artist.slug}
              className={`card flex flex-col md:flex-row overflow-hidden ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Album art placeholder */}
              <div className="md:w-64 h-48 md:h-auto bg-navy flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-orange/40 flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl text-navy mb-3">
                    {artist.name}
                  </h3>
                  <p className="font-body text-charcoal/70 leading-relaxed">
                    {artist.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {/* Spotify artist profile */}
                  <a
                    href={`https://open.spotify.com/artist/${artist.spotifyArtistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1DB954] text-white font-body font-semibold
                               px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    🎧 Stream on Spotify
                    <ExternalLink size={14} />
                  </a>

                  {/* Latest release smart link — shows all platforms */}
                  {latestReleases.find(r => r.artistSlug === artist.slug) && (
                    <a
                      href={latestReleases.find(r => r.artistSlug === artist.slug)!.smartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-navy text-white font-body font-semibold
                                 px-4 py-2 rounded-full text-sm hover:bg-orange transition-colors"
                    >
                      🌐 All Platforms
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
