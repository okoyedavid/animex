"use client";

import StartupGate from "../components/StartUpGate";
import Link from "next/link";
import { ArrowRight, Compass, PlayCircle, Radar, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 pt-30 pb-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.5rem] border border-white/10 p-8 shadow-cinema backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-200">
            <Sparkles size={14} className="text-accent-soft" />
            Anime discovery engine
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Search faster. Pick better. Stay inside the story.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Animex gives you a dedicated search flow for your favorite anime
            titles, genres, and recommendations, allowing you to create a
            watchList and save the best animes for
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
            >
              Start searching
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2"></div>
      </section>
    </main>
  );
}
