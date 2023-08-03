'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BsListUl,
  BsJournalBookmarkFill,
  BsEyeSlash,
  BsCloudSlash,
} from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuButton';

interface Props {
  onClick?: () => void;
}

const AllButton = ({ onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const allPath = '/link/all';

  const handleClick = () => {
    router.push(allPath);
    onClick && onClick();
  };

  return (
    <MenuButton
      title="전체"
      leftIcon={<BsListUl size={20} className="flex-shrink-0" />}
      onClick={handleClick}
      isActivating={pathname === allPath}
    />
  );
};

export default AllButton;
