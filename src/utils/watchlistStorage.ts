export type WatchlistEntry = {
  mal_id: number;
  title: string;
  image: string;
  synopsis: string;
};

const WATCHLIST_KEY = "animex_watchlist";
export const WATCHLIST_LIMIT = 20;

function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function setStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getWatchlist() {
  return getStorageItem<WatchlistEntry[]>(WATCHLIST_KEY, []);
}

export function saveWatchlist(items: WatchlistEntry[]) {
  setStorageItem(WATCHLIST_KEY, items);
}

export function isInWatchlist(malId: number) {
  return getWatchlist().some((item) => item.mal_id === malId);
}

export function addToWatchlist(item: WatchlistEntry) {
  const currentWatchlist = getWatchlist();

  if (currentWatchlist.some((entry) => entry.mal_id === item.mal_id)) {
    return {
      status: "duplicate" as const,
      items: currentWatchlist,
    };
  }

  if (currentWatchlist.length >= WATCHLIST_LIMIT) {
    return {
      status: "limit_exceeded" as const,
      items: currentWatchlist,
    };
  }

  const nextWatchlist = [item, ...currentWatchlist];
  saveWatchlist(nextWatchlist);

  return {
    status: "added" as const,
    items: nextWatchlist,
  };
}
