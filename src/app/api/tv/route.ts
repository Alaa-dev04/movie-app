import { NextResponse } from "next/server";

const API = "https://api.themoviedb.org/3";

interface TMDBShow {
  id: number;
  name: string;
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
  const page = sp.get("page") || "1";


  const rawSort = sp.get("sort") || "popularity.desc";
  const sort =
    rawSort === "primary_release_date.desc" ? "first_air_date.desc" : rawSort;

  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page,
  });


  if (term) {
    params.set("query", term);
    if (year) params.set("first_air_date_year", year);

    const res = await fetch(`${API}/search/tv?${params}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to search series" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const results = (data.results as TMDBShow[]).filter(
      (show) =>
        (!genre || show.genre_ids.includes(Number(genre))) &&
        (!rating || show.vote_average >= Number(rating)) &&
        (!language || show.original_language === language),
    );

    return NextResponse.json({ ...data, results });
  }


  params.set("sort_by", sort);
  params.set("vote_count.gte", "20"); 

  if (genre) params.set("with_genres", genre);
  if (year) params.set("first_air_date_year", year);
  if (rating) params.set("vote_average.gte", rating);
  if (language) params.set("with_original_language", language);

  const res = await fetch(`${API}/discover/tv?${params}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch series" },
      { status: res.status },
    );
  }

  return NextResponse.json(await res.json());
}