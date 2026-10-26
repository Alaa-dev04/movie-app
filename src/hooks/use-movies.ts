"use client";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { Filters, filterParsers } from "@/lib/movie-filters";

async function fetchMovies(filters: Filters) {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).map(([Key, value]) => [Key, String(value)]),
    ),
  );
  const res = await fetch(`/api/movies?${params}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export function useMovies() {
  const [applied] = useQueryStates(filterParsers);
  return useQuery({
    queryKey: ["movies", applied],
    queryFn: () => fetchMovies(applied),
  });
}
