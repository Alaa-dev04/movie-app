
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("media_type");

  if (!id || !/^\d+$/.test(id) || (type !== "movie" && type !== "tv")) {
    return NextResponse.json({ error: "Bad params" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}&include_video_language=en,null`,
    );

    if (!res.ok) {
      return NextResponse.json({ error: "TMDB error" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}