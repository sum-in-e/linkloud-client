import { usePathname } from 'next/navigation';

/**
 * 현재 pathname에 따라 Header 혹은 Footer가 표시되어야 하는지를 결정합니다.
 * @return {Object} - Header와 Footer의 표시 여부를 나타내는 두 개의 boolean 값을 포함하는 객체입니다.
 * @property {boolean} isHeaderVisible
 * @property {boolean} isFooterVisible
 */
export const useIsShowLayout = () => {
  const pathname = usePathname();

  const isHeaderVisible = !pathname.includes('/link/share-target'); // 모바일 링크 공유하기 페이지에서는 보이지 않음
  const isFooterVisible =
    !pathname.includes('/kloud') && !pathname.includes('/link/share-target'); // 모바일 링크 공유하기 페이지와 클라우드 페이지에서는 보이지 않음

  return {
    isHeaderVisible,
    isFooterVisible,
  };
};
