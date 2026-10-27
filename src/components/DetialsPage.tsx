"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";
import TrailerModal, { type TrailerMedia } from "@/components/Trailer";
import { MovieCard } from "@/components/MoviesCard";
type Media = "movie" | "tv";
interface Recommendation {
    id: number;
    media_type: Media;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
}
interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}
interface Details {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    runtime?: number | null;
    genres: { id: number; name: string }[];
    credits: {
        cast: CastMember[];
    };
}
async function fetchDetails(
    id: string,
    media_type: Media,
): Promise<Details> {
    const params = new URLSearchParams({
        id,
        media_type,
    });

    const response = await fetch(`/api/details?${params}`);

    if (!response.ok) {
        throw new Error("Failed to fetch details");
    }

    return response.json();
}
const DetialsPage = () => {

    const searchParams = useSearchParams();
    const [trailer, setTrailer] = useState<TrailerMedia | null>(null);
    const closeTrailer = useCallback(() => setTrailer(null), []);
    const id = searchParams.get("id");
    const mediaType = searchParams.get("media_type");
    const isValidMediaType = mediaType === "movie" || mediaType === "tv";

    const { data, isLoading, error } = useQuery({
        queryKey: ["details", id, mediaType],
        queryFn: () => {
            if (!id || !isValidMediaType) {
                throw new Error("not found")
            }
            return fetchDetails(id, mediaType);
        },
    });
    const runtime = data?.runtime;


    ///recommendation data fetching 
    const { data: recs } = useQuery<{ results: Recommendation[] }>({
        queryKey: ["recommendations", mediaType, id],
        queryFn: async () => {
            const res = await fetch(`/api/recommendation?items=${mediaType}:${id}`);
            if (!res.ok) throw new Error("Failed to load recommendations");
            return res.json();
        }
    });
    return (
        <div className="overflow-x-hidden text-white">
            <div className="relative h-[220px] w-full sm:h-[350px] md:h-[500px]">
                {data?.backdrop_path && (
                    <Image src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
                        alt={data.title ?? data.name ?? "Backdrop"}
                        width={450}
                        height={450}
                        className="h-full w-full object-cover md:mb-6 md:max-h-[450px]"
                    />
                )

                }
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative -top-16 mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 py-4 sm:-top-32 sm:grid-cols-2 sm:gap-4 sm:py-8 md:-top-50">
                <div className="mx-auto w-44 sm:w-full">
                    {data?.poster_path && (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                            alt={data.title ?? data.name ?? "Poster"}
                            width={300}
                            height={450}
                            className="w-full rounded-md"
                        />
                    )}

                    {data && (mediaType === "movie" || mediaType === "tv") && (
                        <button
                            onClick={() => setTrailer({ id: data.id, media_type: mediaType })}
                            className="mt-2 w-full rounded-lg bg-yellow-400 py-2 text-sm font-semibold text-black hover:bg-yellow-300 sm:py-3 sm:text-base"
                        >
                            Watch Trailer
                        </button>
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
                        {data?.title ?? data?.name}
                    </h1>
                    <p className="mb-4 text-sm text-gray-300 sm:text-base">
                        {data?.overview || "No overview available."}
                    </p>
                    <p className="mb-4 ">
                        <Star className="inline-block mx-1 fill-yellow-400 text-yellow-400" />
                        {data?.vote_average.toFixed(1)}
                    </p>
                    {runtime && (
                        <p className="mb-4 text-sm sm:text-base">
                            Runtime: {Math.floor(runtime / 60)}h {runtime % 60}m
                        </p>
                    )}
                    <p className="mb-4 text-sm text-gray-400 sm:text-base">
                        Release date: {data?.release_date ?? data?.first_air_date ?? "N/A"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        {data?.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-yellow-500 sm:text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                </div>
                <section className="col-span-1 sm:col-span-2">
                    <h2 className="mb-4 text-center text-xl font-bold text-white sm:mb-5 sm:text-left sm:text-2xl">
                        Top Cast
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3 pb-4 sm:justify-start sm:gap-4">
                        {data?.credits.cast.slice(0, 10).map((actor) => (
                            <div key={actor.id} className="w-24 shrink-0 text-center sm:w-36 sm:text-left">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        className="mx-auto h-24 w-24 rounded-full object-cover sm:mx-0 sm:h-36 sm:w-36"
                                    />
                                ) : (
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-800 text-xs text-gray-400 sm:mx-0 sm:h-36 sm:w-36 sm:text-sm">
                                        No image
                                    </div>
                                )}

                                <h3 className="mt-2 text-sm font-semibold text-white sm:text-base">
                                    {actor.name}
                                </h3>

                                <p className="text-xs text-gray-400 sm:text-sm">
                                    {actor.character || "Unknown role"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
               
            </div> 
            {recs?.results?.length ? (
                    <section className="flex flex-col gap-4 px-4 py-4 sm:px-8 sm:py-6 md:px-20 relative bottom-20">
                        <h2 className="mb-4 text-center text-xl font-bold text-white sm:mb-5 sm:text-left sm:text-2xl">
                            More like this
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3 pb-4 sm:justify-start sm:gap-4">
                            {recs.results.slice(0, 5).map((r) => (
                                <MovieCard
                                    key={`${r.media_type}-${r.id}`}
                                    id={r.id}
                                    mediaType={r.media_type}
                                    title={r.title ?? r.name ?? "Untitled"}
                                    poster={
                                        r.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${r.poster_path}`
                                            : "/default_poster.jpg"
                                    }
                                    rating={r.vote_average}
                                    year={(r.release_date ?? r.first_air_date)?.split("-")[0] || "N/A"}
                                    onTrailerClick={() =>
                                        setTrailer({
                                            id: r.id,
                                            media_type: r.media_type,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </section>
                ) : null}
            <TrailerModal media={trailer} onClose={closeTrailer} />


        </div>
    )
}

export default DetialsPage