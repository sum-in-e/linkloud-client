'use client';

import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import MenuListError from '@/common/containers/MenuListWithCreateLinkSidebar/DataFetchUI/ErrorUI';
import MenuListLoading from '@/common/containers/MenuListWithCreateLinkSidebar/DataFetchUI/LoadingUI';
import CreateLinkButton from '@/features/link/containers/CreateLink/CreateLinkButton';
import AllButton from '@/common/containers/MenuButton/All';
import CollectionButton from '@/common/containers/MenuButton/Collection';
import UncheckedButton from '@/common/containers/MenuButton/Unchecked';
import UncategorizedButton from '@/common/containers/MenuButton/Uncategorized';
import HomeButton from '@/common/containers/MenuButton/Home';

const MenuListWithCreateLinkSidebar = () => {
  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    return <MenuListLoading />;
  }

  if (!data) {
    return <MenuListError onRetry={refetch} />;
  }

  return (
    <div>
      <HomeButton />
      <AllButton />
      <CollectionButton />
      <UncheckedButton isShowMark={data.unchecked > 0} />
      <UncategorizedButton isShowMark={data.uncategorized > 0} />
      <CreateLinkButton />
    </div>
  );
};

export default MenuListWithCreateLinkSidebar;
