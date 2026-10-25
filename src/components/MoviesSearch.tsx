"use client";
import React from 'react'
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import Image from "next/image";

//
interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
}

interface SearchResponse {
  results: SearchResult[];
}
async function fetchSuggestions(term: string): Promise<SearchResponse> {
  const res = await fetch(`/api/movies/search?term=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Search request failed");
  return res.json();
}
const MoviesSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useQueryState("term", {
    defaultValue: "",
    shallow: true,
    history: "replace",
  });
  const [debouncedTerm] = useDebounce(searchTerm, 400);
  const {
    data: suggestions = [],
    isFetching: isLoading,
    isError,
  } = useQuery({
    queryKey: ["suggestions", debouncedTerm],
    queryFn: () => fetchSuggestions(debouncedTerm),
    enabled: debouncedTerm.length > 0,
    staleTime: 60_000,
    select: (data) => data.results,
  });
  const handleSearchClick = () => {
    if (isSearchOpen && suggestions.length > 0) {
      setIsSearchOpen(false);
      setSearchTerm("");
    } else if (searchTerm.trim()) {
      setIsSearchOpen(true);
      fetchSuggestions(searchTerm);
    }
  };
  return (
    <div className="  ">
      <motion.div className="relative -bottom-22 w-full  ">
        <input
          type="text "
          placeholder="quick movie search...."
          className="w-full px-4 py-1.5 lg:py-3 text-sm text-gray-500 focus:outline-none placeholder-gray-500
                                  rounded-xl border border-gray-500 focus:border-white pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="absolute right-3 bottom-1/8 transform lg:-translate-y-1/2 md:-translate-y-5 cursor-default "
          onClick={handleSearchClick}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          ) : isSearchOpen && suggestions.length > 0 ? (
            <X className="w-5 h-5 text-gray-500" />
          ) : (
            <Search className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {/* animate suggustion dropdown   */}
        {searchTerm.trim().length > 0 && (
          <AnimatePresence>
            <motion.div
              className="absolute top-full mt-1 w-full bg-[#18181b] border border-gary-500 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <div className="p-2 text-sm text-gray-400 text-center">
                  Loading...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <Link key={item.id} href={"/"}>
                    <div className="flex item-center gap-2 p-2 hover:bg-[#252525] rounded-lg cursor-pointer">
                      <Image
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/default_poster.jpg"
                        }
                        alt="poster"
                        width={32}
                        height={48}
                        className="w-8 aspect-[2/3] object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm text-white line-clamp-2 h-10">
                          {item.title || item.name || "unnamed"}
                        </h3>
                        <p>
                          {(
                            item.release_date
                          )?.split("-")[0] || "n/a"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-400 text-center">
                  No Movies Found
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )

}

export default MoviesSearch
