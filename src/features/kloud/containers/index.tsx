'use client';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const MyKloud = () => {
  const { isLoading, refetch } = useGetSessionQuery();
  const { group } = useParams();

  useEffect(() => {
    refetch(); // 로그인한 유저 확인
  }, [refetch]);

  return (
    <div>
      <p className="text-2xl font-bold">
        {isLoading ? 'loading' : '마이클라우드 페이지'}
      </p>
      <Link
        href="/setting"
        className="focus:shadow-outline mt-10 flex w-[300px] select-none items-center justify-center gap-1 rounded-2xl bg-gray-700 py-3 text-sm font-bold text-white focus:outline-none"
      >
        마이페이지로 가기(임시버튼)
      </Link>
    </div>
  );
};

export default MyKloud;
