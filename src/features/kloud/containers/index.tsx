'use client';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import MenuGroups from '@/features/kloud/containers/MenuGroups';
import CreateLink from '@/features/link/containers/CreateLink';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const MyKloud = () => {
  const { isLoading, refetch } = useGetSessionQuery();
  const { group } = useParams();

  const { onClose, isOpen, onOpen } = useOpen();

  useEffect(() => {
    refetch(); // 로그인한 유저 확인
  }, [refetch]);

  return (
    <div className="flex flex-col gap-10">
      <p className="text-2xl font-bold">
        {isLoading ? 'loading' : '마이클라우드 페이지'}
      </p>
      {isOpen && <CreateLink onClose={onClose} />}
      <button
        type="button"
        className="common-button w-[300px] bg-gray-700 font-bold text-white"
        onClick={() => onOpen()}
      >
        링크 추가하기
      </button>
      <Link
        href="/setting"
        className="common-button w-[300px] bg-gray-700 font-bold text-white"
      >
        마이페이지로 가기(임시버튼)
      </Link>
      <MenuGroups />
    </div>
  );
};

export default MyKloud;
