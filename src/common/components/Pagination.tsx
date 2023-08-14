'use client';

import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

interface PaginationProps {
  totalItems: number;
  limit: number;
  offset: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination = ({
  totalItems,
  limit,
  offset,
  nextPage,
  previousPage,
  goToPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = offset / limit + 1;

  // 페이지 번호 생성
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 현재 페이지 주변의 페이지 번호들만 표시하기 위해 필터링
  const displayedPages = pages.filter(
    (page) => Math.abs(currentPage - page) <= 1
  );

  const isDisabledPrev = currentPage === 1;
  const isDisalbedNext = currentPage === totalPages || currentPage > totalPages;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={`flex aspect-square min-w-[35px] items-center justify-center rounded-full p-1 text-sm font-semibold text-zinc-700 md:min-w-[40px] md:hover:bg-zinc-200 ${
          isDisabledPrev && 'cursor-not-allowed opacity-50'
        }`}
        onClick={() => goToPage(0)} // 맨처음 페이지로 이동
        disabled={isDisabledPrev}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        type="button"
        className={`flex aspect-square min-w-[35px] items-center justify-center rounded-full p-1 text-sm font-semibold text-zinc-700 md:min-w-[40px] md:hover:bg-zinc-200 ${
          isDisabledPrev && 'cursor-not-allowed opacity-50'
        }`}
        onClick={previousPage}
        disabled={isDisabledPrev}
      >
        <FaAngleLeft />
      </button>
      {displayedPages.map((page) => (
        <button
          type="button"
          key={page}
          className={`aspect-square min-w-[35px] rounded-full p-1 text-sm font-semibold md:min-w-[40px] ${
            page === currentPage
              ? 'mx-2 bg-primary text-white'
              : 'text-zinc-700 md:hover:bg-zinc-200'
          }`}
          onClick={() => goToPage(page - 1)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={`flex aspect-square min-w-[35px] items-center justify-center rounded-full p-1 text-sm font-semibold text-zinc-700 md:min-w-[40px] md:hover:bg-zinc-200 ${
          isDisalbedNext && 'cursor-not-allowed opacity-50'
        }`}
        onClick={nextPage}
        disabled={isDisalbedNext}
      >
        <FaAngleRight />
      </button>
      <button
        type="button"
        className={`flex aspect-square min-w-[35px] items-center justify-center rounded-full p-1 text-sm font-semibold text-zinc-700 md:min-w-[40px] md:hover:bg-zinc-200 ${
          isDisalbedNext && 'cursor-not-allowed opacity-50'
        }`}
        onClick={() => goToPage(totalPages - 1)} // 마지막 페이지로 이동
        disabled={isDisalbedNext}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
