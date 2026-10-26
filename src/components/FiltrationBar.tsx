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
const selectClass = "w-full rounded-xl bg-[#252525] p-3 text-white";

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
        <div className="p-4 -bottom-20 relative text-white ">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="font-bold">Search</label>
                    <input
                        {...register("term")}
                        placeholder="Search ...."
                        className="w-full rounded-xl bg-[#252525] p-3 text-white"
                    />
                </div>

                <div>
                    <label>Genre</label>
                    <select {...register("genre")} className={selectClass}>
                        <option value="">All</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Year</label>
                    <select {...register("year")} className={selectClass}>
                        <option value="">All</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Rating</label>
                    <select {...register("rating")} className={selectClass}>
                        <option value="">All</option>
                        <option value="9">9+</option>
                        <option value="8">8+</option>
                        <option value="7">7+</option>
                        <option value="6">6+</option>
                    </select>
                </div>

                <div>
                    <label>Language</label>
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
                    <label>Sort By</label>
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
                        className="flex-1 rounded-xl bg-yellow-400 p-3 font-bold text-black"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={onReset}
                        className="rounded-xl border border-gray-500 p-3"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FiltrationBar;