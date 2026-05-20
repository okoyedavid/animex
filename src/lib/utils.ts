import type {
  Anime,
  AnimeRecommendation,
  AnimeWatchFeedItem,
} from "@/types/anime";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export function shortenString(str: string, maxLength: number): string {
  if (str?.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
}

export function formatValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  return String(value);
}

export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Not available";
  }

  return value.toLocaleString();
}

export function formatList(
  items: Array<{ mal_id: number; name: string; url: string }> | string[],
) {
  if (items.length === 0) {
    return "Not available";
  }

  if (typeof items[0] === "string") {
    return (items as string[]).join(", ");
  }

  return (items as Array<{ mal_id: number; name: string; url: string }>)
    .map((item) => item.name)
    .join(", ");
}

export function getPosterUrl(
  item:
    | Anime
    | AnimeWatchFeedItem["entry"]
    | AnimeRecommendation["entry"][number],
) {
  return (
    item.images?.webp?.large_image_url ||
    item.images?.jpg?.large_image_url ||
    item.images?.webp?.image_url ||
    item.images?.jpg?.image_url ||
    ""
  );
}

export function getDisplayTitle(
  item:
    | Anime
    | AnimeWatchFeedItem["entry"]
    | AnimeRecommendation["entry"][number],
) {
  if ("title_english" in item) {
    return item.title_english || item.title;
  }

  return item.title;
}

export function formatCompactNumber(value?: number | null) {
  if (!value) {
    return "N/A";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
