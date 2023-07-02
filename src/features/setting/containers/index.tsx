'use client';
import NotFoundPage from '@/app/not-found';
import NeedLogin from '@/common/containers/NeedLogin';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import UserInfoSkeleton from '@/features/setting/components/UserInfoSkeleton';
import LogOutButton from '@/features/setting/containers/LogOut';
import SignOutButton from '@/features/setting/containers/SignOut';
import UserInfo from '@/features/setting/containers/UserInfo';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MySetting = () => {
  const { isLoading, refetch, data } = useGetSessionQuery();

  const router = useRouter();

  const handleClick = () => {
    router.push('/kloud/all');
  };

  useEffect(() => {
    refetch(); // 로그인한 유저 확인
  }, [refetch]);

  return (
    <div className="my-10 flex w-full justify-center">
      {isLoading ? (
        <UserInfoSkeleton />
      ) : data ? (
        <div className="flex w-full max-w-[340px] flex-col gap-7">
          <UserInfo />
          <hr className="w-full border-gray-300" />
          <section className="flex gap-2 md:flex-row">
            <LogOutButton />
            <SignOutButton />
          </section>
          <button
            onClick={handleClick}
            className="common-button bg-gray-700 py-3 font-bold text-white"
          >
            마이클라우드로 가기 임시버튼
          </button>
        </div>
      ) : (
        <NeedLogin />
      )}
    </div>
  );
};

export default MySetting;
