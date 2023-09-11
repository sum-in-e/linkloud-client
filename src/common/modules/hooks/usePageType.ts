import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type PageType = 'public' | 'private';

/**
 * pathname에 따라 해당 페이지가 public 인지 private 페이지인지 여부를 반환합니다.
 * @returns {PageType} 'public' | 'private'
 * @example
 * const pageType = usePageType(); // 'public' 또는 'private'
 */
export const usePageType = (): PageType => {
  const pathname = usePathname();

  const privatePaths = useMemo(() => ['/link'], []);

  const pageType = useMemo<PageType>(() => {
    if (privatePaths.some((path) => pathname.includes(path))) {
      return 'private';
    }

    return 'public';
  }, [pathname, privatePaths]);

  return pageType;
};
