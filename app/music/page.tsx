import { artists } from "@/data/music";
import { getAllReleasesByArtist } from "@/lib/spotify";
import { ExternalLink, Music, Disc3 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { SpotifyRelease } from "@/data/types";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Stream music from Grandpa's Jetpack, Silver Wake Syndicate, Sinissippi Skies, and Rosehaven Echo — available on Spotify, Apple Music, Amazon Music, YouTube, and more.",
};

// Revalidate every hour to pick up new releases automatically
export const revalidate = 3600;

// ── Platform buttons ──────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    key: "spotify",
    label: "Spotify",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.318a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.54-1.157a.748.748 0 01-.356-1.452c4.573-1.045 8.495-.595 11.677 1.337.354.216.463.68.249 1.022zm1.472-3.27a.937.937 0 01-1.288.308c-3.226-1.983-8.144-2.558-11.96-1.4a.937.937 0 11-.544-1.792c4.361-1.324 9.784-.683 13.485 1.596a.938.938 0 01.307 1.289zm.127-3.405c-3.867-2.297-10.244-2.508-13.936-1.387a1.124 1.124 0 11-.653-2.151c4.239-1.287 11.285-1.038 15.737 1.605a1.124 1.124 0 01-1.148 1.933z" />
      </svg>
    ),
    className: "bg-[#1DB954] hover:bg-[#17a348] text-white",
  },
  {
    key: "apple",
    label: "Apple Music",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A4.81 4.81 0 00.05 4.822C.019 5.042 0 5.268 0 5.494V18.57c.009.207.02.415.053.62.232 1.424.994 2.493 2.21 3.197.48.277 1.004.43 1.536.52.587.103 1.18.1 1.77.1h14.847c.21-.013.42-.02.63-.045 1.047-.128 1.983-.555 2.735-1.293.817-.803 1.22-1.79 1.218-2.93V6.906c-.009-.26-.02-.52-.005-.782zM12 17.5c-3.038 0-5.5-2.462-5.5-5.5S8.962 6.5 12 6.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm6.5-2a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    ),
    className: "bg-[#fc3c44] hover:bg-[#e0353c] text-white",
  },
  {
    key: "amazon",
    label: "Amazon Music",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.658.658 0 01-.742.074c-1.044-.868-1.231-1.271-1.805-2.099-1.726 1.76-2.948 2.286-5.187 2.286-2.648 0-4.711-1.633-4.711-4.903 0-2.554 1.383-4.291 3.354-5.139 1.706-.751 4.089-.885 5.907-1.092v-.406c0-.747.058-1.63-.381-2.276-.381-.579-1.114-.818-1.76-.818-1.196 0-2.261.614-2.521 1.886-.054.282-.261.559-.548.573l-3.061-.331c-.259-.058-.545-.266-.472-.66C5.535 1.851 8.319.5 11.499.5c1.626 0 3.752.433 5.032 1.665 1.626 1.519 1.471 3.547 1.471 5.752v5.219c0 1.571.651 2.26 1.263 3.107.215.301.261.661-.01.883-.683.572-1.896 1.631-2.562 2.227l-.549-.558z" />
      </svg>
    ),
    className: "bg-[#00A8E1] hover:bg-[#0090c0] text-white",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    className: "bg-[#FF0000] hover:bg-[#cc0000] text-white",
  },
];

function getPlatformUrl(
  release: SpotifyRelease,
  platformKey: string
): string {
  if (platformKey === "spotify") return release.spotifyUrl;
  // Apple Music, Amazon, YouTube — album.link smart page handles routing
  return release.smartUrl;
}

// ── Release type badge ────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const label =
    type === "single" ? "Single" : type === "album" ? "Album" : "EP";
  return (
    <span className="text-xs font-body font-semibold uppercase tracking-wider bg-orange/10 text-orange px-2 py-0.5 rounded-full">
      {label}
    </span>
  );
}

// ── Single release card ───────────────────────────────────────────────────────

function ReleaseCard({ release }: { release: SpotifyRelease }) {
  const year = release.releaseDate.split("-")[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Cover art */}
      <div className="relative aspect-square bg-navy flex-shrink-0">
        {release.coverUrl ? (
          <Image
            src={release.coverUrl}
            alt={`${release.name} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Disc3 size={40} className="text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2">
          <TypeBadge type={release.type} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-body text-charcoal/40 mb-0.5">{year}</p>
        <h4 className="font-heading text-navy text-sm leading-snug mb-3 flex-1 line-clamp-2">
          {release.name}
        </h4>

        {/* Platform buttons — 2×2 grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.key}
              href={getPlatformUrl(release, platform.key)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Listen on ${platform.label}`}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-body font-semibold transition-opacity hover:opacity-90 ${platform.className}`}
            >
              {platform.icon}
              <span className="hidden sm:inline truncate">{platform.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Artist section ────────────────────────────────────────────────────────────

function ArtistSection({
  artist,
  releases,
  index,
}: {
  artist: (typeof import("@/data/music").artists)[number];
  releases: SpotifyRelease[];
  index: number;
}) {
  const spotifyProfileUrl = `https://open.spotify.com/artist/${artist.spotifyArtistId}`;
  const hasReleases = releases.length > 0;

  return (
    <section
      className={`rounded-2xl overflow-hidden border border-charcoal/10 ${
        index % 2 === 0 ? "bg-white" : "bg-cream"
      }`}
    >
      {/* Artist header */}
      <div className="bg-navy px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-end gap-6">
        <div className="flex-1">
          <p className="text-orange text-xs font-body font-semibold uppercase tracking-widest mb-2">
            Artist
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            {artist.name}
          </h2>
          <p className="font-body text-cream/70 leading-relaxed max-w-2xl">
            {artist.description}
          </p>
        </div>

        {/* Spotify profile link */}
        <a
          href={spotifyProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#17a348] text-white
                     font-body font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shrink-0 w-fit"
        >
          {PLATFORMS[0].icon}
          View on Spotify
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Releases grid */}
      <div className="px-6 py-8 md:px-10">
        {hasReleases ? (
          <>
            <div className="flex items-center gap-2 mb-5">
              <Disc3 size={18} className="text-orange" />
              <h3 className="font-heading text-lg text-navy">
                Songs &amp; Releases
              </h3>
              <span className="text-xs font-body text-charcoal/40 ml-1">
                {releases.length} release{releases.length !== 1 ? "s" : ""}
                {" · "}auto-updated from Spotify
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 text-charcoal/50 font-body text-sm py-2">
            <Music size={16} />
            <span>
              No releases found yet — check back soon, or{" "}
              <a
                href={spotifyProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                follow on Spotify
              </a>{" "}
              to catch new drops.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function MusicPage() {
  const releasesByArtist = await getAllReleasesByArtist(artists);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="section-title">Music</h1>
        <p className="section-subtitle">
          Four artists. Every platform. Stream or buy wherever you listen.
        </p>
        {/* Platform icons */}
        <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
          {PLATFORMS.map((p) => (
            <span
              key={p.key}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold ${p.className}`}
            >
              {p.icon}
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Artist sections */}
      <div className="space-y-8">
        {artists.map((artist, i) => (
          <ArtistSection
            key={artist.slug}
            artist={artist}
            releases={releasesByArtist[artist.slug] ?? []}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
