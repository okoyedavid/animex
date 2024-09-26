import { useEffect, useState } from "react";
import { Axios } from "./Axios";

export function useGetMovie(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before fetching new data
        const { data } = await Axios.get(`/anime?q=${query}`, {
          signal: controller.signal,
        });

        if (data.data.length < 1) {
          setError("couldnt find anime with that name");
        } else {
          setAnime(data.data);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching anime", error);
          setError("Could not fetch anime");
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchRecommendations, 500); // jikan has a limiter, implemented Debounce to avoid rate limits

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { loading, error, anime };
}
