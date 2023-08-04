'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BsListUl,
  BsJournalBookmarkFill,
  BsEyeSlash,
  BsCloudSlash,
} from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuButton';
import YellowCircleMark from '@/common/components/YellowCircleMark';

interface Props {
  onClick?: () => void;
  isShowMark: boolean;
}

const UnreadButton = ({ onClick, isShowMark }: Props) => {
  const pathname = usePathname();
  const unreadPath = '/link/unread';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="미열람"
      href={unreadPath}
      leftIcon={
        <div className="relative">
          {isShowMark && <YellowCircleMark />}
          <BsEyeSlash size={20} className="flex-shrink-0" />
        </div>
      }
      onClick={handleClick}
      isActivating={pathname === unreadPath}
    />
  );
};

export default UnreadButton;
