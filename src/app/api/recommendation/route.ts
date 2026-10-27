import { NextResponse } from "next/server";

const API_URL = "https://api.themoviedb.org/3";

type MediaType = "movie" | "tv";

interface Recommendation {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
}

export async function GET(request: Request) {
  const recomm = new URL(request.url).searchParams.get("items") || "";

  const picks = recomm
    .split(",")
    .slice(0, 5)
    .map((r) => {
      const [type, id] = r.split(":");
      return { type, id };
    })
    .filter(
      (p) =>
        (p.type === "movie" || p.type === "tv") &&
        /^\d+$/.test(p.id ?? ""),
    );

  if (picks.length === 0) {
    return NextResponse.json({ results: [] });
  }

  const lists = await Promise.all(
    picks.map(async (p) => {
      const res = await fetch(
        `${API_URL}/${p.type}/${p.id}/recommendations?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 3600 } },
      );

      if (!res.ok) return [];

      const data: { results: Recommendation[] } = await res.json();

      return data.results.map((r) => ({
        ...r,
        media_type: p.type,
      }));
    }),
  );

  return NextResponse.json({ results: lists.flat() });
}