'use client';

import { BsArrowRepeat } from 'react-icons/bs';
import AllButton from '@/common/containers/MenuButton/All';
import CollectionButton from '@/common/containers/MenuButton/Collection';
import UncategorizedButton from '@/common/containers/MenuButton/Uncategorized';
import UnreadButton from '@/common/containers/MenuButton/Unread';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';

interface Props {
  onCloseDrawer: () => void;
}

const NotKloudMenuList = ({ onCloseDrawer }: Props) => {
  const { data, isLoading, refetch } = useGetGroupMenuListQuery();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-2 p-3 md:p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-full animate-pulse rounded-full bg-gray-300"
          />
        ))}
      </section>
    );
  }
  if (!data) {
    const handleRefetch = () => {
      refetch();
    };
    return (
      <section className="flex w-full flex-col items-center gap-2 py-5">
        <p className="whitespace-pre-wrap break-keep text-center text-sm font-semibold">
          메뉴를 불러오는데 실패했습니다.
        </p>
        <button
          className="rounded-full bg-black p-[6px] hover:bg-gray-700"
          onClick={handleRefetch}
        >
          <BsArrowRepeat size={18} className="fill-white" />
        </button>
      </section>
    );
  }

  return (
    <>
      <AllButton onClick={onCloseDrawer} />
      <CollectionButton onClick={onCloseDrawer} />
      <UnreadButton isShowMark={data.unread > 0} onClick={onCloseDrawer} />
      <UncategorizedButton
        isShowMark={data.uncategorized > 0}
        onClick={onCloseDrawer}
      />
    </>
  );
};
export default NotKloudMenuList;
