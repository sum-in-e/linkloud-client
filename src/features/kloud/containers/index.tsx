'use client';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const MyKloud = () => {
  const { isLoading, refetch } = useGetSessionQuery();
  const { group } = useParams();

  useEffect(() => {
    refetch(); // 로그인한 유저 확인
  }, [refetch]);

  return <div>{isLoading ? 'loading' : group}</div>;
};

export default MyKloud;
