'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BsListUl } from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuButton';

interface Props {
  onClick?: () => void;
}

const AllButton = ({ onClick }: Props) => {
  const pathname = usePathname();
  const allPath = '/link/all';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="전체"
      leftIcon={<BsListUl size={20} className="flex-shrink-0" />}
      href={allPath}
      onClick={handleClick}
      isActivating={pathname === allPath}
    />
  );
};

export default AllButton;
