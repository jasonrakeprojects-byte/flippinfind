import { artists } from "@/data/music";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music — FlippinFind",
  description:
    "Stream or buy music from Grandpa's Jetpack, Silver Wake Syndicate, Sisissippi Skies, and Rosehaven Echo.",
};

export default function MusicPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Music</h1>
        <p className="section-subtitle">
          Four artists. Stream on Spotify, buy on iTunes or Amazon Music.
        </p>
      </div>

      <div className="grid gap-8 md:gap-10">
        {artists.map((artist, i) => (
          <div
            key={artist.slug}
            className={`card flex flex-col md:flex-row overflow-hidden ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Album art */}
            <div className="md:w-64 h-48 md:h-auto bg-navy flex-shrink-0 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.albumArt}
                alt={`${artist.name} album art`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-orange/40 flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-navy mb-3">
                  {artist.name}
                </h2>
                <p className="font-body text-charcoal/70 leading-relaxed">
                  {artist.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {artist.spotifyUrl && (
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1DB954] text-white font-body font-semibold
                               px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    🎧 Stream on Spotify
                    <ExternalLink size={14} />
                  </a>
                )}
                {artist.itunesUrl && (
                  <a
                    href={artist.itunesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#fc3c44] text-white font-body font-semibold
                               px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    🍎 Buy on iTunes
                    <ExternalLink size={14} />
                  </a>
                )}
                {artist.amazonUrl && (
                  <a
                    href={artist.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FF9900] text-charcoal font-body font-semibold
                               px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    📦 Amazon Music
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
