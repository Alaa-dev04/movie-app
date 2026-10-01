import { NextResponse } from "next/server";
//"Give me the type of whatever I would get if I accessed this array/tuple using a number."
//Because arrays are accessed using numbers:
const TYPES = ["movie", "tv"] as const;
type MediaType = (typeof TYPES)[number];
export async function GET(req: Request) {
  const type = new URL(req.url).searchParams.get("type") ?? "movie";
  if (!TYPES.includes(type as MediaType)) {
    return NextResponse.json({ error: "Bad type" }, { status: 400 });
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
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}&language=en-US`,
      ///cash on the server so we dont request every time the cahes is for an hour
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) {
      return NextResponse.json({ error: "TMDB error" }, { status: res.status });
    }
    const data = await res.json();
    const results = (data.results ?? []).map(
      (item: Record<string, unknown>) => ({
        ...item,
        media_type: type,
      }),
    );
    return NextResponse.json({ results });
  } catch(error) {
    console.error("Error fetching trending:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
