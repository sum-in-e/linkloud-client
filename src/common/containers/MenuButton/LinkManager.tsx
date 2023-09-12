'use client';

import { MenuButton } from '@/common/containers/MenuButton';
import { usePathname } from 'next/navigation';
import { BsMagic } from 'react-icons/bs';

interface Props {
  onClick?: () => void;
}

const LinkManagerButton = ({ onClick }: Props) => {
  const pathname = usePathname();
  const linkManagerPath = '/link/manager';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="링크 관리 매니저"
      href={linkManagerPath}
      leftIcon={
        <BsMagic size={20} className="flex-shrink-0 fill-primary-alt" />
      }
      onClick={handleClick}
      isActivating={pathname === linkManagerPath}
    />
  );
};
export default LinkManagerButton;
