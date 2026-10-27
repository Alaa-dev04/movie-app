
"use client";

import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "lucide-react";

type AppPaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function AppPagination({
  pageCount,
  currentPage,
  onPageChange,
}: AppPaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}

      previousLabel={<ChevronLeft size={18} />}
      nextLabel={<ChevronRight size={18} />}
      containerClassName="flex flex-wrap items-center text-white justify-center gap-1.5 sm:gap-2 py-4 sm:py-6 px-2"
      pageClassName="rounded-md border border-border"
      pageLinkClassName="flex items-center justify-center min-w-8 h-8 sm:min-w-10 sm:h-10 px-2 sm:px-3 text-sm sm:text-base text-white cursor-pointer hover:bg-yellow-500/50 hover:rounded-md"
      activeClassName="bg-yellow-500 text-primary-foreground"
      previousClassName="rounded-md border border-border"
      nextClassName="rounded-md border border-border"
      previousLinkClassName="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
      nextLinkClassName="flex  items-center justify-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
      disabledClassName="opacity-50"
      breakLabel="..."
      breakClassName="px-1 sm:px-2"
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
    />
  );
}
