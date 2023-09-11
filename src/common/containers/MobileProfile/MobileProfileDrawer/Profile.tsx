'use client';

import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import { BsFillPersonFill, BsArrowRepeat } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';

const ProfileArea = () => {
  const { data, isLoading, refetch } = useGetSessionQuery();

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 px-2">
        <div className="flex aspect-square h-auto w-[15%] flex-shrink-0 items-center justify-center rounded-full bg-zinc-400 p-1">
          <BsFillPersonFill className="h-full w-full fill-white" />
        </div>
        <div className="flex w-[80%] flex-col gap-1">
          <div className="skeleton h-4 w-20 rounded-sm" />
          <div className="skeleton h-4 w-32 rounded-sm" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1 rounded-md border px-2 py-3 text-sm"
        onClick={handleRefetch}
      >
        유저 정보 다시 불러오기
        <BsArrowRepeat size={18} className="fill-black" />
      </button>
    );
  }

  const info = data.data;
  const method = info.method;
  const name = info.name || '유저';
  const email = info.email || '';

  return (
    <div className="flex w-full items-center gap-3 px-2">
      <div className="flex aspect-square h-auto w-[15%] flex-shrink-0 items-center justify-center rounded-full bg-zinc-400 p-1">
        <BsFillPersonFill className="h-full w-full fill-white" />
      </div>
      <div className="w-[80%]">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <div className="flex items-center gap-1 ">
          {method === 'kakao' && (
            <div className="h-fit w-fit rounded-full bg-[#FAE100] p-1">
              <RiKakaoTalkFill size={10} />
            </div>
          )}
          <p className="truncate text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileArea;
