'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { toNumber } from 'lodash';
import { BsThreeDotsVertical, BsFillCloudFill } from 'react-icons/bs';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import DeleteKloudButton from '@/features/kloud/containers/KloudMenuList/DeleteKloudButton';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import { useOpen } from '@/common/modules/hooks/useOpen';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

interface Props {
  kloud: KloudListKloudType;
  onCloseDrawer?: () => void;
}

const KloudMenuItem = ({ kloud, onCloseDrawer }: Props) => {
  const { kloudId } = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    isOpen: isOpenPopover,
    onClose: onClosePopover,
    onOpen: onOpenPopover,
  } = useOpen();

  const handleClickDots = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Link 태그의 실행을 막기 위함
    event.stopPropagation();
    onOpenPopover();
  };

  const isActivating = toNumber(kloudId) === kloud.id;

  return (
    <Link
      href={`/link/${kloud.id}`}
      className={`color-duration relative flex w-full items-center justify-between gap-1 rounded-full border px-3 py-2 md:rounded-lg md:bg-primary-alt md:pl-3 md:pr-[5px] md:hover:bg-primary-alt-lighter ${
        isActivating ? 'bg-zinc-200' : 'bg-white'
      }`}
      onClick={onCloseDrawer}
    >
      {isMobile && <BsFillCloudFill size={20} className="fill-primary-alt" />}

      <p
        className={`${
          isActivating
            ? 'md:font-extrabold md:text-white'
            : 'md:font-medium md:text-gray-300'
        } w-full truncate text-start text-sm font-bold text-black md:text-xs`}
      >
        {kloud.name}
      </p>

      {kloud.unreadLinkCount > 0 && (
        <div className="absolute left-[8px] top-[8px] h-[6px] w-[6px] rounded-full bg-secondary-lighter" />
      )}

      <div className="flex w-fit items-center justify-end">
        <Popover
          isOpen={isOpenPopover}
          onClose={onClosePopover}
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <button
              className="rounded-lg p-1 md:bg-primary-alt md:hover:bg-primary-alt-darker"
              onClick={handleClickDots}
            >
              <BsThreeDotsVertical
                size={16}
                className="fill-black md:fill-white"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <DeleteKloudButton kloud={kloud} />
          </PopoverContent>
        </Popover>
      </div>
    </Link>
  );
};
export default KloudMenuItem;
