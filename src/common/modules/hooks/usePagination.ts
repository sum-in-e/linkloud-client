import { useEffect, useState } from 'react';

export const usePagination = ({
  initialOffset = 0,
  limit,
}: {
  initialOffset?: number;
  limit: number;
}) => {
  const [offset, setOffset] = useState(initialOffset);

  useEffect(() => {
    // 페이지 이동 시 맨 위로 스크롤
    window.scrollTo(0, 0);
  }, [offset]);

  const nextPage = () => {
    setOffset(offset + limit);
  };

  const previousPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0) {
      setOffset(page * limit);
    }
  };

  return { offset, nextPage, previousPage, goToPage };
};
