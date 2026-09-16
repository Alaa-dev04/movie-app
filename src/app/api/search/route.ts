import { NextRequest, NextResponse } from "next/server";

interface TMDBResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;          // present on movies
  name?: string;            // present on tv shows and people
  poster_path: string | null;
  release_date?: string;    // movies
  first_air_date?: string;  // tv shows
  vote_average?: number;
  popularity?: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }

  const apiKey = process.env.TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`TMDB API request failed with status ${response.status}`);
    }
    const data = await response.json();

    const filteredResults: TMDBResult[] =
      data.results
        ?.filter(
          (item: TMDBResult) =>
            item.media_type === "movie" || item.media_type === "tv",
        )
        .slice(0, 5) || [];

    return NextResponse.json({ results: filteredResults });
  } catch (error) {
    console.error("Error fetching data from TMDB API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from TMDB API" },
      { status: 500 },
    );
  }
}