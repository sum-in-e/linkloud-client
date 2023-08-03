'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BsListUl,
  BsJournalBookmarkFill,
  BsEyeSlash,
  BsCloudSlash,
} from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuListWithCreateLink/MenuButton';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import MenuListError from '@/common/containers/MenuListWithCreateLink/DataFetchUI/ErrorUI';
import MenuListLoading from '@/common/containers/MenuListWithCreateLink/DataFetchUI/LoadingUI';
import CreateLinkButton from '@/features/link/containers/CreateLink/CreateLinkButton';

const MenuListWithCreateLink = () => {
  const router = useRouter();
  const pathname = usePathname();

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
      <MenuButton
        title="전체"
        leftIcon={<BsListUl size={20} className="flex-shrink-0" />}
        onClick={() => router.push('/link/all')}
        isActivating={pathname === '/link/all'}
      />
      <MenuButton
        title="내 컬렉션"
        leftIcon={<BsJournalBookmarkFill size={20} className="flex-shrink-0" />}
        onClick={() => router.push('/link/collection')}
        isActivating={pathname === '/link/collection'}
      />
      <MenuButton
        title="미열람"
        leftIcon={
          <div className="relative">
            {data.unread > 0 && <CircleMark />}
            <BsEyeSlash size={20} className="flex-shrink-0" />
          </div>
        }
        onClick={() => router.push('/link/unread')}
        isActivating={pathname === '/link/unread'}
      />
      <MenuButton
        title="미분류"
        leftIcon={
          <div className="relative">
            {data.uncategorized > 0 && <CircleMark />}
            <BsCloudSlash size={20} className="flex-shrink-0" />
          </div>
        }
        onClick={() => router.push('/link/uncategorized')}
        isActivating={pathname === '/link/uncategorized'}
      />
      <CreateLinkButton />
    </div>
  );
};

export default MenuListWithCreateLink;

const CircleMark = () => {
  return (
    <div className="absolute right-0 top-0 h-[6px] w-[6px] rounded-full bg-yellow-400" />
  );
};
