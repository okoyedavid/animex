"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useHeroTopAnime } from "@/hooks/useDiscoveryShelf";
import type { Anime } from "@/types/anime";

const SLIDE_INTERVAL_MS = 7000;

function getHeroImage(anime: Anime) {
  return (
    anime.images?.webp?.large_image_url ||
    anime.images?.jpg?.large_image_url ||
    anime.images?.webp?.image_url ||
    anime.images?.jpg?.image_url ||
    ""
  );
}

function getHeroTitle(anime: Anime) {
  return (
    anime.title_english || anime.title || anime.title_japanese || "Top anime"
  );
}

export default function Hero() {
  const { data: topAnime = [], isLoading, isError } = useHeroTopAnime(5);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [topAnime]);

  useEffect(() => {
    if (topAnime.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % topAnime.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [topAnime]);

  const activeAnime = topAnime[activeIndex];
  const backgroundImage = activeAnime ? getHeroImage(activeAnime) : "";
  const activeTitle = activeAnime ? getHeroTitle(activeAnime) : "Top anime";
  const titleWords = activeTitle.split(" ");
  const genres = activeAnime?.genres?.slice(0, 3) ?? [];

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {backgroundImage ? (
            <motion.div
              key={activeAnime?.mal_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={backgroundImage}
                alt=""
                fill
                className="object-cover object-top"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              key="hero-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,153,102,0.28),transparent_28%),linear-gradient(135deg,#0a0a0f_0%,#11131d_45%,#171b2b_100%)]"
            />
          )}
        </AnimatePresence>
        {/* Left-to-right fade so text side is dark, image bleeds right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        {/* Bottom fade to blend into page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative z-10 min-h-[620px] p-6 sm:p-8 lg:p-12 flex items-center"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs text-accent font-medium uppercase tracking-[0.24em]"
          >
            <Sparkles size={14} />
            Live top-rated anime from Jikan
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAnime?.mal_id ?? "hero-empty"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
                className="mt-6 font-display text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
              >
                {titleWords.map((word, i) => (
                  <span
                    key={`${activeAnime?.mal_id ?? "static"}-${word}-${i}`}
                    className={i < 3 ? "text-primary" : "text-white"}
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.6, ease: "easeOut" }}
                className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/75"
              >
                {activeAnime?.score ? (
                  <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/10 px-3 py-2">
                    <Star
                      size={14}
                      className="text-primary"
                      fill="currentColor"
                    />
                    {activeAnime.score.toFixed(2)} score
                  </span>
                ) : null}
                {activeAnime?.rank ? (
                  <span className="rounded-sm border border-white/10 bg-white/10 px-3 py-2">
                    #{activeAnime.rank} ranked
                  </span>
                ) : null}
                {genres.map((genre) => (
                  <span
                    key={`${activeAnime?.mal_id}-${genre.mal_id}`}
                    className="rounded-sm border border-white/10 bg-white/10 px-3 py-2"
                  >
                    {genre.name}
                  </span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.7, ease: "easeOut" }}
                className="mt-6 max-w-xl text-base leading-8 text-white/70 line-clamp-4 sm:text-lg"
              >
                {isLoading
                  ? "Loading the current top-scoring anime from Jikan."
                  : isError
                    ? "The live anime feed is unavailable right now. You can still explore the full catalog."
                    : activeAnime?.synopsis ||
                      "No synopsis is available for this title yet."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.6, ease: "easeOut" }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={
                    activeAnime ? `/anime/${activeAnime.mal_id}` : "/search"
                  }
                  className="inline-flex items-center gap-2 rounded-sm bg-primary text-white px-5 py-3 text-sm font-semibold transition hover:bg-accent-soft"
                >
                  Read more
                </Link>
                <Link
                  href="/search"
                  className="inline-flex text-accent items-center gap-2 rounded-sm border border-ring/30 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-white/25 hover:bg-white/10"
                >
                  Browse anime
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
