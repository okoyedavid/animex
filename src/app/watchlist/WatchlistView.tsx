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
import { Button } from "@/components/ui/button";

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
    <main className="min-h-screen bg-surface px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className=" p-6 sm:p-8">
          <SectionTitle
            eyebrow="Guest watchlist"
            title="Saved locally on this device"
            description="If you are not signed in yet, Animex keeps a lightweight watchlist in local storage so you can still save titles and reopen them later."
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground">
              <Bookmark size={16} className="text-foreground" />
              {watchlist.length} / {WATCHLIST_LIMIT} saved
            </div>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold  transition hover:border-white/25 hover:bg-white/10"
            >
              <Button variant="outline" className="border-none">
                <LogIn size={16} />
                Sign in for sync
              </Button>
            </Link>
          </div>
        </div>

        {watchlist.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {watchlist.map((item) => (
              <WatchlistCard key={item.mal_id} item={item} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex min-h-80 flex-col items-center justify-center  px-6 text-center ">
            <h2 className="font-display text-2xl ">
              Your guest watchlist is empty.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-foreground sm:text-base">
              Save anime from any detail page and they will appear here with the
              title, poster, and synopsis already preserved locally.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
