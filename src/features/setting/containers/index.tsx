'use client';

import { useRouter } from 'next/navigation';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import UserInfoSkeleton from '@/features/setting/components/UserInfoSkeleton';
import LogOutButton from '@/features/setting/containers/LogOut';
import SignOutButton from '@/features/setting/containers/SignOut';
import UserInfo from '@/features/setting/containers/UserInfo';
import NotificationHandler from '@/features/setting/containers/NotificationHandler';

const MySetting = () => {
  const { isLoading, data } = useGetSessionQuery();

  const router = useRouter();

  const handleClick = () => {
    router.push('/kloud/all');
  };

  return (
    <div className="my-10 flex w-full justify-center">
      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <div className="flex w-full max-w-[340px] flex-col gap-7">
          <UserInfo />
          <hr className="w-full border-gray-300" />
          <NotificationHandler />
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
      )}
    </div>
  );
};

export default MySetting;
