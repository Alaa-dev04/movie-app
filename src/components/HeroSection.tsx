"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import TrailerModal, { type TrailerMedia } from "./Trailer";

interface TMDBMovie {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
}

interface TrendingResponse {
  results: TMDBMovie[];
}

// TMDB's /trending endpoint returns genre ids, not names.
// These ids are stable, so a static lookup avoids extra requests.
const GENRE_MAP: Record<number, string> = {
  // movie
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  // tv
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

// ---- helper functions ----

const getTitle = (media: TMDBMovie): string =>
  media.media_type === "movie"
    ? media.title || "Untitled"
    : media.name || "Untitled";

const getGenres = (media: TMDBMovie): string =>
  (media.genre_ids ?? [])
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 3)
    .join(" · ");

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
  // The modal is open whenever a trailer target is selected.
  const [trailerMedia, setTrailerMedia] = useState<TrailerMedia | null>(null);

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: fetchTrending,
    staleTime: 60 * 60 * 1000,
    select: (data) =>
      data.results.map((m) => ({
        ...m,
        // /trending/movie/week doesn't include media_type, so default it
        media_type: m.media_type ?? "movie",
      })),
  });

  // handle navigation dots
  const handleButtonClick = (index: number) => {
    swiperInstance?.slideToLoop(index);
    setActiveIndex(index);
  };

  const openTrailer = (media: TMDBMovie) => {
    setTrailerMedia({ id: media.id, media_type: media.media_type });
    swiperInstance?.autoplay?.stop();
  };

  const closeTrailer = useCallback(() => {
    setTrailerMedia(null);
    swiperInstance?.autoplay?.start();
  }, [swiperInstance]);

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

  return (
    <section className="relative w-full h-[360px] sm:h-[480px] md:h-[720px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={movies.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="w-full h-full"
      >
        {/* one slide per movie */}
        {movies.map((media) => (
          <SwiperSlide key={media.id}>
            <div className="relative w-full h-[360px] sm:h-[480px] md:h-[720px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: media.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
                    : `url(/default_backdrop.jpg)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/80" />
              <div className="absolute inset-0 flex items-center sm:items-end p-4 sm:p-8 md:p-20 text-gray-200 max-w-xs sm:max-w-xs md:max-w-2xl">
                <div>
                  <Link
                    href={`/details?id=${media.id}&media_type=${media.media_type}`}
                  >
                    <h1 className="text-2xl md:text-5xl font-bold mb-3 leading-tight">
                      {getTitle(media)}
                    </h1>
                  </Link>

                  <p className="text-sm md:text-lg text-yellow-400 mb-3 font-semibold sm:leading-5">
                    {getGenres(media)}
                  </p>
                  <p className="text-sm md:text-lg mt-5 text-gray-200 line-clamp-5 hidden sm:block sm:leading-5 mb-6">
                    {media.overview || "No description available."}
                  </p>
                  <p className="text-sm md:text-lg mt-5">
                    <span className="mr-4">
                      ⭐ {media.vote_average.toFixed(1)}
                    </span>
                    <span className="mr-4">|</span>
                    <span>{getReleaseYear(media)}</span>
                  </p>
                  <button
                    onClick={() => openTrailer(media)}
                    className="mt-5 sm:mt-8 inline-block cursor-pointer bg-yellow-400 text-black px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm sm:text-base"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* navigation dots */}
      {movies.length > 1 && (
        <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-colors ${
                activeIndex === index
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-transparent border-white"
              }`}
              onClick={() => handleButtonClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <TrailerModal media={trailerMedia} onClose={closeTrailer} />
    </section>
  );
}