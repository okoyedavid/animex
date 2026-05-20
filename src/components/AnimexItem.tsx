"use client";
import {
  formatCompactNumber,
  getDisplayTitle,
  getPosterUrl,
} from "@/lib/utils";
import { Anime } from "@/types/anime";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  item: Anime;
};

const AnimexItem = ({ item: anime }: Props) => {
  const title = getDisplayTitle(anime);
  const studio =
    anime.studios[0]?.name || anime.producers[0]?.name || "Studio TBA";
  const genre =
    anime.genres[0]?.name || anime.themes[0]?.name || anime.source || "Anime";

  return (
    <Link
      key={anime.mal_id}
      href={`/anime/${anime.mal_id}`}
      className="group overflow-hidden rounded-md border border-soft-border bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] shadow-cinema transition duration-300 hover:-translate-y-1.5 hover:border-primary/35"
    >
      <div className="relative">
        <PlaceholderImage
          src={getPosterUrl(anime)}
          alt={title}
          className="aspect-[0.72] w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 45vw, 22vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full border border-primary/25 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary backdrop-blur-sm">
            {genre}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-soft-border bg-background/80 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
            <Star size={12} className="text-primary" />
            {anime.score?.toFixed(1) ?? "TBA"}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {studio}
          </p>
          <h3 className="mt-2 font-display line-clamp-1 text-xl leading-tight transition group-hover:text-primary">
            {title}
          </h3>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {anime.synopsis || "Synopsis not available for this title yet."}
        </p>

        <div className="grid grid-cols-3 gap-3 rounded-md border border-soft-border bg-card p-3 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Episodes
            </p>
            <p className="mt-2 text-sm font-semibold">
              {anime.episodes ?? "TBA"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Fans
            </p>
            <p className="mt-2 text-sm font-semibold">
              {formatCompactNumber(anime.members)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Rank
            </p>
            <p className="mt-2 text-sm font-semibold">
              {anime.rank ? `#${anime.rank}` : "TBA"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimexItem;
