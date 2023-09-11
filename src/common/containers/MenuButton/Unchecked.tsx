'use client';

import { usePathname } from 'next/navigation';
import { BsEyeSlash } from 'react-icons/bs';
import { MenuButton } from '@/common/containers/MenuButton';
import YellowCircleMark from '@/common/components/YellowCircleMark';

interface Props {
  onClick?: () => void;
  isShowMark: boolean;
}

const UncheckedButton = ({ onClick, isShowMark }: Props) => {
  const pathname = usePathname();
  const uncheckedPagePath = '/link/unchecked';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="미확인"
      href={uncheckedPagePath}
      leftIcon={
        <div className="relative">
          {isShowMark && <YellowCircleMark />}
          <BsEyeSlash size={20} className="flex-shrink-0" />
        </div>
      }
      onClick={handleClick}
      isActivating={pathname === uncheckedPagePath}
    />
  );
};

export default UncheckedButton;
