'use client';

import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import MenuListError from '@/common/containers/MenuListWithCreateLink/DataFetchUI/ErrorUI';
import MenuListLoading from '@/common/containers/MenuListWithCreateLink/DataFetchUI/LoadingUI';
import CreateLinkButton from '@/features/link/containers/CreateLink/CreateLinkButton';
import AllButton from '@/common/containers/MenuButton/All';
import CollectionButton from '@/common/containers/MenuButton/Collection';
import UnreadButton from '@/common/containers/MenuButton/Unread';
import UncategorizedButton from '@/common/containers/MenuButton/Uncategorized';

const MenuListWithCreateLink = () => {
  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    return <MenuListLoading />;
  }

  if (!data) {
    const handleRefetch = () => {
      refetch();
    };

    return <MenuListError onRetry={handleRefetch} />;
  }

  return (
    <div>
      <AllButton />
      <CollectionButton />
      <UnreadButton isShowMark={data.unread > 0} />
      <UncategorizedButton isShowMark={data.uncategorized > 0} />
      <CreateLinkButton />
    </div>
  );
};

export default MenuListWithCreateLink;
