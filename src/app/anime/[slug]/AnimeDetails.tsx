"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Film, PlayCircle, Plus, Star, Tv } from "lucide-react";
import { Anime } from "@/types/anime";
import { PlaceholderImage } from "../../../components/PlaceholderImage";
import { SectionTitle } from "../../../components/SectionTitle";
import { formatList, formatNumber, formatValue } from "@/lib/utils";
import { addToWatchlist, isInWatchlist } from "@/utils/watchlistStorage";
import { toast } from "sonner";

type Props = {
  data: Anime;
};

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-cinema backdrop-blur-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-b border-white/8 py-4 sm:grid-cols-[140px_1fr] sm:items-start">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="text-sm leading-6 text-slate-100">{value}</dd>
    </div>
  );
}

export default function AnimeDetails({ data }: Props) {
  const [saved, setSaved] = useState(false);
  const poster =
    data.images.webp?.large_image_url ||
    data.images.jpg?.large_image_url ||
    data.images.webp?.image_url ||
    data.images.jpg?.image_url;

  const trailerImage =
    data.trailer.images.webp?.large_image_url ||
    data.trailer.images.jpg?.large_image_url ||
    poster;

  const primaryTitle =
    data.title_english || data.title || data.title_japanese || "Untitled anime";

  useEffect(() => {
    setSaved(isInWatchlist(data.mal_id));
  }, [data.mal_id]);

  const handleAddToWatchlist = () => {
    const result = addToWatchlist({
      mal_id: data.mal_id,
      title: primaryTitle,
      image: poster,
      synopsis: data.synopsis || "",
    });

    if (result.status === "duplicate") {
      setSaved(true);
      toast.info("Already in watchlist", {
        description: "This anime is already saved in your guest watchlist.",
      });
      return;
    }

    if (result.status === "limit_exceeded") {
      toast.warning("Watchlist limit reached", {
        description:
          "Guest watchlists can store up to 20 anime. Create an account to save more.",
        action: {
          label: "Create account",
          onClick: () => {
            window.location.href = "/signup";
          },
        },
      });
      return;
    }

    setSaved(true);
    toast.success("Added to watchlist", {
      description: `${primaryTitle} has been saved for later on this device.`,
      action: {
        label: "View watchlist",
        onClick: () => {
          window.location.href = "/watchlist";
        },
      },
    });
  };

  const detailCards = [
    { label: "Score", value: formatValue(data.score) },
    { label: "Rank", value: formatValue(data.rank ? `#${data.rank}` : null) },
    {
      label: "Popularity",
      value: formatValue(data.popularity ? `#${data.popularity}` : null),
    },
    { label: "Scored By", value: formatNumber(data.scored_by) },
    { label: "Members", value: formatNumber(data.members) },
    { label: "Favorites", value: formatNumber(data.favorites) },
    { label: "Episodes", value: formatValue(data.episodes) },
    { label: "Duration", value: formatValue(data.duration) },
  ];

  return (
    <main className="min-h-screen bg-surface text-white pt-28 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          Back to search
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-cinema backdrop-blur-md">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
              <PlaceholderImage
                src={poster}
                alt={primaryTitle}
                className="aspect-[0.72] h-full min-h-[420px] w-full"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">
                  {formatValue(data.status)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                  {formatValue(data.type)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                  {formatValue(data.rating)}
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl leading-none tracking-[-0.05em] text-white sm:text-5xl">
                {primaryTitle}
              </h1>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>{data.title}</p>
                <p>{formatValue(data.title_japanese)}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {data.url ? (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
                  >
                    <ExternalLink size={16} />
                    Open on MyAnimeList
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={handleAddToWatchlist}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  <Plus size={16} />
                  {saved ? "Saved In Watchlist" : "Add To WatchList"}
                </button>
              </div>

              <p className="mt-8 max-w-4xl text-sm leading-7 text-slate-200 sm:text-base">
                {formatValue(data.synopsis)}
              </p>

              {data.background ? (
                <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-surface-strong/60 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Background
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {data.background}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
            {detailCards.map((card) => (
              <DetailCard
                key={card.label}
                label={card.label}
                value={card.value}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-cinema backdrop-blur-md sm:p-8">
            <SectionTitle
              eyebrow="Series profile"
              title="Production and release details"
              description=""
            />

            <dl className="mt-6">
              <MetadataRow
                label="Approved"
                value={data.approved ? "Yes" : "No"}
              />
              <MetadataRow
                label="Airing"
                value={data.airing ? "Currently airing" : "Not airing"}
              />
              <MetadataRow label="Source" value={formatValue(data.source)} />
              <MetadataRow label="Season" value={formatValue(data.season)} />
              <MetadataRow label="Year" value={formatValue(data.year)} />
              <MetadataRow
                label="Aired"
                value={formatValue(data.aired.string)}
              />
              <MetadataRow
                label="Broadcast"
                value={formatValue(data.broadcast.string)}
              />
              <MetadataRow label="Genres" value={formatList(data.genres)} />
              <MetadataRow label="Themes" value={formatList(data.themes)} />
              <MetadataRow label="Studios" value={formatList(data.studios)} />
              <MetadataRow
                label="Producers"
                value={formatList(data.producers)}
              />
              <MetadataRow
                label="Licensors"
                value={formatList(data.licensors)}
              />
              <MetadataRow
                label="All titles"
                value={formatList(
                  data.titles.map((title) => `${title.type}: ${title.title}`),
                )}
              />
              <MetadataRow
                label="Synonyms"
                value={formatList(data.title_synonyms)}
              />
              <MetadataRow
                label="Date range"
                value={`${formatValue(data.aired.from)} to ${formatValue(data.aired.to)}`}
              />
              <MetadataRow
                label="Calendar"
                value={`From ${formatValue(data.aired.prop.from.day)}/${formatValue(data.aired.prop.from.month)}/${formatValue(data.aired.prop.from.year)} to ${formatValue(data.aired.prop.to.day)}/${formatValue(data.aired.prop.to.month)}/${formatValue(data.aired.prop.to.year)}`}
              />
            </dl>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-cinema backdrop-blur-md sm:p-8">
              <SectionTitle
                eyebrow="Trailer"
                title="Preview"
                description={data.title}
              />

              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
                {data.trailer.embed_url ? (
                  <iframe
                    src={data.trailer.embed_url}
                    title={`${primaryTitle} trailer`}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <PlaceholderImage
                    src={trailerImage}
                    alt={`${primaryTitle} trailer`}
                    className="aspect-video w-full"
                    sizes="(max-width: 1280px) 100vw, 480px"
                  />
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Film size={16} />
                  Trailer ID: {formatValue(data.trailer.youtube_id)}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Tv size={16} />
                  {formatValue(data.broadcast.time)}
                </div>
              </div>

              {data.trailer.url ? (
                <a
                  href={data.trailer.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
                >
                  <PlayCircle size={16} />
                  Watch trailer externally
                </a>
              ) : null}
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-cinema backdrop-blur-md sm:p-8">
              <SectionTitle
                eyebrow="Title variants"
                title="Naming across regions"
                description=""
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    English
                  </p>
                  <p className="mt-2 text-base text-white">
                    {formatValue(data.title_english)}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Japanese
                  </p>
                  <p className="mt-2 text-base text-white">
                    {formatValue(data.title_japanese)}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Synonyms
                  </p>
                  <p className="mt-2 text-base leading-7 text-white">
                    {formatList(data.title_synonyms)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-cinema backdrop-blur-md sm:p-8">
              <SectionTitle
                eyebrow="Audience signal"
                title="Reception snapshot"
                description="These numbers reflect broad user engagement and popularity on the source dataset."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Community score
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-2xl font-semibold text-white">
                    <Star size={20} className="text-accent-soft" />
                    {formatValue(data.score)}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Scored by
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {formatNumber(data.scored_by)}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
