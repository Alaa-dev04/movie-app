"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { useTv } from "@/hooks/use-series";
import { tvFilterParsers } from "@/lib/tv-series";
import { MovieCard } from "@/components/MoviesCard";
import TvFiltrationBar from "@/components/FiltrationBar";
import AppPagination from "@/components/AppPagination";
import TrailerModal, { type TrailerMedia } from "@/components/Trailer";

type Show = {
  id: number;
  name: string; 
  poster_path: string | null;
  vote_average: number;
  first_air_date?: string; 
};

export default function TvGrid() {
  const { data, isFetching, isError } = useTv();
  const [filters, setFilters] = useQueryStates(tvFilterParsers);
  const [selectedMedia, setSelectedMedia] = useState<TrailerMedia | null>(null);

  return (
    <div className="  ">
      <TvFiltrationBar />

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
            No series found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
            {data.results.map((s: Show) => (
              <MovieCard
                key={s.id}
                id={s.id}
                mediaType="tv"
                title={s.name}
                poster={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
                    : "/default_poster.jpg"
                }
                rating={s.vote_average}
                year={s.first_air_date?.split("-")[0] || "N/A"}
                onTrailerClick={() =>
                  setSelectedMedia({ id: s.id, media_type: "tv" })
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative top-30 bg-yellow-500/10">
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