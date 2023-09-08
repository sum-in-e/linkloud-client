'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import CreateLinkModal from '@/features/link/containers/CreateLink/CreateLinkModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, ReactElement } from 'react';
import { BsHouseDoor, BsSearch, BsEyeSlash, BsPlus } from 'react-icons/bs';

interface Tab {
  label: string;
  icon: ReactElement;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const MobileNav = () => {
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useOpen();

  const tabs: Tab[] = [
    {
      label: 'Go to All Link Page',
      icon: <BsHouseDoor size={20} />,
      href: '/link/all',
    },
    {
      label: 'Go to Unchecked Link Page',
      icon: <BsEyeSlash size={20} />,
      href: '/link/unchecked',
    },
    {
      label: 'Go to Search',
      icon: <BsSearch size={20} />,
      href: '/link/search',
    },
    {
      label: 'Add a Link',
      icon: <BsPlus size={30} />,
      href: '',
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onOpen();
      },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 bg-white pb-4 md:hidden">
      <div className="grid h-full grid-cols-4">
        {tabs.map((tab, index) => (
          <Link
            aria-label={tab.label}
            href={tab.href}
            key={index}
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={tab.onClick}
          >
            {tab.icon}
          </Link>
        ))}
      </div>
      {isOpen && <CreateLinkModal onCloseModal={onClose} />}
    </nav>
  );
};

export default MobileNav;
