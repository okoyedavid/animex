"use client";

import Animex from "@/components/Animex";
import { useRandomBackground } from "@/hooks/useRandomBackground";

type SearchViewProps = {
  query: string;
};

export default function SearchView({ query }: SearchViewProps) {
  const backgroundImage = useRandomBackground();

  return <Animex backgroundImage={backgroundImage} query={query} />;
}
