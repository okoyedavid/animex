"use client";

import Hero from "@/components/landing/hero";
import {
  ArrowRight,
  Bookmark,
  Compass,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { SectionTitle } from "../components/SectionTitle";
import StartupGate from "../components/StartUpGate";
import Discover from "@/components/landing/discover";
import { Suspense } from "react";
import NavBar from "@/components/NavBar";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const watchlistReasons = [
  "Save titles while browsing and come back to them whenever you want.",
  "Keep your next picks in one place instead of searching for them again.",
  "Open any saved title and jump straight back into its anime page.",
];

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <NavBar />
      </Suspense>
      <main className="min-h-screen pb-16 pt-20">
        <StartupGate
          brand="Animex"
          tagline="Anime discovery, switched on."
          storageKey="animex_home_startup_v3"
        />
        <Hero />
        <Discover />
        <section className="mx-auto mt-20 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...fadeUp}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 shadow-cinema backdrop-blur-md sm:p-8"
            >
              <SectionTitle
                eyebrow="Watchlist value"
                title="Save anime when you log in, and keep your next picks ready."
                description="Your watchlist helps you keep track of anime worth returning to, whether you are browsing now or watching later."
              />
              <div className="mt-8 space-y-4">
                {watchlistReasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-0.5 inline-flex rounded-sm border border-white/10 bg-white/5 p-2 text-accent-soft">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-sm leading-7 ">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-strong p-6 shadow-cinema backdrop-blur-md sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,113,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(67,97,238,0.16),transparent_24%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ">
                  <Bookmark size={14} className="text-accent-soft" />
                  Save your picks
                </div>
                <h3 className="mt-6 font-display text-4xl leading-tight text-white">
                  Keep the anime you like close, even after you leave the page.
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 ">
                  If something catches your attention, save it. Your watchlist
                  makes it easy to return without trying to remember every title
                  later.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] ">
                      For new visitors
                    </p>
                    <p className="mt-3 text-sm leading-7 ">
                      Search freely, browse titles, and figure out what you want
                      to watch first.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] ">
                      For returning users
                    </p>
                    <p className="mt-3 text-sm leading-7 ">
                      Sign in, reopen saved anime, and keep your next watch
                      organized.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="mx-auto mt-20 max-w-7xl">
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,138,61,0.18),rgba(67,97,238,0.14),rgba(255,255,255,0.05))] p-8 shadow-cinema backdrop-blur-xl sm:p-10 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
                  Start here
                </p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
                  Use Animex to find new anime now, then sign in and save the
                  ones you do not want to lose.
                </h2>
                <p className="mt-5 text-base leading-8 ">
                  Start by exploring new anime, then save the ones you want to
                  keep close.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold  transition hover:bg-accent-soft"
                >
                  Explore anime
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  Create account
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
