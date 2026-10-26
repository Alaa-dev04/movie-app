"use client";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { TvFilters, tvFilterParsers } from "@/lib/tv-series";

async function fetchTv(filters: TvFilters) {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, String(value)]),
    ),
  );
  const res = await fetch(`/api/tv?${params}`);
  if (!res.ok) throw new Error("Failed to fetch series");
  return res.json();
}

export function useTv() {
  const [applied] = useQueryStates(tvFilterParsers);
  return useQuery({
    queryKey: ["tv", applied],
    queryFn: () => fetchTv(applied),
  });
}