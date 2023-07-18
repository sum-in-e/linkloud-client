'use client';

import { useRouter } from 'next/navigation';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import UserInfoSkeleton from '@/features/setting/components/UserInfoSkeleton';
import LogOutButton from '@/features/setting/containers/LogOut';
import SignOutButton from '@/features/setting/containers/SignOut';
import UserInfo from '@/features/setting/containers/UserInfo';
import NotificationHandler from '@/features/setting/containers/NotificationHandler';
import { FaArrowLeft } from 'react-icons/fa';

const MySetting = () => {
  const { isLoading, data } = useGetSessionQuery();

  const router = useRouter();

  const handleClick = () => {
    router.push('/kloud/all');
  };

  return (
    <>
      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <div className="flex w-full max-w-[340px] flex-col gap-7 overflow-hidden">
          <button
            type="button"
            onClick={handleClick}
            className="h-fit w-fit rounded-2xl border-[1px] border-stone-200 px-4 py-2 hover:bg-slate-200"
          >
            <FaArrowLeft size={15} className="fill-gray-600" />
          </button>
          <UserInfo />
          <hr className="bordser-gray-300 w-full" />
          <NotificationHandler />
          <hr className="w-full border-gray-300" />
          <section className="flex w-full justify-center gap-3">
            <LogOutButton />
            <SignOutButton />
          </section>
        </div>
      )}
    </>
  );
};

export default MySetting;
