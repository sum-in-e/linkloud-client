'use client';

import { useRouter } from 'next/navigation';
import { Skeleton } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import LogOutButton from '@/features/setting/containers/LogOut';
import SignOutButton from '@/features/setting/containers/SignOut';
import UserInfo from '@/features/setting/containers/UserInfo';
import NotificationArea from '@/features/setting/containers/Notification';

const MySetting = () => {
  const { isLoading, data } = useGetSessionQuery();

  const router = useRouter();

  const handleClick = () => {
    router.push('/kloud/all');
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[70vh] w-full max-w-[340px]" />
      ) : (
        <div className="mb-10 flex w-full max-w-[340px] flex-col gap-7 overflow-hidden">
          <button
            type="button"
            onClick={handleClick}
            className="h-fit w-fit rounded-2xl border-[1px] border-stone-200 px-4 py-2"
          >
            <FaArrowLeft size={15} className="fill-gray-600" />
          </button>
          <UserInfo />
          <Devider />
          <NotificationArea />
          <Devider />
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

const Devider = () => {
  return <hr className="w-full border-gray-300" />;
};
