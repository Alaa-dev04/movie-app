
"use client";

import { useMovies } from "@/hooks/use-movies";
import { MovieCard } from "@/components/MoviesCard";
import FiltrationBar from "@/components/FiltrationBar";
import AppPagination from "@/components/AppPagination";
import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/movie-filters";
import TrailerModal, {
  type TrailerMedia,
} from "@/components/Trailer";
import { useState } from "react";
type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
};

export default function MovieGrid() {
  const { data, isFetching, isError } = useMovies();
  const [filters, setFilters] = useQueryStates(filterParsers);
  const [selectedMedia, setSelectedMedia] = useState<TrailerMedia | null>(null);
  return (
    <div className=" ">
      <FiltrationBar />

      <div className="relative top-30 min-h-60">
        {isError ? (
          <p className="relative top-20 p-4 text-center text-red-500">
            Something went wrong.
          </p>
        ) : isFetching && !data ? (
          <p className="relative top-20 p-4 text-center text-white">
            Loading...
          </p>
        ) : !data?.results?.length ? (
          <p className="relative top-20 p-4 text-center text-white">
            No movies found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
            {data.results.map((m: Movie) => (
              <MovieCard
                key={m.id}
                id={m.id}
                mediaType="movie"
                title={m.title}
                poster={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "/default_poster.jpg"
                }
                rating={m.vote_average}
                year={m.release_date?.split("-")[0] || "N/A"}
                onTrailerClick={() =>
                  setSelectedMedia({
                    id: m.id,
                    media_type: "movie",
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination stays visible */}
      <div className="relative top-30 bg-yellow-500/10 ">
        <AppPagination
          currentPage={filters.page}
          pageCount={data?.total_pages ?? 1}
          onPageChange={(page) => setFilters({ page })}
        />
      </div>
        <TrailerModal
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  );
}
