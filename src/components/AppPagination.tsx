"use client";
import React from 'react'
import { useState } from 'react'
import mockMovies from '../lib/mockdata'
import { MovieCard } from './MoviesCard'
import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from 'lucide-react';
const AppPagination = () => {
    const movies = mockMovies;
    const [pageNumber, setPageNumber] = useState(0);
    const moviesPerPage = 10;
    const pageVisited = pageNumber * moviesPerPage;
    //40->50
    const displayData = movies.slice(pageVisited, pageVisited + moviesPerPage)
        .map((movie) => {
            return (

                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    rating={movie.rating}
                    poster={movie.poster}
                    title={movie.title}
                    year={String(movie.year)}
                    mediaType={movie.media}
                />
            )
        })
    const pagecount = Math.ceil(movies.length / moviesPerPage);
    const changepage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };
    return (
        <div className='p-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
                {displayData}
            </div>

            <div >
                <ReactPaginate
                    pageCount={pagecount}
                    onPageChange={changepage}
                    previousLabel={<ChevronLeft className='text-white' />}
                    nextLabel={<ChevronRight className='text-white' />}
                    containerClassName="flex items-center justify-center gap-2 py-6"
                    pageClassName="rounded-md border border-border"
                    pageLinkClassName="block px-3 py-2  text-white cursor-pointer hover:bg-yellow-500/50 hover:rounded-md"
                    activeClassName="bg-yellow-500 text-primary-foreground"
                    previousClassName="rounded-md border border-border"
                    nextClassName="rounded-md border border-border"
                    previousLinkClassName="block px-3 py-2 cursor-pointer"
                    nextLinkClassName="block px-3 py-2 cursor-pointer"
                    disabledClassName="opacity-50"
                    breakLabel="..."
                    breakClassName="px-2"
                />
            </div>

        </div>
    )
}

export default AppPagination
