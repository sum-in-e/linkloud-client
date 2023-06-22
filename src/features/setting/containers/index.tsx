'use client';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import { useEffect } from 'react';

const MySetting = () => {
  const { isLoading, refetch } = useGetSessionQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return <h1 className="md:text-2xl">{isLoading ? 'loading' : 'MyPage'}</h1>;
};

export default MySetting;
