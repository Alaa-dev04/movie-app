"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

interface SearchResult {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
}

interface SearchResponse {
  results: SearchResult[];
}

async function fetchSuggestions(term: string): Promise<SearchResponse> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Search request failed");
  return res.json();
}

const LINKS = [
  { name: "Home", href: "/home" },
  { name: "Movies", href: "/movies" },
  { name: "TV-series", href: "/tv" },
];

function SearchFallback() {
  return (
    <div className="w-full">
      <input
        disabled
        placeholder="Quick search"
        className="w-full rounded-xl border border-gray-500 bg-white px-4 py-2 text-sm placeholder-gray-500 lg:py-2.5"
      />
    </div>
  );
}

function SearchBox({ onSelect }: { onSelect?: () => void }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useQueryState("q", {
    defaultValue: "",
    shallow: true,
    history: "replace",
  });
  const [debouncedTerm] = useDebounce(searchTerm, 400);

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["suggestions", debouncedTerm],
    queryFn: () => fetchSuggestions(debouncedTerm),
    enabled: debouncedTerm.trim().length > 0,
    staleTime: 60_000,
    select: (data) =>
      data.results.filter(
        (r) => r.media_type === "movie" || r.media_type === "tv"
      ),
  });

  const hasTerm = searchTerm.trim().length > 0;

  const goTo = (item: SearchResult) => {
    router.push(`/details?id=${item.id}&media_type=${item.media_type}`);
    onSelect?.();
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Quick search"
        className="w-full rounded-xl border border-gray-500 bg-white px-4 py-2 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:border-white focus:outline-none lg:py-2.5"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && debouncedTerm === searchTerm && suggestions[0]) {
            goTo(suggestions[0]);
          }
        }}
      />
      <button
        type="button"
        aria-label={hasTerm ? "Clear search" : "Search"}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => hasTerm && setSearchTerm(null)}
      >
        {isFetching ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
        ) : hasTerm ? (
          <X className="h-5 w-5 text-gray-500" />
        ) : (
          <Search className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {hasTerm && (
        <motion.div
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-y-auto rounded-lg border border-gray-700 bg-[#18181b] shadow-lg"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {isFetching ? (
            <div className="p-3 text-center text-sm text-gray-400">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((item) => (
              <Link
                key={`${item.media_type}-${item.id}`}
                href={`/details?id=${item.id}&media_type=${item.media_type}`}
                onClick={() => onSelect?.()}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#252525]"
              >
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                      : "/default_poster.jpg"
                  }
                  alt=""
                  width={32}
                  height={48}
                  className="aspect-[2/3] w-8 shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm text-white">
                    {item.title || item.name || "Unnamed"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {(item.release_date || item.first_air_date)?.split("-")[0] || "N/A"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-gray-400">No results found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50 px-4 py-2 text-white md:px-10 xl:px-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="text-2xl font-bold text-yellow-400 lg:text-3xl">
            TRENDY<span className="text-white">FLIX</span>
          </span>
          <span className="text-xs text-white lg:text-sm">Movies and TV-Series</span>
        </Link>

        <div className="hidden max-w-md flex-1 md:block lg:max-w-xl">
          <Suspense fallback={<SearchFallback />}>
            <SearchBox />
          </Suspense>
        </div>

        <nav className="hidden shrink-0 items-center gap-4 md:flex lg:gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium lg:text-base ${
                pathname === link.href ? "text-white" : "text-white hover:text-white/80"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.span
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-yellow-400"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <motion.button
          type="button"
          className="p-1 text-white hover:text-white/80 md:hidden"
          onClick={() => setIsMenuOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-neutral-950/95 px-4 py-4 shadow-xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4">
              <Suspense fallback={<SearchFallback />}>
                <SearchBox onSelect={() => setIsMenuOpen(false)} />
              </Suspense>
            </div>
            <nav className="flex flex-col">
              {LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg py-3 text-center text-base font-medium ${
                    pathname === link.href
                      ? "bg-white/10 text-yellow-400"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;