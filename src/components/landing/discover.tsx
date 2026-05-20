"use client";

import { ArrowUpRight, Clock3, Star, Tv } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDiscoveryRecommendations,
  useDiscoverySeasonalAnime,
  useDiscoveryWatchFeed,
  type AnimeSeason,
  type SeasonalScope,
} from "@/hooks/useDiscoveryShelf";
import {
  formatCompactNumber,
  getDisplayTitle,
  getPosterUrl,
} from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

type DiscoveryTab = {
  value: string;
  label: string;
  eyebrow: string;
  description: string;
  scope: SeasonalScope;
};

function buildDiscoveryTabs(year: number): DiscoveryTab[] {
  const seasons: { label: string; season: AnimeSeason }[] = [
    { label: "Spring", season: "spring" },
    { label: "Summer", season: "summer" },
    { label: "Fall", season: "fall" },
    { label: "Winter", season: "winter" },
  ];

  return [
    {
      value: "airing-now",
      label: "Airing now",
      eyebrow: "Live this week",
      description:
        "The strongest shows currently airing, pulled from the live season feed.",
      scope: { type: "now" },
    },
    ...seasons.map(({ label, season }) => ({
      value: season,
      label,
      eyebrow: `${label} ${year}`,
      description: `A focused look at ${label.toLowerCase()} ${year}, using Jikan's seasonal catalog.`,
      scope: { type: "season" as const, season, year },
    })),
  ];
}

function DiscoverySkeletonCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-md border border-soft-border bg-surface"
        >
          <div className="aspect-[0.72] animate-pulse bg-muted" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 animate-pulse rounded-full bg-skeleton-highlight" />
            <div className="h-5 w-full animate-pulse rounded-full bg-skeleton-highlight" />
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-skeleton-highlight" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              {Array.from({ length: 3 }).map((__, statIndex) => (
                <div
                  key={statIndex}
                  className="h-12 animate-pulse rounded-2xl bg-skeleton"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiscoverySidebarSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 rounded-[1.35rem] border border-soft-border bg-surface p-3"
        >
          <div className="h-[72px] w-14 shrink-0 animate-pulse rounded-2xl bg-skeleton" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-3 w-16 animate-pulse rounded-full bg-skeleton-highlight" />
            <div className="h-4 w-full animate-pulse rounded-full bg-skeleton-highlight" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-skeleton-highlight" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SeasonalShelf({ tab }: { tab: DiscoveryTab }) {
  const { data, isLoading, isError } = useDiscoverySeasonalAnime(tab.scope);

  if (isLoading) {
    return <DiscoverySkeletonCards />;
  }

  if (isError || !data?.length) {
    return (
      <div className="rounded-[1.7rem] border border-dashed border-soft-border bg-surface-muted px-6 py-10 text-sm text-muted-foreground">
        This season could not be loaded right now. Jikan occasionally
        rate-limits seasonal endpoints, so this panel will recover on the next
        successful query.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((anime) => {
        const title = getDisplayTitle(anime);
        const studio =
          anime.studios[0]?.name || anime.producers[0]?.name || "Studio TBA";
        const genre =
          anime.genres[0]?.name ||
          anime.themes[0]?.name ||
          anime.source ||
          "Anime";

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
      })}
    </div>
  );
}

function WatchFeedRail() {
  const { data, isLoading, isError } = useDiscoveryWatchFeed();

  if (isLoading) {
    return <DiscoverySidebarSkeleton />;
  }

  if (isError || !data?.length) {
    return (
      <p className="rounded-[1.35rem] border border-dashed border-soft-border bg-surface-muted px-4 py-6 text-sm leading-6 text-muted-foreground">
        Episode listings are temporarily unavailable from Jikan. This rail will
        populate again once the watch endpoint responds.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const latestEpisode = item.episodes[0];
        const title = getDisplayTitle(item.entry);

        return (
          <Link
            key={`${item.entry.mal_id}-${latestEpisode?.mal_id ?? "watch"}`}
            href={`/anime/${item.entry.mal_id}`}
            className="group flex gap-3 rounded-md border-b border-soft-border p-3 transition hover:border-primary/30 hover:bg-accent/35"
          >
            <PlaceholderImage
              src={getPosterUrl(item.entry)}
              alt={title}
              className="h-18.5 w-14 shrink-0 rounded-md"
              sizes="56px"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                {item.region_locked ? "Region locked" : "Streaming"}
              </p>
              <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 transition group-hover:text-primary">
                {title}
              </h4>
              <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                {latestEpisode?.title || "Latest episode available"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function RecommendationRail() {
  const { data, isLoading, isError } = useDiscoveryRecommendations();

  if (isLoading) {
    return <DiscoverySidebarSkeleton />;
  }

  if (isError || !data?.length) {
    return (
      <p className="rounded-[1.35rem] border border-dashed border-soft-border bg-surface-muted px-4 py-6 text-sm leading-6 text-muted-foreground">
        Recommendations are unavailable right now. The rest of the discovery
        panel is unaffected.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const primary = item.entry[0];
        const secondary = item.entry[1];
        const title = primary ? getDisplayTitle(primary) : "Recommendation";

        if (!primary) {
          return null;
        }

        return (
          <Link
            key={item.mal_id}
            href={`/anime/${primary.mal_id}`}
            className="group flex gap-3 rounded-md border-b border-soft-border  p-3 transition hover:border-primary/30 hover:bg-accent/35"
          >
            <PlaceholderImage
              src={getPosterUrl(primary)}
              alt={title}
              className="h-18.5 w-14 shrink-0 rounded-md"
              sizes="56px"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                {secondary
                  ? `Pairs with ${getDisplayTitle(secondary)}`
                  : "Community pick"}
              </p>
              <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 transition group-hover:text-primary">
                {title}
              </h4>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {item.content}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function Discover() {
  const discoveryTabs = buildDiscoveryTabs(new Date().getFullYear());
  const [activeSeason, setActiveSeason] = useState(
    discoveryTabs[0]?.value ?? "airing-now",
  );
  const [activeRail, setActiveRail] = useState("episodes");
  const activeTab =
    discoveryTabs.find((tab) => tab.value === activeSeason) ||
    discoveryTabs[0]!;

  return (
    <section className=" mx-auto max-w-7xl">
      <motion.div
        {...fadeUp}
        className="mt-8 grid gap-3 lg:grid-cols-[1.45fr_0.8fr]"
      >
        <div className="relative">
          <Tabs
            value={activeSeason}
            onValueChange={setActiveSeason}
            orientation="horizontal"
            className="mt-6 gap-2"
          >
            <TabsList
              variant="line"
              className="w-full flex-wrap justify-start gap-2 border-b border-border px-0 pb-2"
            >
              {discoveryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none px-0 pb-3 pt-0 text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeSeason} className="mt-6">
              <SeasonalShelf tab={activeTab} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="relative rounded-md border border-soft-border bg-surface-strong p-2">
          <Tabs
            value={activeRail}
            onValueChange={setActiveRail}
            orientation="horizontal"
            className="mt-6 gap-5"
          >
            <TabsList
              variant="line"
              className="w-full justify-start gap-5 border-b border-border px-0"
            >
              <TabsTrigger
                value="episodes"
                className="rounded-none p-1.5 text-sm"
              >
                Recent episodes
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="rounded-none p-1.5 text-sm"
              >
                Recommended
              </TabsTrigger>
            </TabsList>
            <TabsContent value="episodes" className="mt-6">
              <WatchFeedRail />
            </TabsContent>
            <TabsContent value="recommended" className="mt-6">
              <RecommendationRail />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </section>
  );
}
