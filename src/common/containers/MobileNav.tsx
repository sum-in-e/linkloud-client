'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import CreateLinkModal from '@/features/link/containers/CreateLink/CreateLinkModal';
import { useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';
import { BsHouseDoor, BsSearch, BsEyeSlash, BsPlus } from 'react-icons/bs';

interface Tab {
  icon: ReactElement;
  onClick: () => void;
}

const MobileNav = () => {
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useOpen();

  const tabs: Tab[] = [
    {
      icon: <BsHouseDoor size={20} />,
      onClick: () => router.push('/link/all'),
    },
    {
      icon: <BsEyeSlash size={20} />,
      onClick: () => router.push('/link/unread'),
    },
    {
      icon: <BsSearch size={20} />,
      onClick: () => router.push('/link/search'),
    },
    { icon: <BsPlus size={30} />, onClick: () => onOpen() },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 bg-white pb-4 md:hidden">
      <div className="grid h-full grid-cols-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={tab.onClick}
          >
            {tab.icon}
          </div>
        ))}
      </div>
      {isOpen && <CreateLinkModal onCloseModal={onClose} />}
    </nav>
  );
};

export default MobileNav;
