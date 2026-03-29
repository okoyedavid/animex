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
