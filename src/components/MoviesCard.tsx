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
    <Card className="group bg-gray-400/20 max-w-[300px] lg:h-[550px] md:h-[350px] sm:h-[300px]">
      <div className="relative  overflow-hidden">
        <Image
          src={poster}
          alt={title}
          width={200}
          height={200}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
            <Button
              variant="trailer"
              size="sm"
              onClick={onTrailerClick}
              className="opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:translate-y-0"
            >
              <Play className="size-3.5 fill-current" />
              Trailer
            </Button>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-white "><p className=" h-[100px] p-1">{title}</p></CardTitle>
      </CardHeader>

      <CardContent className="bg-yellow-500">
        <p className="text-black">
          {year} · ⭐ {rating.toFixed(1)}
        </p>
      </CardContent>
    </Card>
  );
}
