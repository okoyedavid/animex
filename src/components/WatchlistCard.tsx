"use client";

import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { PlaceholderImage } from "./PlaceholderImage";
import { WatchlistEntry } from "@/utils/watchlistStorage";

type WatchlistCardProps = {
  item: WatchlistEntry;
};

export default function WatchlistCard({ item }: WatchlistCardProps) {
  return (
    <li>
      <Link
        href={`/anime/${item.mal_id}`}
        className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-cinema backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.07]"
      >
        <div className="relative">
          <PlaceholderImage
            src={item.image}
            alt={item.title}
            className="aspect-[0.92] w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-100">
            <Bookmark size={12} className="text-accent-soft" />
            Saved
          </div>

          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-100">
            <ArrowUpRight size={12} />
            View
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-display text-2xl leading-tight text-white">
              {item.title}
            </h2>
          </div>
        </div>

        <div className="p-5">
          <p className="line-clamp-4 text-sm leading-7 text-slate-300">
            {item.synopsis || "Synopsis not available for this title yet."}
          </p>
        </div>
      </Link>
    </li>
  );
}
