'use client';

import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import { BsArrowRepeat } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';

const ProfileArea = () => {
  const { data, isLoading, refetch } = useGetSessionQuery();

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="justify-center-center flex w-full flex-col gap-4 px-2">
        <p className="text-xs font-semibold text-zinc-700">ACCOUNT</p>
        <div className="flex w-full flex-col gap-1">
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
    <div className="justify-center-center flex w-full flex-col gap-4 px-2">
      <p className="text-xs font-semibold text-zinc-700">ACCOUNT</p>
      <div className="flex w-full flex-col gap-1 border-l-2 border-zinc-700 pl-2">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <div className="flex items-center gap-1">
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
