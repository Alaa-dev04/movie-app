import { parseAsString } from "nuqs";

export type Filters = {
  term: string;
  genre: string;
  year: string;
  rating: string;
  language: string;
  sort: string;
};

export const filterParsers = {
  term: parseAsString.withDefault(""),
  genre: parseAsString.withDefault(""),
  year: parseAsString.withDefault(""),
  rating: parseAsString.withDefault(""),
  language: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
};