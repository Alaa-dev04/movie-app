import { NextResponse } from "next/server";
const API_URL = "https://api.themoviedb.org/3";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const mediaType = searchParams.get("media_type");
  if (!id || (mediaType !== "movie" && mediaType !== "tv")) {
    return NextResponse.json(
      { error: "Invalid id or media type" },
      { status: 400 },
    );
  }
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB API key is missing" },
      { status: 500 },
    );
  }
   const response = await fetch(
    `${API_URL}/${mediaType}/${id}?api_key=${apiKey}&append_to_response=credits`,
  );
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch details" },
      { status: response.status },
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}

