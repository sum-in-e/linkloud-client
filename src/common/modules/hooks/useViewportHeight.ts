import { useEffect } from 'react';

/**
 * useViewportHeight - 실제 뷰포트 높이를 계산하여 CSS 변수(--calcvh)에 할당하는 사용자 정의 훅.
 *
 * CSS의 `vh` (viewport height) 단위는 종종 브라우저 UI를 포함하기 때문에 예상치 못한 레이아웃 문제가 발생할 수 있습니다.
 * 이 훅은 `window.innerHeight` 속성을 사용하여 정확한 뷰포트 높이 값을 계산하고, 결과를 `--calcvh`라는 CSS 변수에 할당합니다. (모바일 브라우저에서 검색창 높이가 height에 포함되는 경우가 있기 때문에 해당 경우를 위해 사용합니다)
 *
 * CSS에서 var(--calcvh)를 사용하여 실제 뷰포트 높이에 기반한 레이아웃을 설정할 수 있습니다.
 * --calcvh = 1vh 입니다.
 *
 * @example
 *
 * const Component = () => {
 *   useViewportHeight();
 *
 *   return <div style={{ height: 'calc(var(--calcvh) * 100)' }}>100vh</div>;
 * };
 */
const useViewportHeight = () => {
  useEffect(() => {
    const setVHVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--calcvh', `${vh}px`);
    };

    setVHVariable();

    window.addEventListener('resize', setVHVariable);
    return () => {
      window.removeEventListener('resize', setVHVariable);
    };
  }, []);
};

export default useViewportHeight;
