'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import DesktopMenuSidebar from '@/common/containers/DesktopMenuSidebar';
import MobileNav from '@/common/containers/MobileNav';
import KloudListSidebar from '@/common/containers/KloudListSidebar';
import useViewportHeight from '@/common/modules/hooks/useViewportHeight';

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isMyKloudPage = pathname.includes('/link');
  useViewportHeight();

  return (
    <div className="flex">
      <aside className="hidden h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] w-full max-w-[240px] flex-shrink-0 border-r md:block">
        <DesktopMenuSidebar />
      </aside>
      <aside className="hidden h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] w-full max-w-[240px] flex-shrink-0 overflow-scroll bg-primary-alt pb-6 pt-3 md:block">
        <KloudListSidebar />
      </aside>
      <div className="flex h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] w-full flex-grow justify-center px-4 pb-[64px] md:h-[calc(100dvh-80px)] md:max-h-[calc(100dvh-80px)] md:max-w-[calc(100vw-240px-240px)] md:px-10 md:pb-6 md:pt-3">
        {children}
      </div>
      <MobileNav />
    </div>
  );
};

export default SidebarLayout;
