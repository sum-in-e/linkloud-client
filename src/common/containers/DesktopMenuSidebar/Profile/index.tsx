'use client';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useGetSessionQuery } from '@/features/auth/common/modules/apiHooks/useGetSessionQuery';
import SignOutArea from '@/features/auth/SignOut';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import {
  BsFillPersonFill,
  BsArrowRepeat,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Profile = () => {
  const { data, isLoading, refetch } = useGetSessionQuery();
  const { isOpen, onOpen, onClose } = useOpen();

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-between gap-2 border-t border-zinc-200 px-10 py-5 pb-5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-400 p-1 ">
          <BsFillPersonFill className="h-full w-full fill-white" />
        </div>
        <div className="skeleton h-5 w-2/3 rounded-sm" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex w-full items-center border-t border-zinc-200 px-10 py-5 pb-5">
        <button
          type="button"
          className="flex w-full justify-center rounded-full bg-zinc-300 px-4 py-2 hover:bg-zinc-200"
          onClick={handleRefetch}
        >
          <BsArrowRepeat size={18} className="fill-black" />
        </button>
      </div>
    );
  }

  const info = data.data;
  const method = info.method;
  const name = info.name || '유저';
  const email = info.email || '';

  const handleOpenMore = () => {
    onOpen();
  };

  return (
    <div className="flex w-full max-w-full items-center justify-between gap-2 border-t border-zinc-200 px-10 py-5 pb-5">
      <div className="flex aspect-square h-auto w-[20%] flex-shrink-0 items-center justify-center rounded-full bg-zinc-400 p-1 ">
        <BsFillPersonFill className="h-full w-full fill-white" />
      </div>
      <div className="w-[60%]">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
      </div>

      <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true}>
        <PopoverTrigger>
          <button
            aria-label="Show More Options"
            type="button"
            className="group/more w-[10%]"
            onClick={handleOpenMore}
          >
            <BsThreeDotsVertical
              size={15}
              className={`color-duration flex-shrink-0 fill-black transition-colors md:group-hover/more:fill-zinc-600`}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col gap-5 p-4">
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="text-xs font-semibold text-zinc-700">ACCOUNT</p>
            </div>
            <div className="flex items-center gap-1">
              {method === 'kakao' && (
                <div className="h-fit w-fit rounded-full bg-[#FAE100] p-1">
                  <RiKakaoTalkFill size={10} />
                </div>
              )}
              <p className="truncate text-sm text-gray-500">{email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t pt-5">
            <p className="text-xs font-semibold text-red-500">DANGER ZONE⚠️</p>
            <SignOutArea />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profile;
