"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, LogIn, Sparkles } from "lucide-react";
import { toast } from "sonner";
import WatchlistCard from "@/components/WatchlistCard";
import { SectionTitle } from "@/components/SectionTitle";
import {
  getWatchlist,
  WATCHLIST_LIMIT,
  type WatchlistEntry,
} from "@/utils/watchlistStorage";

export default function WatchlistView() {
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);

  useEffect(() => {
    const items = getWatchlist();
    setWatchlist(items);

    if (items.length >= WATCHLIST_LIMIT) {
      toast.info("Guest watchlist limit reached", {
        description:
          "Create an account to keep more than 20 anime in your watchlist.",
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-surface px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-cinema backdrop-blur-md sm:p-8">
          <SectionTitle
            eyebrow="Guest watchlist"
            title="Saved locally on this device"
            description="If you are not signed in yet, Animex keeps a lightweight watchlist in local storage so you can still save titles and reopen them later."
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Bookmark size={16} className="text-accent-soft" />
              {watchlist.length} / {WATCHLIST_LIMIT} saved
            </div>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              <LogIn size={16} />
              Sign in for sync
            </Link>
          </div>
        </div>

        {watchlist.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {watchlist.map((item) => (
              <WatchlistCard key={item.mal_id} item={item} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 text-center shadow-cinema backdrop-blur-md">
            <div className="mb-5 rounded-full border border-white/10 bg-white/5 p-4 text-accent-soft">
              <Sparkles size={28} />
            </div>
            <h2 className="font-display text-2xl text-white">
              Your guest watchlist is empty.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Save anime from any detail page and they will appear here with the
              title, poster, and synopsis already preserved locally.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
