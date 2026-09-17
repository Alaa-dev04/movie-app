import { NextRequest, NextResponse } from "next/server";

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genres?: TMDBGenre[];
  genre_ids?: number[];
  runtime?: number;
}

interface TrendingResponse {
  results: TMDBMovie[];
}

interface MovieDetailsResponse extends TMDBMovie {
  genres: TMDBGenre[];
  runtime: number;
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      
    );

    if (!res.ok) {
      throw new Error(`TMDB API request failed with status ${res.status}`);
    }

    const data: TrendingResponse = await res.json();
    const movies = data.results ? data.results.slice(0, 3) : [];

    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`,
        );

        if (!detailRes.ok) {
          return movie;
        }

        const detailData: MovieDetailsResponse = await detailRes.json();
        return {
          ...movie,
          genres: detailData.genres,
          runtime: detailData.runtime,
        };
      }),
    );

    return NextResponse.json({ results: detailedMovies });
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 },
    );
  }
}