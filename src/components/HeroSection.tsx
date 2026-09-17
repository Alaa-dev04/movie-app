"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
// ---- types ----

interface TMDBGenre {
    id: number;
    name: string;
}

interface TMDBMovie {
    id: number;
    media_type: "movie" | "tv";
    title?: string;          // movies
    name?: string;           // tv shows
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;   // movies
    first_air_date?: string; // tv shows
    genres?: TMDBGenre[];
    runtime?: number;
}

interface TrendingResponse {
    results: TMDBMovie[];
}

// ---- helper functions ----

// create function to get media title
const getTitle = (media: TMDBMovie): string => {
    return media.media_type === "movie"
        ? media.title || "Untitled"
        : media.name || "Untitled";
};

// create function to get movie genres
const getGenres = (media: TMDBMovie): string => {
    if (media.media_type === "movie" && media.genres && media.genres.length > 0) {
        return media.genres.map((g) => g.name).join(" · ");
    }
    return "";
};

// create function to format movie runtime into hours and minutes
const formatDuration = (media: TMDBMovie): string => {
    if (media.media_type === "movie" && media.runtime) {
        const h = Math.floor(media.runtime / 60);
        const m = media.runtime % 60;
        return `${h}h ${m}m`;
    }
    return "";
};

// create function to get the release year for movies or tv shows
const getReleaseYear = (media: TMDBMovie): string => {
    const date = media.release_date || media.first_air_date;
    return date ? date.split("-")[0] : "N/A";
};

// ---- data fetching ----

async function fetchTrending(): Promise<TrendingResponse> {
    const res = await fetch("/api/trending");
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    return res.json();
}

// ---- component ----

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    // handle navigation button
    const handleButtonClick = (index: number) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }

        setActiveIndex(index);
    };
    const {
        data: movies = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["trending-movies"],
        queryFn: fetchTrending,
        staleTime: 60 * 60 * 1000,
        select: (data) => data.results,
    });

    if (isLoading) {
        return <div className="w-full h-[70vh] bg-neutral-900 animate-pulse" />;
    }

    if (isError || movies.length === 0) {
        return (
            <div className="w-full h-[70vh] bg-neutral-900 flex items-center justify-center text-white">
                Couldn&apos;t load featured movies.
            </div>
        );
    }

    const activeMovie = movies[activeIndex];

    return (
        <section className="relative w-full min-h-[360px] sm:min-h-[480px] md:min-h-[720px]">
            <Swiper modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={movies.length > 1}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                className="w-full h-full"
            >
                {/* map throught movies to create a slider for each movie  */}
                {
                    movies.map((media) => (
                        <SwiperSlide key={media.id}>
                            <div className="relative w-full h-[360px] sm:min-h-[480px] md:min-h-[720px]">
                                <div className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: media.backdrop_path
                                            ? `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
                                            : `url(/default_backdrop.jpg)`
                                    }}
                                >

                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/80 " ></div>
                                <div className="absolute inset-0 flex items-center sm:items-end p-4 sm:p-8 md:p-20 text-gray-200 max-w-xs sm:max-w-xs md:max-w-2xl" >
                                    <div>
                                        <Link href={`/details?id=${media.id}&media_type=${media.media_type}`}>
                                            <h1 className="text-2xl sm:text-2xl md:text-5xl font-bold mb-3 leading-tight">
                                                {getTitle(media)}
                                            </h1>
                                        </Link>
                                         
                                              <p className="text-sm sm:text-sm md:text-lg text-yellow-400 mb-3 font-semibold sm:leading-5">
                                                    {getGenres(media)}
                                                </p>  
                                            <p className="text-sm md:text-base text-gray-200 line-clamp-3 mb-6">
                                                {media.overview || " no discrription avaliable"}
                                            </p>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* backdrop image */}
            {/* <Image
                src={
                    activeMovie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`
                        : "/default_backdrop.jpg"
                }
                alt={getTitle(activeMovie)}
                fill
                priority
                className="object-cover -z-10"
            /> */}

            {/* dark gradient overlay so text stays readable */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent -z-10" /> */}

            {/* content */}
            {/* <div className="absolute bottom-10 left-6 md:left-16 max-w-xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                    {getTitle(activeMovie)}
                </h1>

                <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
                    <span>{getReleaseYear(activeMovie)}</span>
                    {formatDuration(activeMovie) && (
                        <span>{formatDuration(activeMovie)}</span>
                    )}
                    <span>⭐ {activeMovie.vote_average?.toFixed(1) ?? "N/A"}</span>
                </div>

                {getGenres(activeMovie) && (
                    <p className="text-sm text-yellow-400 mb-3">
                        {getGenres(activeMovie)}
                    </p>
                )}

                <p className="text-sm md:text-base text-gray-200 line-clamp-3 mb-6">
                    {activeMovie.overview}
                </p>

                <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
                    ▶ Watch Now
                </button>
            </div> */}

            {/* dots to switch between the trending movies */}
            {/* <div className="absolute bottom-4 right-6 flex gap-2">
                {movies.map((movie, index) => (
                    <button
                        key={movie.id}
                        onClick={() => handleButtonClick(index)}
                        className={`w-2.5 h-2.5 rounded-full transition ${index === activeIndex ? "bg-yellow-400" : "bg-white/40"
                            }`}
                        aria-label={`Show ${getTitle(movie)}`}
                    />
                ))}
            </div> */}
        </section>
    );
}