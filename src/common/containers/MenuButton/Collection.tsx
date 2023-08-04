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

const CollectionButton = ({ onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const collectionPath = '/link/collection';

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <MenuButton
      title="내 컬렉션"
      href={collectionPath}
      leftIcon={<BsJournalBookmarkFill size={20} className="flex-shrink-0" />}
      onClick={handleClick}
      isActivating={pathname === collectionPath}
    />
  );
};

export default CollectionButton;
