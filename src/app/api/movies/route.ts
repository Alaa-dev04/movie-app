import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const language = searchParams.get("language") || "";
  const sort = searchParams.get("sort") || "popularity.desc";
  const page = searchParams.get("page") || "1";
    const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page,
    sort_by: sort,
  });
  if (genre) params.set("with_genres", genre);
  if (year) params.set("primary_release_year", year);
  if (rating) params.set("vote_average.gte", rating);
  if (language) params.set("with_original_language", language);

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
  );
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: response.status },
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
