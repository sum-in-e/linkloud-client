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

const UncategorizedButton = ({ onClick, isShowMark }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const uncategorizedPath = '/link/uncategorized';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="미분류"
      href={uncategorizedPath}
      leftIcon={
        <div className="relative">
          {isShowMark && <YellowCircleMark />}
          <BsCloudSlash size={20} className="flex-shrink-0" />
        </div>
      }
      onClick={handleClick}
      isActivating={pathname === uncategorizedPath}
    />
  );
};

export default UncategorizedButton;
