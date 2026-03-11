import type { Artist } from "./types";

export const artists: Artist[] = [
  {
    name: "Grandpa's Jetpack",
    slug: "grandpas-jetpack",
    description:
      "Roots rock with a dusty attic soul. Grandpa's Jetpack blends vintage Americana with wry Wisconsin humor. Expect honky-tonk piano, slide guitar, and stories pulled straight from the farm.",
    albumArt: "/music/grandpas-jetpack.jpg",
    spotifyArtistId: "3wWLmdUgI7OmzStTFE3aB2",
  },
  {
    name: "Silver Wake Syndicate",
    slug: "silver-wake-syndicate",
    description:
      "Lake-country blues rock with a heavy groove. Silver Wake Syndicate plays the kind of music you hear drifting across the water on a summer night — raw, honest, and impossible to ignore.",
    albumArt: "/music/silver-wake-syndicate.jpg",
    spotifyArtistId: "1FUTN097qvjpNvAArpqRlm", // fixed: was mapped to Rosehaven Echo
  },
  {
    name: "Sinissippi Skies",
    slug: "sinissippi-skies",
    description:
      "Indie folk with a Mississippi Delta twist, born and raised in Wisconsin. Sinissippi Skies weaves fingerpicked guitar and layered harmonies into songs about home, leaving, and finding your way back.",
    albumArt: "/music/sinissippi-skies.jpg",
    spotifyArtistId: "0I56Sg6Li1pInLmn8F7ilG", // fixed: was mapped to Silver Wake Syndicate
  },
  {
    name: "Rosehaven Echo",
    slug: "rosehaven-echo",
    description:
      "Dream-pop and shoegaze drifting through the Wisconsin pines. Rosehaven Echo builds walls of warm reverb over delicate melodies — music for golden-hour drives on back roads.",
    albumArt: "/music/rosehaven-echo.jpg",
    spotifyArtistId: "16eAm5k8AJ9wT161rI3NHi", // fixed: was mapped to Sinissippi Skies
  },
];
