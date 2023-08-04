'use client';

import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import { Avatar, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { AiOutlineSetting } from 'react-icons/ai';

const ProfileButton = () => {
  const router = useRouter();

  const { isLoading, data } = useGetSessionQuery();

  if (isLoading || !data) {
    return <Skeleton className="my-3 h-14 w-full rounded-full" />;
  }

  const handleClick = () => {
    router.push('/my/profile');
  };

  const {
    data: { name, email },
  } = data;

  return (
    <button
      type="button"
      className="my-3 flex flex-shrink-0 items-center justify-between gap-3 rounded-full p-3 transition-colors duration-300 hover:bg-zinc-200"
      onClick={handleClick}
    >
      <Avatar className="flex h-9 w-9 flex-shrink-0 items-center" />
      <div className="flex w-full min-w-0 flex-shrink flex-col justify-center gap-[1px]">
        <p className="truncate text-start text-sm font-bold">{name}</p>
        <p className="truncate text-start text-sm text-gray-500">{email}</p>
      </div>
      <AiOutlineSetting size={20} className="flex flex-shrink-0 items-center" />
    </button>
  );
};

export default ProfileButton;
