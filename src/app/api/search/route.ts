import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
    if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`TMDB API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    }
    catch (error) {
        console.error("Error fetching data from TMDB API:", error);
        return NextResponse.json({ error: "Failed to fetch data from TMDB API" }, { status: 500 });
    }

}