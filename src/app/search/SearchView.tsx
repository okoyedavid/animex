"use client";

import Animex from "@/components/Animex";

type SearchViewProps = {
  query: string;
};

export default function SearchView({ query }: SearchViewProps) {
  return <Animex query={query} />;
}
