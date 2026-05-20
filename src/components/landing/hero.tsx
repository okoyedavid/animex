"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { animeData } from "./data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={animeData.images.webp.large_image_url}
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
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
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs text-accent font-medium uppercase tracking-[0.24em]"
          >
            <Sparkles size={14} />
            Find anime you will actually want to watch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
            className="mt-6 font-display text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
          >
            {animeData.title_english.split(" ").map((word, i) => (
              <span key={i} className={i < 3 ? "text-primary" : "text-white"}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: "easeOut" }}
            className="mt-6 max-w-lg text-base leading-8 text-white/70 line-clamp-3 sm:text-md"
          >
            {animeData.synopsis}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-sm bg-primary text-white px-5 py-3 text-sm font-semibold transition hover:bg-accent-soft"
            >
              Read More
            </Link>
            <Link
              href="/signin"
              className="inline-flex text-accent items-center gap-2 rounded-sm border border-ring/30 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-white/25 hover:bg-white/10"
            >
              Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
