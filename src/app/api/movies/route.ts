
import { NextResponse } from "next/server";

const API = "https://api.themoviedb.org/3";

interface TMDBMovie {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  original_language: string;
}

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;

  const term = sp.get("term")?.trim() || "";
  const genre = sp.get("genre") || "";
  const year = sp.get("year") || "";
  const rating = sp.get("rating") || "";
  const language = sp.get("language") || "";
  const sort = sp.get("sort") || "popularity.desc";
  const page = sp.get("page") || "1";

  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page,
  });

  // Search by title, then apply the selected filters.
  if (term) {
    params.set("query", term);

    if (year) params.set("year", year);

    const res = await fetch(`${API}/search/movie?${params}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to search movies" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const results = (data.results as TMDBMovie[]).filter(
      (movie) =>
        (!genre || movie.genre_ids.includes(Number(genre))) &&
        (!rating || movie.vote_average >= Number(rating)) &&
        (!language || movie.original_language === language),
    );

    return NextResponse.json({
      ...data,
      results,
    });
  }

  // No title: let Discover apply the filters directly.
  params.set("sort_by", sort);

  if (genre) params.set("with_genres", genre);
  if (year) params.set("primary_release_year", year);
  if (rating) params.set("vote_average.gte", rating);
  if (language) params.set("with_original_language", language);

  const res = await fetch(`${API}/discover/movie?${params}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: res.status },
    );
  }

  return NextResponse.json(await res.json());
}
