import React from "react";
import { Sparkles, Telescope } from "lucide-react";
import AnimexItem from "./AnimexItem";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import Error from "../common/Error";
import Loading from "../common/Loading";
import { ScrollArea } from "./ui/scroll-area";

const Animex = ({ backgroundImage, query }) => {
  const normalizedQuery = query.trim();
  const {
    data: anime = [],
    isLoading,
    isFetching,
    isError,
  } = useAnimeSearch(normalizedQuery);

  const errorMessage =
    normalizedQuery.length > 0 && anime.length < 1
      ? "We could not find an anime that matches that search."
      : "Could not fetch anime.";

  return (
    <main className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 h-screen bg-cover bg-center opacity-20 saturate-150"
        style={{ backgroundImage }}
      />

      <div className="relative pt-18">
        <ScrollArea className="h-[90vh] md:h-[90vh] p-4">
          <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-10 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-200">
                  <Sparkles size={14} className="text-accent-soft" />
                  Anime search, redesigned
                </div>
                <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Discover your next Anime obsession.
                </h1>
              </div>
            </div>

            {isLoading || isFetching ? (
              <Loading />
            ) : isError ? (
              <Error err="Could not fetch anime." />
            ) : anime.length > 0 ? (
              <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {anime.map((item) => (
                  <AnimexItem item={item} key={item.mal_id} />
                ))}
              </ul>
            ) : normalizedQuery ? (
              <Error err={errorMessage} />
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 text-center shadow-cinema backdrop-blur-md">
                <div className="mb-5 rounded-full border border-white/10 bg-white/5 p-4 text-accent-soft">
                  <Telescope size={28} />
                </div>
                <h2 className="font-display text-2xl text-white">
                  Start with a title you already love.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Try searching for genres, classic series, or recent releases.
                  The layout is tuned to keep discovery quick instead of forcing
                  you through clutter.
                </p>
              </div>
            )}
          </section>
        </ScrollArea>
      </div>
    </main>
  );
};

export default Animex;
