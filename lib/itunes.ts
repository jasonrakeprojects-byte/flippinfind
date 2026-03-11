/**
 * iTunes Search API — completely free, zero credentials required.
 * Apple Music / iTunes catalog covers all DistroKid-distributed music.
 * Docs: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/
 */

import type { ItunesRelease } from "@/data/types";

const ITUNES_API = "https://itunes.apple.com";

/** Guess release type from track count (iTunes doesn't always label explicitly) */
function guessType(trackCount: number): "album" | "single" | "ep" {
  if (trackCount <= 2) return "single";
  if (trackCount <= 6) return "ep";
  return "album";
}

/** Upgrade iTunes artwork from 100×100 to 600×600 */
function hiresCover(url: string): string {
  return url.replace("100x100bb", "600x600bb").replace("100x100", "600x600");
}

/** Fetch all releases for one artist by name using the iTunes Search API */
async function getArtistReleases(
  artistName: string,
  artistSlug: string,
  itunesArtistId?: number
): Promise<ItunesRelease[]> {
  try {
    let url: string;

    if (itunesArtistId) {
      // Precise lookup by known iTunes artist ID
      url = `${ITUNES_API}/lookup?id=${itunesArtistId}&entity=album&limit=50`;
    } else {
      // Search by artist name — the `artistTerm` attribute limits results to artist name matches
      url =
        `${ITUNES_API}/search?` +
        new URLSearchParams({
          term: artistName,
          entity: "album",
          attribute: "artistTerm",
          limit: "50",
          country: "US",
        });
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // re-fetch max once per hour
    });

    if (!res.ok) return [];

    const data = (await res.json()) as {
      results: Array<Record<string, unknown>>;
    };

    // Normalise + deduplicate by collection name (avoid clean/explicit duplicates)
    const seen = new Set<string>();
    const releases: ItunesRelease[] = [];

    for (const item of data.results) {
      // Skip artist rows returned by lookup
      if (item.wrapperType === "artist") continue;

      const name = (item.collectionName as string) ?? "";
      const key = name.toLowerCase().replace(/\s*\(.*?\)\s*/g, "").trim(); // strip "(Explicit)" etc.

      if (seen.has(key)) continue;
      seen.add(key);

      const artRaw = (item.artworkUrl100 as string) ?? "";
      const trackCount = (item.trackCount as number) ?? 1;

      releases.push({
        id: item.collectionId as number,
        name,
        type: guessType(trackCount),
        releaseDate: (item.releaseDate as string) ?? "",
        coverUrl: artRaw ? hiresCover(artRaw) : "",
        appleMusicUrl: (item.collectionViewUrl as string) ?? "",
        // album.link resolves an iTunes collection ID to Spotify, Amazon, YouTube, etc.
        smartUrl: `https://album.link/i/${item.collectionId as number}`,
        trackCount,
        artistName,
        artistSlug,
      });
    }

    // Sort newest first
    return releases.sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  } catch {
    return [];
  }
}

/** Fetch all releases for every artist, grouped by slug. */
export async function getAllReleasesByArtist(
  artists: {
    name: string;
    slug: string;
    itunesArtistId?: number;
  }[]
): Promise<Record<string, ItunesRelease[]>> {
  const results = await Promise.all(
    artists.map((a) => getArtistReleases(a.name, a.slug, a.itunesArtistId))
  );

  return Object.fromEntries(
    artists.map((a, i) => [a.slug, results[i]])
  );
}
