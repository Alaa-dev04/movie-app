"use client";
import { useMovies } from "@/hooks/use-movies";
import { MovieCard } from "@/components/MoviesCard"; 
import FiltrationBar from "@/components/FiltrationBar";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
};

export default function MovieGrid() {
  const { data, isFetching, isError } = useMovies();

  if (isError) return <p className="p-4 text-red-500">Something went wrong.</p>;
  if (isFetching) return <p className="p-4">Loading...</p>;
  if (!data?.results?.length)
    return <p className="p-4 text-gray-400">No movies found.</p>;

  return (
    <div >
      <FiltrationBar />   
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5 top-30 relative">
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
        />
      ))}
    </div>
</div>

  );
}