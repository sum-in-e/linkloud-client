'use client';

import MenuList from '@/common/containers/DesktopMenuSidebar/MenuList';
import ProfileContainer from '@/common/containers/DesktopMenuSidebar/ProfileContainer';
import HelpAndInfoButton from '@/common/containers/DesktopMenuSidebar/HelpAndInfoButton';
import LogOutButton from '@/common/containers/DesktopMenuSidebar/LogOutButton';

const DesktopMenuSidebar = () => {
  return (
    <aside className="flex h-full flex-col justify-between">
      <MenuList />
      <div>
        <HelpAndInfoButton />
        <LogOutButton />
        <ProfileContainer />
      </div>
    </aside>
  );
};

export default DesktopMenuSidebar;
