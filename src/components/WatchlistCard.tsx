"use client";

import { WatchlistEntry } from "@/utils/watchlistStorage";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PlaceholderImage } from "./PlaceholderImage";

type WatchlistCardProps = {
  item: WatchlistEntry;
};

export default function WatchlistCard({ item }: WatchlistCardProps) {
  return (
    <Link
      href={`/anime/${item.mal_id}`}
      className="group overflow-hidden rounded-md border border-soft-border bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] shadow-cinema transition duration-300 hover:-translate-y-1.5 hover:border-primary/35"
    >
      <div className="relative">
        <PlaceholderImage
          src={item.image}
          alt={item.title}
          className="aspect-[0.72] w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 45vw, 22vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="mt-2 font-display line-clamp-2 text-xl leading-tight transition group-hover:text-primary">
            {item.title}
          </h3>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {item.synopsis || "Synopsis not available for this title yet."}
        </p>
      </div>
    </Link>
  );
}
