"use client";
import { Anime } from "@/types/anime";
import { ExternalLink, PlayCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  item: Anime;
};

const AnimexItem = ({ item }: Props) => {
  const router = useRouter();
  const poster =
    item.images.webp.large_image_url ||
    item.images.jpg.large_image_url ||
    item.images.webp.image_url ||
    item.images.jpg.image_url;

  const summary = [item.type, item.episodes ? `${item.episodes} eps` : null]
    .filter(Boolean)
    .join(" • ");

  const context = [item.season, item.year].filter(Boolean).join(" ");

  const handleClick = (): void => {
    router.push(`/anime/${item.mal_id}`);
  };

  return (
    <li
      onClick={handleClick}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-cinema backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="relative">
        <PlaceholderImage
          src={poster}
          alt={item.title}
          className="aspect-[0.78] w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
            {item.status}
          </span>
          {item.score ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              <Star size={12} className="text-accent-soft" />
              {item.score}
            </span>
          ) : null}
        </div>

        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2 text-xs font-medium text-white transition hover:border-white/25 hover:bg-slate-950/80"
          >
            <ExternalLink size={14} />
            MAL
          </a>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
            {context || "Anime discovery"}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-white">
            {item.title_english || item.title}
          </h3>
        </div>
      </div>

      <article className="space-y-5 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <PlayCircle size={14} />
            {summary || "TV anime"}
          </span>
          {item.rating ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {item.rating}
            </span>
          ) : null}
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-slate-300">
          {item.synopsis || "Synopsis not available for this title yet."}
        </p>

        <div className="grid grid-cols-3 gap-3 rounded-[1.25rem] border border-white/8 bg-surface-strong/60 p-4 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Rank
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {item.rank ? `#${item.rank}` : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Fans
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {item.members ? item.members.toLocaleString() : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Source
            </p>
            <p className="mt-2 truncate text-sm font-semibold text-white">
              {item.source || "Unknown"}
            </p>
          </div>
        </div>
      </article>
    </li>
  );
};

export default AnimexItem;
