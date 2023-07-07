'use client';

import MenuItem from '@/features/kloud/components/MenuItem';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import KloudMenuGroup from '@/features/kloud/containers/MenuGroups/UsersKloudMenuGroup';
import MenuGroupsSkeleton from '@/features/kloud/containers/MenuGroups/MenuGroupsSkeleton';
import SearchHandler from '@/features/kloud/containers/MenuGroups/SearchHandler';

const MenuGroups = () => {
  const { data, isLoading, isFetched } = useGetGroupMenuListQuery();

  if (isFetched && !data) {
    // TODO: 이미 데이터 fetch 끝났는데 데이터 없는 경우 에러 UI 보여주기
    return (
      <div className="flex h-[500px] w-[300px] items-center justify-center bg-slate-100 text-sm font-bold">
        <p>🚨메뉴를 불러오지 못했습니다.🚨</p>
      </div>
    );
  }

  return (
    <div className="w-[300px]">
      {isLoading ? (
        <MenuGroupsSkeleton />
      ) : (
        <div className="flex w-full flex-col gap-4">
          <SearchHandler />
          <ul className="flex w-full flex-col gap-2">
            <li>
              <MenuItem
                href="/kloud/collection"
                title="내 컬렉션"
                count={data?.myCollection || 0}
              />
            </li>
            <li>
              <MenuItem href="/kloud/all" title="전체" count={data?.all || 0} />
            </li>
            <li>
              <MenuItem
                href="/kloud/unread"
                title="미열람"
                count={data?.unread || 0}
              />
            </li>
            <li>
              <MenuItem
                href="/kloud/uncategorized"
                title="미분류"
                count={data?.uncategorized || 0}
              />
            </li>
          </ul>
          <KloudMenuGroup />
        </div>
      )}
    </div>
  );
};

export default MenuGroups;
