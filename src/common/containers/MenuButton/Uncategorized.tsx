'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BsFillInboxFill } from 'react-icons/bs';
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
          {isShowMark && (
            <div className="absolute -left-1 top-0 h-[6px] w-[6px] rounded-full bg-red-500" />
          )}
          <BsFillInboxFill size={20} className="flex-shrink-0" />
        </div>
      }
      onClick={handleClick}
      isActivating={pathname === uncategorizedPath}
    />
  );
};

export default UncategorizedButton;
