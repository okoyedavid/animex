"use client";

import { Bookmark, Clock3, ShieldCheck, Star } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const watchlistReasons = [
  {
    icon: Bookmark,
    label: "Save during discovery",
    detail: "Keep strong titles nearby instead of searching for them again.",
  },
  {
    icon: Clock3,
    label: "Return faster",
    detail: "Pick up where you left off when a title still looks worth watching.",
  },
  {
    icon: ShieldCheck,
    label: "Stay organized",
    detail: "Signed-in users keep one reliable shortlist across sessions.",
  },
];

const watchlistPreview = [
  {
    title: "Blue Lock",
    meta: "TV Series",
    score: "8.2",
    state: "Saved",
  },
  {
    title: "Attack on Titan",
    meta: "Final Chapters",
    score: "9.0",
    state: "Queued",
  },
  {
    title: "Black Butler",
    meta: "Fantasy",
    score: "7.9",
    state: "Watching",
  },
];

export default function WatchList() {
  return (
    <section className="mx-auto mt-20 max-w-7xl">
      <div className="grid gap-3 lg:grid-cols-[1.18fr_0.82fr]">
        <motion.div
          {...fadeUp}
          className="rounded-md border border-soft-border bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] shadow-cinema"
        >
          <div className="border-b border-soft-border p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Watchlist rules
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl leading-tight text-foreground sm:text-3xl">
              A saved list works best when it stays small, visible, and easy to
              reopen.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              The strongest watchlist behavior is simple: discover quickly, save
              selectively, and return without friction.
            </p>
          </div>

          <div className="grid divide-y divide-soft-border">
            {watchlistReasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.label}
                  className="grid grid-cols-[auto_1fr] gap-4 p-5 sm:p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/20 bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {reason.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/80">
                      {reason.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="rounded-md border border-soft-border bg-surface-strong shadow-cinema"
        >
          <div className="border-b border-soft-border p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Saved anime
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Compact queue preview
                </h3>
              </div>
              <div className="rounded-sm border border-soft-border bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                12 titles
              </div>
            </div>
          </div>

          <div className="p-3">
            {watchlistPreview.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[52px_1fr_auto] items-center gap-3 border-b border-soft-border px-3 py-3 last:border-b-0"
              >
                <div className="flex h-[72px] w-[52px] items-end rounded-sm bg-[linear-gradient(180deg,rgba(255,163,92,0.95),rgba(84,41,9,0.92))] p-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                  Anime
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                    {item.state}
                  </p>
                  <h4 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.meta}
                  </p>
                </div>
                <div className="text-right">
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    <Star size={12} className="text-primary" />
                    {item.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
