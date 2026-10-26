import { parseAsString, parseAsInteger } from "nuqs";

export type TvFilters = {
  term: string;
  genre: string;
  year: string;
  rating: string;
  language: string;
  sort: string;
  page: number;
};

export const tvFilterParsers = {
  term: parseAsString.withDefault(""),
  genre: parseAsString.withDefault(""),
  year: parseAsString.withDefault(""),
  rating: parseAsString.withDefault(""),
  language: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};


export const tvGenres = [
  { id: "10759", name: "Action & Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Family" },
  { id: "9648", name: "Mystery" },
  { id: "10765", name: "Sci-Fi & Fantasy" },
];