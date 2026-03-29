import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export function useAnimeSearch(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ["anime-search", normalizedQuery],
    enabled: normalizedQuery.length > 0,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data } = await api.get(`/anime?q=${encodeURIComponent(normalizedQuery)}`);
      return data.data ?? [];
    },
  });
}
