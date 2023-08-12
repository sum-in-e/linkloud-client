'use client';

import { useRouter } from 'next/navigation';
import { Skeleton } from '@chakra-ui/react';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import LogOutButton from '@/features/my/containers/LogOut';
import SignOutButton from '@/features/my/containers/SignOut';
import UserInfo from '@/features/my/containers/UserInfo';
import NotificationArea from '@/features/my/containers/Notification';

const MyProfile = () => {
  const { isLoading, data } = useGetSessionQuery();

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[70vh] w-full max-w-[340px]" />
      ) : (
        <div className="mb-10 mt-4 flex w-full max-w-[340px] flex-col gap-7 overflow-hidden">
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

export default MyProfile;

const Devider = () => {
  return <hr className="w-full border-gray-300" />;
};
