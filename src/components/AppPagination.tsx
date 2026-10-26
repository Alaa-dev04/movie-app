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
      previousLabel={<ChevronLeft className="text-white" />}
      nextLabel={<ChevronRight className="text-white" />}
      containerClassName="flex items-center justify-center gap-2 py-6"
      pageClassName="rounded-md border border-border"
      pageLinkClassName="block px-3 py-2 text-white cursor-pointer hover:bg-yellow-500/50 hover:rounded-md"
      activeClassName="bg-yellow-500 text-primary-foreground"
      previousClassName="rounded-md border border-border"
      nextClassName="rounded-md border border-border"
      previousLinkClassName="block px-3 py-2 cursor-pointer"
      nextLinkClassName="block px-3 py-2 cursor-pointer"
      disabledClassName="opacity-50"
      breakLabel="..."
      breakClassName="px-2"
    />
  );
}