import type { SpotifyRelease } from "@/data/types";

const SPOTIFY_API = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  try {
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      next: { revalidate: 3500 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token as string;
  } catch {
    return null;
  }
}

/** Fetch all releases (albums + singles) for each artist, grouped by artist slug.
 *  Auto-updates every hour — new releases on Spotify appear automatically. */
export async function getAllReleasesByArtist(
  artists: { spotifyArtistId: string; name: string; slug: string }[]
): Promise<Record<string, SpotifyRelease[]>> {
  const token = await getAccessToken();
  if (!token) return {};

  const results = await Promise.all(
    artists.map(async (artist) => {
      try {
        const res = await fetch(
          `${SPOTIFY_API}/artists/${artist.spotifyArtistId}/albums` +
            `?include_groups=album,single&limit=50&market=US`,
          {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 3600 },
          }
        );

        if (!res.ok) return { slug: artist.slug, releases: [] as SpotifyRelease[] };

        const data = await res.json();

        const releases: SpotifyRelease[] = (
          data.items as Array<Record<string, unknown>>
        ).map((item) => {
          const images = item.images as Array<{ url: string }>;
          const externalUrls = item.external_urls as { spotify: string };
          return {
            id: item.id as string,
            name: item.name as string,
            type: item.album_type as string,
            releaseDate: item.release_date as string,
            coverUrl: images?.[0]?.url ?? "",
            spotifyUrl: externalUrls.spotify,
            smartUrl: `https://album.link/s/${item.id as string}`,
            trackCount: item.total_tracks as number,
            artistName: artist.name,
            artistSlug: artist.slug,
            artistSpotifyId: artist.spotifyArtistId,
          };
        });

        return { slug: artist.slug, releases };
      } catch {
        return { slug: artist.slug, releases: [] as SpotifyRelease[] };
      }
    })
  );

  return Object.fromEntries(results.map((r) => [r.slug, r.releases]));
}

/** Legacy: one latest release per artist — kept for backwards compat. */
export async function getLatestReleases(
  artists: { spotifyArtistId: string; name: string; slug: string }[]
): Promise<SpotifyRelease[]> {
  const allByArtist = await getAllReleasesByArtist(artists);
  return Object.values(allByArtist)
    .map((releases) => releases[0])
    .filter((r): r is SpotifyRelease => Boolean(r));
}
