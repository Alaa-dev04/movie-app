"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieCard } from "./MoviesCard";
import TrailerModal, { type TrailerMedia } from "./Trailer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TMDBMovie {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface TrendingResponse {
  results: TMDBMovie[];
}

async function fetchTrending(): Promise<TrendingResponse> {
  const res = await fetch("/api/trendingmovies?type=movie");

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return res.json();
}

async function fetchTopRated(): Promise<TrendingResponse> {
  const res = await fetch("/api/toprating?type=movie");

  if (!res.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  return res.json();
}

const getYear = (m: TMDBMovie): string =>
  (m.release_date || m.first_air_date || "").split("-")[0] || "N/A";

const TrendingMovies = () => {
  const [trailerMedia, setTrailerMedia] =
    useState<TrailerMedia | null>(null);

  // Trending movies
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: fetchTrending,
    staleTime: 60 * 60 * 1000,
    select: (d) => d.results,
  });

  // Top rated movies
  const {
    data: topRatedMovies = [],
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
  } = useQuery({
    queryKey: ["top-rated", "movie"],
    queryFn: fetchTopRated,
    staleTime: 60 * 60 * 1000,
    select: (d) => d.results,
  });

  // Loading trending movies
  if (isLoading) {
    return (
      <section className="px-4 py-10 sm:px-8 md:px-20">
        <div className="mb-6 h-8 w-56 animate-pulse rounded bg-neutral-800" />

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] w-[180px] shrink-0 animate-pulse rounded-lg bg-neutral-800"
            />
          ))}
        </div>
      </section>
    );
  }

  // Trending movies error
  if (isError || movies.length === 0) {
    return (
      <p className="px-4 py-10 text-white sm:px-8 md:px-20">
        Couldn&apos;t load trending movies.
      </p>
    );
  }

  // Loading top rated movies
  if (isTopRatedLoading) {
    return (
      <section className="px-4 py-10 sm:px-8 md:px-20">
        <div className="mb-6 h-8 w-56 animate-pulse rounded bg-neutral-800" />

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] w-[180px] shrink-0 animate-pulse rounded-lg bg-neutral-800"
            />
          ))}
        </div>
      </section>
    );
  }

  // Top rated movies error
  if (isTopRatedError || topRatedMovies.length === 0) {
    return (
      <p className="px-4 py-10 text-white sm:px-8 md:px-20">
        Couldn&apos;t load top rated movies.
      </p>
    );
  }

  return (
    <div>
      {/* Trending Movies */}
      <section className="px-4 py-10 sm:px-8 md:px-20">
        <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
          Trending Movies
        </h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <MovieCard
                  id={movie.id}
                  mediaType={movie.media_type}
                  title={movie.title || movie.name || "Untitled"}
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/default_poster.jpg"
                  }
                  rating={movie.vote_average}
                  year={getYear(movie)}
                  onTrailerClick={() =>
                    setTrailerMedia({
                      id: movie.id,
                      media_type: movie.media_type,
                    })
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <TrailerModal
          media={trailerMedia}
          onClose={() => setTrailerMedia(null)}
        />
      </section>

      {/* Top Rated Movies */}
      <section className="px-4 py-10 sm:px-8 md:px-20">
        <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
          Top Rated Movies
        </h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {topRatedMovies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <MovieCard
                  id={movie.id}
                  mediaType={movie.media_type}
                  title={movie.title || movie.name || "Untitled"}
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/default_poster.jpg"
                  }
                  rating={movie.vote_average}
                  year={getYear(movie)}
                  onTrailerClick={() =>
                    setTrailerMedia({
                      id: movie.id,
                      media_type: movie.media_type,
                    })
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <TrailerModal
          media={trailerMedia}
          onClose={() => setTrailerMedia(null)}
        />
      </section>
    </div>
  );
};

export default TrendingMovies;