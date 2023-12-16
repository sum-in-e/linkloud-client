'use client';

import { usePathname } from 'next/navigation';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuButton/CommonMenuButton';

interface Props {
  onClick?: () => void;
}

const FollowingButton = ({ onClick }: Props) => {
  const pathname = usePathname();
  const followingPath = '/link/following';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="나중에 볼 것"
      href={followingPath}
      leftIcon={
        <BsBookmarkPlusFill
          size={20}
          className="flex-shrink-0 fill-secondary"
        />
      }
      onClick={handleClick}
      isActivating={pathname === followingPath}
    />
  );
};

export default FollowingButton;
