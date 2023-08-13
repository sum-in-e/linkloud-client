'use client';

import { useRouter } from 'next/navigation';
import { Skeleton } from '@chakra-ui/react';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import LogOutButton from '@/features/my/containers/LogOut';
import SignOutButton from '@/features/my/containers/SignOut';
import UserInfo from '@/features/my/containers/UserInfo';
import NotificationArea from '@/features/my/containers/Notification';

const MyProfile = () => {
  const { isLoading } = useGetSessionQuery();

  if (isLoading) {
    return (
      <div className="flex w-full max-w-[340px] flex-col items-center gap-5 py-5">
        <div className="skeleton h-7 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-3/5 rounded-full" />
        <div className="skeleton h-32 w-4/5 rounded-lg" />
      </div>
    );
  }

  return (
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
  );
};

export default MyProfile;

const Devider = () => {
  return <hr className="w-full border-gray-300" />;
};
