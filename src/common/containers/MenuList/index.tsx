'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BsListUl,
  BsHouseDoor,
  BsJournalBookmarkFill,
  BsEyeSlash,
  BsCloudSlash,
} from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuList/MenuButton';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import { Skeleton } from '@chakra-ui/react';

const MenuList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isFetched } = useGetGroupMenuListQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-full" />
        ))}
      </div>
    );
  }

  if (!data) {
    // TODO: 메뉴 못 불러 왔을 경우 UI 적용
    return <div></div>;
  }

  return (
    <div>
      <MenuButton
        title="홈"
        leftIcon={<BsHouseDoor size={20} className="text flex-shrink-0" />}
        onClick={() => router.push('/link/all')}
        isActivating={false}
      />
      <MenuButton
        title="내 컬렉션"
        leftIcon={<BsJournalBookmarkFill size={20} className="flex-shrink-0" />}
        onClick={() => router.push('/link/collection')}
        isActivating={pathname === '/link/collection'}
      />
      <MenuButton
        title="전체"
        leftIcon={<BsListUl size={20} className="flex-shrink-0" />}
        onClick={() => router.push('/link/all')}
        isActivating={pathname === '/link/all'}
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
    </div>
  );
};

export default MenuList;

const CircleMark = () => {
  return (
    <div className="absolute right-0 top-0 h-[6px] w-[6px] rounded-full bg-yellow-400" />
  );
};
