import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/axios";
import type {
  Anime,
  AnimeRecommendation,
  AnimeWatchFeedItem,
} from "@/types/anime";

export type AnimeSeason = "winter" | "spring" | "summer" | "fall";

export type SeasonalScope =
  | {
      type: "now";
    }
  | {
      type: "season";
      season: AnimeSeason;
      year: number;
    };

function hasPoster(anime: Anime) {
  const poster =
    anime.images?.webp?.large_image_url ||
    anime.images?.jpg?.large_image_url ||
    anime.images?.webp?.image_url ||
    anime.images?.jpg?.image_url;

  return Boolean(poster);
}

function curateSeasonalAnime(items: Anime[], limit: number) {
  return items
    .filter((anime) => hasPoster(anime) && (anime.type === "TV" || anime.type === "ONA"))
    .sort((left, right) => {
      const leftScore = left.score ?? 0;
      const rightScore = right.score ?? 0;

      if (rightScore !== leftScore) {
        return rightScore - leftScore;
      }

      return (right.members ?? 0) - (left.members ?? 0);
    })
    .slice(0, limit);
}

function hasUsableWatchImage(item: AnimeWatchFeedItem) {
  const image =
    item.entry.images?.webp?.large_image_url ||
    item.entry.images?.jpg?.large_image_url ||
    item.entry.images?.webp?.image_url ||
    item.entry.images?.jpg?.image_url ||
    "";

  return image.length > 0 && !image.includes("icon-banned-youtube-rect");
}

export function useDiscoverySeasonalAnime(scope: SeasonalScope, limit = 4) {
  return useQuery({
    queryKey: [
      "discover-seasonal-anime",
      scope.type,
      scope.type === "season" ? scope.year : "current",
      scope.type === "season" ? scope.season : "now",
      limit,
    ],
    staleTime: 1000 * 60 * 15,
    queryFn: async () => {
      const endpoint =
        scope.type === "now"
          ? "/seasons/now"
          : `/seasons/${scope.year}/${scope.season}`;

      const { data } = await api.get(endpoint, {
        params: { limit: 12 },
      });

      return curateSeasonalAnime(data.data ?? [], limit);
    },
  });
}

export function useDiscoveryRecommendations(limit = 5) {
  return useQuery({
    queryKey: ["discover-recommendations", limit],
    staleTime: 1000 * 60 * 20,
    queryFn: async () => {
      const { data } = await api.get("/recommendations/anime", {
        params: { limit },
      });

      return (data.data ?? []) as AnimeRecommendation[];
    },
  });
}

export function useDiscoveryWatchFeed(limit = 5) {
  return useQuery({
    queryKey: ["discover-watch-feed", limit],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      try {
        const { data } = await api.get("/watch/episodes", {
          params: { limit },
        });

        return (data.data ?? []) as AnimeWatchFeedItem[];
      } catch {
        const { data } = await api.get("/watch/episodes/popular");

        return ((data.data ?? []) as AnimeWatchFeedItem[])
          .filter(hasUsableWatchImage)
          .slice(0, limit);
      }
    },
  });
}

function curateTopAnime(items: Anime[], limit: number) {
  return items
    .filter((anime) => hasPoster(anime) && Boolean(anime.title_english || anime.title))
    .sort((left, right) => {
      const leftScore = left.score ?? 0;
      const rightScore = right.score ?? 0;

      if (rightScore !== leftScore) {
        return rightScore - leftScore;
      }

      return (right.members ?? 0) - (left.members ?? 0);
    })
    .slice(0, limit);
}

export function useHeroTopAnime(limit = 5) {
  return useQuery({
    queryKey: ["hero-top-anime", limit],
    staleTime: 1000 * 60 * 30,
    queryFn: async () => {
      const { data } = await api.get("/top/anime", {
        params: {
          limit: Math.max(limit * 3, 15),
        },
      });

      return curateTopAnime((data.data ?? []) as Anime[], limit);
    },
  });
}
