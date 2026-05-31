"use client";

import { ArrowRight, Bookmark, Search, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const quickSteps = [
  {
    icon: Search,
    label: "Browse now",
    detail: "Open the catalog and move through current titles quickly.",
  },
  {
    icon: Bookmark,
    label: "Keep picks",
    detail: "Save anything worth revisiting before it disappears from view.",
  },
  {
    icon: UserPlus,
    label: "Make it yours",
    detail: "Create an account when you want your list to stay with you.",
  },
];

export default function CTA() {
  return (
    <section className="mx-auto mt-20 max-w-7xl">
      <motion.div
        {...fadeUp}
        className="overflow-hidden rounded-md border border-soft-border bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] shadow-cinema"
      >
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-soft-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Continue browsing
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl leading-tight text-foreground sm:text-3xl">
              Find something first. Save it only when it earns a place in your
              next watch queue.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              The flow should stay simple: scan titles, open details, then keep
              the ones that still matter after the first click.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-accent-soft"
              >
                Explore anime
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-sm border border-soft-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/35 hover:text-primary"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="grid divide-y divide-soft-border">
            {quickSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className="grid grid-cols-[auto_1fr] gap-4 p-5 sm:p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/20 bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/80">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
