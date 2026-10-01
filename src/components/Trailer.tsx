"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export interface TrailerMedia {
  id: number;
  media_type: "movie" | "tv";
}

interface TMDBVideo {
  key: string;
  site: string;
  type: string;
  official?: boolean;
}

interface TMDBVideosResponse {
  results: TMDBVideo[];
}

interface TrailerModalProps {
  /** The movie or series to show. Pass null to keep the modal closed. */
  media: TrailerMedia | null;
  onClose: () => void;
}

async function fetchTrailer(media: TrailerMedia): Promise<TMDBVideosResponse> {
  const res = await fetch(
    `/api/trailer?id=${media.id}&media_type=${media.media_type}`,
  );
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export default function TrailerModal({ media, onClose }: TrailerModalProps) {
  const { data, isLoading, isError } = useQuery<TMDBVideosResponse>({
    queryKey: ["trailer", media?.id, media?.media_type],
    queryFn: () => fetchTrailer(media!),
    enabled: media !== null,
    staleTime: 60 * 60 * 1000,
  });

  // Close on Escape and lock page scroll while the modal is open.
  useEffect(() => {
    if (!media) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [media, onClose]);

  if (!media) return null;

  // Prefer an official trailer, then any trailer, then a teaser, then any video.
  const youtubeVideos =
    data?.results?.filter((video) => video.site === "YouTube") ?? [];
  const trailer =
    youtubeVideos.find((v) => v.type === "Trailer" && v.official) ??
    youtubeVideos.find((v) => v.type === "Trailer") ??
    youtubeVideos.find((v) => v.type === "Teaser") ??
    youtubeVideos[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Trailer"
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl cursor-pointer"
          aria-label="Close trailer"
        >
          ✕
        </button>

        {isLoading && <p className="text-white p-4">Loading trailer…</p>}
        {isError && (
          <p className="text-white p-4">
            Couldn&apos;t load the trailer. Please try again.
          </p>
        )}
        {!isLoading && !isError && !trailer && (
          <p className="text-white p-4">No trailer available.</p>
        )}
        {trailer && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          />
        )}
      </div>
    </div>
  );
}