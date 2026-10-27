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

const GENRE_MAP: Record<number, string> = {
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
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

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

async function fetchTrending(): Promise<TrendingResponse> {
  const res = await fetch("/api/trending");
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
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
        media_type: m.media_type ?? "movie",
      })),
  });

  const slides = movies.slice(0, 8);

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
    return (
      <div className="h-[360px] w-full animate-pulse bg-neutral-900 sm:h-[480px] md:h-[720px]" />
    );
  }

  if (isError || slides.length === 0) {
    return (
      <div className="flex h-[360px] w-full items-center justify-center bg-neutral-900 px-4 text-center text-white sm:h-[480px] md:h-[720px]">
        Couldn&apos;t load featured movies.
      </div>
    );
  }

  return (
    <section className="relative h-[360px] w-full overflow-hidden sm:h-[480px] md:h-[720px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="h-full w-full"
      >
        {slides.map((media) => (
          <SwiperSlide key={media.id}>
            <div className="relative h-[360px] w-full sm:h-[480px] md:h-[720px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: media.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/w1280${media.backdrop_path})`
                    : `url(/default_backdrop.jpg)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/80" />
              <div className="absolute inset-0 flex items-center px-4 pb-10 pt-16 text-gray-200 sm:items-end sm:px-8 sm:pb-14 sm:pt-20 md:p-20">
                <div className="max-w-[16rem] sm:max-w-sm md:max-w-2xl">
                  <Link
                    href={`/details?id=${media.id}&media_type=${media.media_type}`}
                  >
                    <h1 className="mb-2 line-clamp-2 text-2xl font-bold leading-tight sm:mb-3 sm:text-3xl md:text-5xl">
                      {getTitle(media)}
                    </h1>
                  </Link>

                  <p className="mb-2 text-sm font-semibold text-yellow-400 sm:mb-3 sm:leading-5 md:text-lg">
                    {getGenres(media)}
                  </p>
                  <p className="mb-4 mt-3 hidden line-clamp-3 text-sm text-gray-200 sm:block sm:leading-5 md:mb-6 md:mt-5 md:line-clamp-5 md:text-lg">
                    {media.overview || "No description available."}
                  </p>
                  <p className="mt-3 text-sm sm:mt-4 md:mt-5 md:text-lg">
                    <span className="mr-3 sm:mr-4">
                      ⭐ {media.vote_average.toFixed(1)}
                    </span>
                    <span className="mr-3 sm:mr-4">|</span>
                    <span>{getReleaseYear(media)}</span>
                  </p>
                  <button
                    onClick={() => openTrailer(media)}
                    className="mt-4 inline-block cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-500 sm:mt-6 sm:text-base md:mt-8 md:px-6 md:py-3"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-row gap-2 sm:bottom-5 md:bottom-auto md:left-auto md:right-12 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 w-2.5 rounded-full border-2 transition-colors sm:h-3 sm:w-3 md:h-5 md:w-5 ${
                activeIndex === index
                  ? "border-yellow-400 bg-yellow-400"
                  : "border-white bg-transparent"
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