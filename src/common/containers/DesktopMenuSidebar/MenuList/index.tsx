'use client';

import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import MenuListError from '@/common/containers/DesktopMenuSidebar/MenuList/ErrorUI';
import MenuListLoading from '@/common/containers/DesktopMenuSidebar/MenuList/LoadingUI';
import CreateLinkButton from '@/features/link/containers/CreateLink/CreateLinkButton';
import AllButton from '@/common/containers/MenuButton/All';
import CollectionButton from '@/common/containers/MenuButton/Collection';
import UncheckedButton from '@/common/containers/MenuButton/Unchecked';
import UncategorizedButton from '@/common/containers/MenuButton/Uncategorized';
import HomeButton from '@/common/containers/MenuButton/Home';
import LinkManagerButton from '@/common/containers/MenuButton/LinkManager';

const MenuList = () => {
  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    return (
      <div className="px-10 pt-3">
        <MenuListLoading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-10 pt-3">
        <MenuListError onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="px-10 pt-3">
      <HomeButton />
      <CollectionButton />
      <AllButton />
      <UncategorizedButton isShowMark={data.uncategorized > 0} />
      <UncheckedButton isShowMark={data.unchecked > 0} />
      <LinkManagerButton />
      <CreateLinkButton />
    </div>
  );
};

export default MenuList;
