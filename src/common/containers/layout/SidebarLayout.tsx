'use client';

import MenuListWithCreateLink from '@/common/containers/MenuListWithCreateLink';
import HomeButton from '@/common/containers/MenuButton/Home';
import MobileNav from '@/common/containers/MobileNav';
import KloudListSidebar from '@/features/kloud/containers/KloudListSidebar';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isMyKloudPage = pathname.includes('/link');

  return (
    <div className="flex">
      <aside className="hidden h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full max-w-[200px] border-r py-3 pl-10 pr-5 md:block">
        {isMyKloudPage ? <MenuListWithCreateLink /> : <HomeButton />}
      </aside>
      {isMyKloudPage && (
        <aside className="hidden  h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full max-w-[240px] overflow-scroll bg-primary-alt pb-6 pt-3 md:block">
          <KloudListSidebar />
        </aside>
      )}
      <div className="flex h-[calc(100vh-64px-64px)] max-h-[calc(100vh-64px-64px)] w-full justify-center px-5 md:mb-0 md:h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] md:pb-6 md:pr-10 md:pt-3 ">
        {children}
      </div>
      <MobileNav />
    </div>
  );
};
export default SidebarLayout;
