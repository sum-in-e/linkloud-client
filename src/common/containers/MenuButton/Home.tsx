'use client';

import { MenuButton } from '@/common/containers/MenuButton';
import { useRouter } from 'next/navigation';
import { BsHouseDoor } from 'react-icons/bs';

const HomeButton = () => {
  const router = useRouter();
  const homepath = '/link/all';

  return (
    <MenuButton
      title="홈"
      href={homepath}
      leftIcon={<BsHouseDoor size={20} className="text flex-shrink-0" />}
      isActivating={false}
    />
  );
};
export default HomeButton;
