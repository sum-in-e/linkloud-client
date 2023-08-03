'use client';

import { Portal } from '@chakra-ui/react';
import { MouseEvent, ReactNode } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

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

  return (
    <Portal>
      <div
        className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-60"
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
