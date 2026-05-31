import React from "react";
import { Sparkles, Telescope } from "lucide-react";
import AnimexItem from "./AnimexItem";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import Error from "../common/Error";
import Loading from "../common/Loading";
import { ScrollArea } from "./ui/scroll-area";

const Animex = ({ query }) => {
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
      <div className="relative">
        <ScrollArea className="h-[96vh] md:h-[96vh] p-4">
          <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            {normalizedQuery && (
              <div className="max-w-3xl">
                <span className="font-display text-xl leading-tight sm:text-2xl lg:text-3xl">
                  Search Results for{" "}
                  <span className="text-primary">{normalizedQuery}</span>
                </span>
              </div>
            )}

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
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md border border-dashed border-white/15 bg-muted px-6 text-center shadow-cinema backdrop-blur-md">
                <div className="mb-5 rounded-sm border border-primary/10 bg-foreground/5 p-4 ">
                  <Telescope size={28} />
                </div>
                <h2 className="font-display text-2xl">
                  Start with a title you already love.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-foreground sm:text-base">
                  Try searching for genres, classic series, or recent releases
                  to start building your next watchlist.
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
