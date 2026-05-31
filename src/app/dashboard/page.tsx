"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Bookmark,
  CheckCircle2,
  Clock3,
  Eye,
  KeyRound,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getWatchlist,
  WATCHLIST_LIMIT,
  type WatchlistEntry,
} from "@/utils/watchlistStorage";
import {
  useDiscoveryRecommendations,
  useDiscoverySeasonalAnime,
} from "@/hooks/useDiscoveryShelf";
import type { Anime, AnimeReference } from "@/types/anime";
import { PlaceholderImage } from "@/components/PlaceholderImage";

function getAnimeImage(anime: Anime | AnimeReference) {
  return (
    anime.images?.webp?.large_image_url ||
    anime.images?.jpg?.large_image_url ||
    anime.images?.webp?.image_url ||
    anime.images?.jpg?.image_url ||
    "/image.png"
  );
}

function getUserFirstName(name?: string) {
  return name?.trim().split(" ")[0] || "there";
}

export default function DashboardPage() {
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const { data: userResponse, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const { data: seasonalAnime = [], isLoading: isSeasonalLoading } =
    useDiscoverySeasonalAnime({ type: "now" }, 5);
  const { data: recommendations = [], isLoading: isRecommendationsLoading } =
    useDiscoveryRecommendations(4);

  const user = userResponse?.data;
  const isEmailVerified = Boolean(user?.emailVerifiedAt);
  const recentWatchlist = watchlist.slice(0, 4);
  const recommendationEntries = recommendations
    .flatMap((item) => item.entry)
    .slice(0, 4);

  const pendingIssues = useMemo(() => {
    const issues = [];

    if (!isUserLoading && !isEmailVerified) {
      issues.push({
        title: "Verify your email",
        detail:
          "Email verification protects account recovery and unlocks safer account changes.",
        href: `/verify-email?email=${encodeURIComponent(user?.email ?? "")}`,
        action: "Verify email",
        severity: "high",
      });
    }

    issues.push({
      title: "Enable two-factor authentication",
      detail:
        "Authenticator-app 2FA is the next security layer to implement in your backend.",
      href: "/dashboard/settings",
      action: "Set up 2FA",
      severity: "medium",
    });

    if (watchlist.length === 0) {
      issues.push({
        title: "Build your watchlist",
        detail:
          "Save anime from detail pages so the dashboard can become more personalized.",
        href: "/search",
        action: "Find anime",
        severity: "low",
      });
    }

    return issues;
  }, [isEmailVerified, isUserLoading, user?.email, watchlist.length]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Badge variant="outline" className="rounded-md">
            Animex dashboard
          </Badge>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Welcome back, {getUserFirstName(user?.name)}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Review your account health, continue saved anime, and discover
              titles worth adding to your list.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Watchlist",
                value: `${watchlist.length}/${WATCHLIST_LIMIT}`,
                detail: "saved locally",
                icon: Bookmark,
              },
              {
                title: "Email",
                value: isEmailVerified ? "Verified" : "Pending",
                detail: isEmailVerified ? "recovery ready" : "action needed",
                icon: isEmailVerified ? CheckCircle2 : AlertTriangle,
              },
              {
                title: "Recommendations",
                value: String(recommendationEntries.length),
                detail: "fresh picks",
                icon: Sparkles,
              },
              {
                title: "Security",
                value: pendingIssues.length ? `${pendingIssues.length} issues` : "Clear",
                detail: "review queue",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="border-border/70 shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {item.title}
                    </CardTitle>
                    <Icon className="size-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold tracking-tight">
                      {item.value}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-4 text-primary" />
              Pending issues
            </CardTitle>
            <CardDescription>
              Fix these first to make the account more secure and useful.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingIssues.map((issue) => (
              <div
                key={issue.title}
                className="rounded-lg border border-border bg-background/80 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{issue.title}</p>
                      <Badge
                        variant={
                          issue.severity === "high" ? "destructive" : "outline"
                        }
                        className="rounded-md"
                      >
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {issue.detail}
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link href={issue.href}>
                    {issue.action}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader className="gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="size-4 text-primary" />
                Continue your watchlist
              </CardTitle>
              <CardDescription>
                Local saved anime from this browser.
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/watchlist">Open watchlist</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentWatchlist.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentWatchlist.map((item) => (
                  <Link
                    key={item.mal_id}
                    href={`/anime/${item.mal_id}`}
                    className="group overflow-hidden rounded-lg border border-border bg-surface transition hover:border-primary/40"
                  >
                    <PlaceholderImage
                      src={item.image}
                      alt={item.title}
                      className="aspect-[0.72] w-full"
                      sizes="(max-width: 768px) 50vw, 18vw"
                    />
                    <div className="p-3">
                      <p className="line-clamp-2 font-medium leading-5 group-hover:text-primary">
                        {item.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {item.synopsis || "No synopsis saved yet."}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center">
                <Eye className="mb-3 size-8 text-primary" />
                <h2 className="text-xl font-semibold">No saved anime yet</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  Search for an anime, open its detail page, and save it to
                  start building your dashboard.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/search">Search anime</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="size-4 text-primary" />
              Security next steps
            </CardTitle>
            <CardDescription>
              Backend work that directly improves account protection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Persist sessions per refresh token",
              "Add email-change confirmation",
              "Add TOTP setup and backup codes",
              "Record append-only security events",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/settings">Open settings contract</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              Airing now
            </CardTitle>
            <CardDescription>
              Current seasonal anime worth checking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isSeasonalLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-20 animate-pulse rounded-lg bg-muted"
                    />
                  ))
                : seasonalAnime.map((anime) => (
                    <Link
                      key={anime.mal_id}
                      href={`/anime/${anime.mal_id}`}
                      className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-lg border border-border bg-surface p-2 transition hover:border-primary/40"
                    >
                      <PlaceholderImage
                        src={getAnimeImage(anime)}
                        alt={anime.title_english || anime.title}
                        className="aspect-square rounded-md"
                        sizes="56px"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {anime.title_english || anime.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {anime.type || "Anime"} · {anime.episodes ?? "?"} eps
                        </p>
                      </div>
                      <Badge variant="secondary" className="rounded-md">
                        {anime.score ?? "New"}
                      </Badge>
                    </Link>
                  ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Recommended picks
            </CardTitle>
            <CardDescription>
              Pulled from current anime recommendation activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isRecommendationsLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-20 animate-pulse rounded-lg bg-muted"
                    />
                  ))
                : recommendationEntries.map((anime) => (
                    <Link
                      key={`${anime.mal_id}-${anime.title}`}
                      href={`/anime/${anime.mal_id}`}
                      className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-lg border border-border bg-surface p-2 transition hover:border-primary/40"
                    >
                      <PlaceholderImage
                        src={getAnimeImage(anime)}
                        alt={anime.title}
                        className="aspect-square rounded-md"
                        sizes="56px"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{anime.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Recommended by the community
                        </p>
                      </div>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Last account check",
            value: "On page load",
            icon: Clock3,
          },
          {
            label: "Notification health",
            value: isEmailVerified ? "Ready" : "Email pending",
            icon: Bell,
          },
          {
            label: "Backend reference",
            value: "settings/backend.ts",
            icon: ShieldCheck,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="shadow-none">
              <CardContent className="flex items-center gap-3 pt-4">
                <Icon className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
