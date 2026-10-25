import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("term");
    if (!query) {
    return NextResponse.json({ results: [] });
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
    if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
