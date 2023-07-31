'use client';

import MenuList from '@/common/containers/MenuList';
import HomeButton from '@/common/containers/MenuList/MenuButton/HomeButton';
import KloudList from '@/features/kloud/containers/KloudList';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isMyKloudPage = pathname.includes('/link');

  return (
    <div className="flex">
      <aside className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full max-w-[200px] border-r py-3 pl-10 pr-5">
        {isMyKloudPage ? <MenuList /> : <HomeButton />}
      </aside>
      {isMyKloudPage && (
        <aside className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full max-w-[240px] overflow-scroll bg-[#3A42DA] pb-6 pt-3">
          <KloudList />
        </aside>
      )}
      <div className="flex h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full justify-center pb-6 pr-10 pt-3">
        {children}
      </div>
    </div>
  );
};
export default SidebarLayout;
