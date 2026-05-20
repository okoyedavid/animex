"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function StartupGate({
  brand = "Animex",
  tagline = "Find your next anime.",
  duration = 1800,
  storageKey = "animex_startup_seen",
}) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    const seen = sessionStorage.getItem(storageKey);
    if (seen || mediaQuery.matches) {
      return () =>
        mediaQuery.removeEventListener("change", updateReducedMotion);
    }

    sessionStorage.setItem(storageKey, "true");
    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setShow(false);
    }, duration);

    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        setShow(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", updateReducedMotion);
      document.body.style.overflow = "";
    };
  }, [duration, storageKey]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, show]);

  if (!mounted) return null;
  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="fixed inset-0 z-[999] overflow-hidden bg-black"
          role="dialog"
          aria-label="Animex startup"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,190,47,0.16),transparent_24%),linear-gradient(180deg,rgba(255,190,47,0.08),transparent_35%),linear-gradient(180deg,#05070c_0%,#090d16_45%,#040507_100%)]" />

          <motion.div
            initial={{ scaleY: 0.02, opacity: 0.15 }}
            animate={{
              scaleY: [0.02, 0.08, 1],
              opacity: [0.15, 0.88, 0.7],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.2, 1],
              ease: "easeInOut",
            }}
            className="absolute inset-0 origin-center"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.24) 0%, rgba(120,200,255,0.10) 20%, rgba(0,0,0,0) 55%)",
              filter: "blur(10px)",
            }}
          />

          <motion.div
            initial={{ scaleX: 0.15, opacity: 0.95 }}
            animate={{
              scaleX: [0.15, 1.2, 1],
              opacity: [0.95, 0.6, 0],
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white"
            style={{
              boxShadow:
                "0 0 12px rgba(255,255,255,0.8), 0 0 40px rgba(100,180,255,0.45)",
            }}
          />

          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 2px, transparent 4px)",
              mixBlendMode: "screen",
            }}
          />

          <motion.div
            initial={{ opacity: 0.06 }}
            animate={{ opacity: [0.04, 0.09, 0.05, 0.08, 0.03] }}
            transition={{ duration: 0.9, repeat: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")",
              mixBlendMode: "screen",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="max-w-2xl text-center">
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.28em" }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="text-[11px] font-semibold uppercase text-[#ffbe2f]/80"
              >
                Startup Sequence
              </motion.p>
              <div className="mt-4 bg-[linear-gradient(180deg,#fff8d7_0%,#ffbe2f_45%,#ff9326_100%)] bg-clip-text text-4xl font-semibold uppercase tracking-[0.22em] text-transparent md:text-6xl">
                {brand}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.35 }}
                className="mt-4 text-sm uppercase tracking-[0.28em] text-white/58"
              >
                {tagline}
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.35 }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3"
          >
            <div className="h-1.5 w-24 overflow-hidden rounded-sm bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="h-full bg-[linear-gradient(90deg,#ffbe2f,#fff5c4)]"
              />
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-sm border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/78 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Skip
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
