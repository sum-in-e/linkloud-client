'use client';

import { MenuButton } from '@/common/containers/MenuButton';
import { usePathname } from 'next/navigation';
import { BsHouseDoor } from 'react-icons/bs';

interface Props {
  onClick?: () => void;
}

const HomeButton = ({ onClick }: Props) => {
  const pathname = usePathname();
  const homepath = '/link/home';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="홈"
      href={homepath}
      leftIcon={<BsHouseDoor size={20} className="flex-shrink-0" />}
      onClick={handleClick}
      isActivating={pathname === homepath}
    />
  );
};
export default HomeButton;
