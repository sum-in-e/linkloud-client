'use client';

import { Portal } from '@chakra-ui/react';
import { MouseEvent, ReactNode, useEffect } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

/**
 * 커스텀 모달 컴포넌트
 *
 * 컴포넌트 내부에서 isOpen을 사용하여 컴포넌트를 그리지 않습니다. 호출하는 부분에서 예시와 같이 isOpen 시에만 렌더링 되도록해주세요.
 *
 * @example
 * {isOpen && <CustomModal>{childeren}</CustomModal>}
 */
const CustomModal = ({ onClose, children }: Props) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 이벤트 버블링 막기
    handleClose();
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    // 모달이 마운트될 때 body의 스크롤을 막습니다. (배경 스크롤 막기 위함)
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달이 언마운트될 때 원래대로 되돌립니다.
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Portal>
      <div
        className="fixed left-0 top-0 z-[1500] flex h-full w-full items-center justify-center bg-black bg-opacity-60"
        onClick={handleBackgroundClick}
      >
        <section className="relative" onClick={handleContentClick}>
          {children}
        </section>
      </div>
    </Portal>
  );
};

export default CustomModal;
