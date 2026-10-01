// Save as: src/app/api/top-rated/route.ts
import { NextResponse } from "next/server";

const TYPES = ["movie", "tv"] as const;
type MediaType = (typeof TYPES)[number];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "movie";
  const page = searchParams.get("page") ?? "1";

  if (!TYPES.includes(type as MediaType)) {
    return NextResponse.json({ error: "Bad type" }, { status: 400 });
  }

  if (!/^\d+$/.test(page)) {
    return NextResponse.json({ error: "Bad page" }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB_API_KEY is missing from .env");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
      // The top rated list changes slowly, so cache it for a day.
      { next: { revalidate: 86400 } },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "TMDB error" }, { status: res.status });
    }

    const data = await res.json();

    // /movie/top_rated and /tv/top_rated don't include media_type, so add it.
    const results = (data.results ?? []).map(
      (item: Record<string, unknown>) => ({
        ...item,
        media_type: type,
      }),
    );

    return NextResponse.json({ ...data, results });
  } catch (error) {
    console.error("Error fetching top rated:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}