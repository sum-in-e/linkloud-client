'use client';

import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

const LinkListLoadingUI = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <ul
      className={`grid grid-rows-[1fr] gap-5`}
      style={{
        gridTemplateColumns: `repeat(auto-fill,minmax(${
          isMobile ? 'calc(50% - 10px)' : '270px'
        },1fr))`,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index} className="">
          <div className="skeleton aspect-[1.91/1] h-auto w-full rounded-lg" />
          <div className="p-2 pt-4">
            <div className="skeleton mb-3 h-3 w-full rounded-xl" />
            <div className="skeleton mb-1 h-4 w-1/3 rounded-xl" />
            <div className="skeleton h-3 w-full rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LinkListLoadingUI;
