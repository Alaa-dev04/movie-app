"use client";
import { useForm } from "react-hook-form";
import { useQueryStates } from "nuqs";
import { Filters, filterParsers } from "@/lib/movie-filters";

const years = Array.from({ length: 20 }, (_, i) => String(2026 - i));
const genres = [
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "27", name: "Horror" },
    { id: "878", name: "Science Fiction" },
    { id: "10749", name: "Romance" },
    { id: "16", name: "Animation" },
];
const selectClass = "w-full min-w-0 rounded-xl bg-[#252525] p-2.5 text-sm text-white sm:p-3 sm:text-base";
const labelClass = "mb-1 block text-sm sm:text-base";

const FiltrationBar = () => {
    const [applied, setApplied] = useQueryStates(filterParsers);

    const { register, handleSubmit } = useForm<Filters>({
        values: applied,
    });

    function onSubmit(values: Filters) {
        setApplied(values);
    }

    function onReset() {
        setApplied(null);
    }

    return (
        <div className="relative -bottom-11 p-3 text-white sm:-bottom-12 sm:p-4 md:-bottom-20">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
                <div className="col-span-2 md:col-span-3 lg:col-span-6">
                    <label className={`${labelClass} font-bold`}>Search</label>
                    <input
                        {...register("term")}
                        placeholder="Search ...."
                        className={selectClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Genre</label>
                    <select {...register("genre")} className={selectClass}>
                        <option value="">All</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Year</label>
                    <select {...register("year")} className={selectClass}>
                        <option value="">All</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Rating</label>
                    <select {...register("rating")} className={selectClass}>
                        <option value="">All</option>
                        <option value="9">9+</option>
                        <option value="8">8+</option>
                        <option value="7">7+</option>
                        <option value="6">6+</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Language</label>
                    <select {...register("language")} className={selectClass}>
                        <option value="">All</option>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                        <option value="fr">French</option>
                        <option value="ko">Korean</option>
                        <option value="ja">Japanese</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Sort By</label>
                    <select {...register("sort")} className={selectClass}>
                        <option value="">All</option>
                        <option value="popularity.desc">Popularity</option>
                        <option value="vote_average.desc">Rating</option>
                        <option value="primary_release_date.desc">Newest</option>
                    </select>
                </div>

                <div className="flex items-end gap-2">
                    <button
                        type="submit"
                        className="flex-1 rounded-xl bg-yellow-400 p-2.5 text-sm font-bold text-black sm:p-3 sm:text-base"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={onReset}
                        className="rounded-xl border border-gray-500 p-2.5 text-sm sm:p-3 sm:text-base"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FiltrationBar;