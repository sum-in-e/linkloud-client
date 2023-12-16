'use client';

import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import linkle from '/public/images/linkle.png';
import Image from 'next/image';
import RecommendedReadsLinkItem from '@/features/home/RecommendedReadsSection/RecommendedReadsLinkList/RecommendedReadsLinkItem';
import { BsArrowRepeat } from 'react-icons/bs';

const scrollAmount = 600; // 스크롤 양

const RecommendedReadsLinkList = () => {
  const { data, isLoading, refetch } = useGetLinkListQuery(
    {
      offset: 0,
      limit: 10,
      orderBy: 'random',
      isFollowing: true,
    },
    { enabled: true },
    { refetchOnWindowFocus: false }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;

    if (!container) return;

    let newScrollPosition;

    if (direction === 'left') {
      newScrollPosition = container.scrollLeft - scrollAmount;
    } else {
      newScrollPosition = container.scrollLeft + scrollAmount;
    }

    container.scroll({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScroll();
      const handleActualScroll = () => {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };

      container.addEventListener('scroll', handleActualScroll);

      return () => {
        container.removeEventListener('scroll', handleActualScroll);
      };
    }
  }, [data]);

  useEffect(() => {
    // 브라우저 크기가 변경되면 스크롤 가능 여부를 다시 확인
    const handleResize = () => {
      checkScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex w-full gap-5 overflow-hidden px-1 py-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <RecommendedReadLinkItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-2 flex h-fit w-full flex-col items-center justify-center gap-3 rounded-lg border py-6">
        <p className="text-center text-sm font-semibold text-zinc-700">
          추천 링크를 불러오는데 실패했습니다.
        </p>
        <button
          type="button"
          className="rounded-full bg-black p-[6px] md:hover:bg-gray-700"
          onClick={handleRefetch}
        >
          <BsArrowRepeat size={18} className="fill-white" />
        </button>
      </div>
    );
  }

  const links = data.links;

  return links.length > 0 ? (
    <div className="group relative">
      {!isMobile && canScrollLeft && (
        <button
          className="absolute left-0 top-1/2 z-10 hidden h-fit w-fit flex-shrink-0 -translate-y-1/2 transform items-center justify-center rounded-full bg-zinc-700  p-2 md:hover:bg-opacity-60 md:group-hover:flex"
          onClick={() => handleScroll('left')}
        >
          <BsChevronLeft size={30} className="fill-white" />
        </button>
      )}

      <div
        ref={containerRef}
        className="scrollbar-hidden flex w-full gap-5 overflow-x-scroll px-1 py-2"
      >
        {links.map((link, index) => (
          <RecommendedReadsLinkItem key={index} link={link} />
        ))}
      </div>

      {!isMobile && canScrollRight && (
        <button
          className="absolute right-0 top-1/2 z-10 hidden h-fit w-fit flex-shrink-0 -translate-y-1/2 transform items-center justify-center rounded-full bg-zinc-700 p-2 md:hover:bg-opacity-60 md:group-hover:flex"
          onClick={() => handleScroll('right')}
        >
          <BsChevronRight size={30} className="fill-white" />
        </button>
      )}
    </div>
  ) : (
    <div className="mt-2 flex h-fit w-full flex-col items-center justify-center gap-3 rounded-lg border py-10">
      <Image
        src={linkle}
        alt="linkloud Logo"
        className="h-auto w-24"
        priority
      />
      <h4 className="text-md whitespace-pre-wrap text-center font-semibold text-zinc-700">
        {`나중에 보려고 추가한 링크가 없어요.\n미루지 않고 확인하는 좋은 습관을 가지셨군요👍`}
      </h4>
    </div>
  );
};

export default RecommendedReadsLinkList;

const RecommendedReadLinkItemSkeleton = () => {
  return (
    <div className="relative h-fit w-[270px] flex-shrink-0 rounded-lg p-2 shadow-md ">
      <div
        className={`skeleton aspect-[1.91/1] h-auto w-full rounded-lg object-cover md:group-hover/item:brightness-125`}
      />
      <div className="p-2 pt-4 ">
        <div className="skeleton mb-2 h-3 w-full rounded-lg" />
        <div className="skeleton mb-1 h-6 w-full rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
      </div>
    </div>
  );
};
