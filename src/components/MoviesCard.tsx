import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type MovieCardProps = {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  poster: string;
  rating: number;
  year: string;
  onTrailerClick?: () => void;
};

export function MovieCard({
  id,
  mediaType,
  title,
  poster,
  rating,
  year,
  onTrailerClick,
}: MovieCardProps) {
  return (
    <Card className="group flex h-full w-full max-w-[300px] flex-col gap-0 overflow-hidden bg-gray-400/20 py-0">
      <div className="relative overflow-hidden">
        <Image
          src={poster}
          alt={title}
          width={200}
          height={200}
          className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Clicking the poster opens the details page */}
        <Link
          href={`/details?id=${id}&media_type=${mediaType}`}
          className="absolute inset-0"
          aria-label={`View details for ${title}`}
        />

        {/* Trailer button (sits above the link) */}
        {onTrailerClick && (
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center px-2 sm:bottom-4 sm:px-4">
            <Button
              variant="trailer"
              size="sm"
              onClick={onTrailerClick}
              className="translate-y-0 opacity-100 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:translate-y-0"
            >
              <Play className="size-3 fill-current sm:size-3.5" />
              Trailer
            </Button>
          </div>
        )}
      </div>

      <CardHeader className="px-2 pb-1 pt-2 sm:px-3 sm:pt-3">
        <CardTitle className="text-white">
          <p className="line-clamp-2 min-h-[2.5rem] break-words p-1 text-sm leading-snug sm:min-h-[3rem] sm:text-base">
            {title}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-auto bg-yellow-500 px-2 py-2 sm:px-3">
        <p className="truncate text-sm text-black sm:text-base">
          {year} · ⭐ {rating.toFixed(1)}
        </p>
      </CardContent>
    </Card>
  );
}