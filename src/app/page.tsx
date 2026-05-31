"use client";

import NavBar from "@/components/NavBar";
import CTA from "@/components/landing/cta";
import Discover from "@/components/landing/discover";
import Hero from "@/components/landing/hero";
import WatchList from "@/components/landing/watchlist";
import { Suspense } from "react";
import StartupGate from "../components/StartUpGate";

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
        <WatchList />
        <CTA />
      </main>
    </>
  );
}
