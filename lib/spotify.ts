import type { SpotifyRelease } from "@/data/types";

const SPOTIFY_API = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  try {
    // btoa is available in both Node.js 16+ and Cloudflare Workers
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      // Token is valid for 3600s — cache just under that
      next: { revalidate: 3500 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token as string;
  } catch {
    return null;
  }
}

export async function getLatestReleases(
  artists: { spotifyArtistId: string; name: string; slug: string }[]
): Promise<SpotifyRelease[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const results = await Promise.all(
    artists.map(async (artist) => {
      try {
        const res = await fetch(
          `${SPOTIFY_API}/artists/${artist.spotifyArtistId}/albums` +
            `?include_groups=album,single&limit=1&market=US`,
          {
            headers: { Authorization: `Bearer ${token}` },
            // Recheck for new releases every hour
            next: { revalidate: 3600 },
          }
        );

        if (!res.ok) return null;
        const data = await res.json();
        const item = data.items?.[0];
        if (!item) return null;

        return {
          id: item.id as string,
          name: item.name as string,
          type: item.album_type as string,
          releaseDate: item.release_date as string,
          coverUrl: (item.images?.[0]?.url ?? "") as string,
          spotifyUrl: item.external_urls.spotify as string,
          // album.link automatically generates a smart page for all platforms
          smartUrl: `https://album.link/s/${item.id}`,
          trackCount: item.total_tracks as number,
          artistName: artist.name,
          artistSlug: artist.slug,
          artistSpotifyId: artist.spotifyArtistId,
        } satisfies SpotifyRelease;
      } catch {
        return null;
      }
    })
  );

  return results.filter((r): r is SpotifyRelease => r !== null);
}
