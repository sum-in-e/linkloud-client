import { useState, useEffect } from 'react';

/**
 * 미디어 쿼리 훅
 *
 * @param {string} query 미디어 쿼리 문자열
 * @return {boolean}
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * console.log(isDesktop); // 브라우저 창 너비가 768px 이상이면 'true'를 출력합니다.
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
