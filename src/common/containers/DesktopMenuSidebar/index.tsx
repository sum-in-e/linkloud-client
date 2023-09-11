'use client';

import HelpAndInfoArea from '@/common/containers/HelpAndInfoArea';
import MenuList from '@/common/containers/DesktopMenuSidebar/MenuList';
import Profile from '@/common/containers/DesktopMenuSidebar/Profile';
import LogOutArea from '@/features/auth/LogOut';

const DesktopMenuSidebar = () => {
  return (
    <aside className="flex h-full flex-col justify-between">
      <MenuList />
      <div>
        <HelpAndInfoArea />
        <LogOutArea />
        <Profile />
      </div>
    </aside>
  );
};

export default DesktopMenuSidebar;
