'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BsListUl,
  BsJournalBookmarkFill,
  BsEyeSlash,
  BsCloudSlash,
  BsArrowRepeat,
} from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuList/MenuButton';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import { Skeleton } from '@chakra-ui/react';

const MenuList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-11 w-full animate-pulse rounded-full bg-gray-300"
          />
        ))}
      </div>
    );
  }

  if (!data) {
    const handleRefetch = () => {
      refetch();
    };

    return (
      <div className="flex h-full flex-col items-center gap-2 rounded-xl bg-zinc-200 py-5">
        <p className="whitespace-pre-wrap break-keep text-center text-sm font-semibold">
          메뉴를 불러오는데 실패했습니다.
        </p>
        <button
          className="rounded-full bg-primary p-[6px] hover:bg-primary-lighter"
          onClick={handleRefetch}
        >
          <BsArrowRepeat size={18} className="fill-white" />
        </button>
      </div>
    );
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
    </div>
  );
};

export default MenuList;

const CircleMark = () => {
  return (
    <div className="absolute right-0 top-0 h-[6px] w-[6px] rounded-full bg-yellow-400" />
  );
};
