'use client';

import { useGetLinkListQuery } from '@/features/link/modules/apiHooks/useGetLinkListQuery';
import { WheelEvent, useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import linkle from '/public/images/linkle.png';
import Image from 'next/image';
import RecommendedReadsLinkItem from '@/features/home/RecommendedReadsSection/RecommendedReadsLinkList/RecommendedReadsLinkItem';

const scrollAmount = 600; // 스크롤 양

const RecommendedReadsLinkList = () => {
  const { data, isLoading } = useGetLinkListQuery(
    {
      offset: 0,
      limit: 10,
      orderBy: 'random',
      isChecked: false,
    },
    { enabled: true },
    { refetchOnWindowFocus: false }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // 초기에는 오른쪽으로 스크롤할 수 있다고 가정

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

    // 스크롤 이벤트가 완료되는 것을 대기
    setTimeout(() => {
      checkScroll();
    }, 300); // 300ms는 smooth 스크롤이 완료되는 대략적인 시간
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      container.scrollLeft += e.deltaX;
    } else {
      container.scrollLeft -= e.deltaY;
    }

    checkScroll();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // 초기 스크롤 가능 여부를 설정
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );

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
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full gap-5 overflow-hidden px-1 py-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <RecommendedReadLinkItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-fit w-full flex-col items-center justify-center gap-3 rounded-lg py-6 shadow-md">
        <Image
          src={linkle}
          alt="linkloud Logo"
          className="h-auto w-24"
          priority
        />
        <h4 className="text-md whitespace-pre-wrap text-center font-semibold text-zinc-700">
          {`모든 링크를 확인했어요👍\n미확인 링크가 생기면 다시 추천해 드릴게요!`}
        </h4>
      </div>
    );
  }

  const links = data.links;
  const count = data.count;

  return (
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
        onWheel={handleWheel}
        className="scrollbar-hidden flex w-full gap-5 overflow-x-scroll px-1 py-2 md:overflow-hidden"
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
