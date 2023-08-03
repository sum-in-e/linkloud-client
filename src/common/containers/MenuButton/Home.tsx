'use client';

import { MenuButton } from '@/common/containers/MenuButton';
import { useRouter } from 'next/navigation';
import { BsHouseDoor } from 'react-icons/bs';

const HomeButton = () => {
  const router = useRouter();

  return (
    <MenuButton
      title="홈"
      leftIcon={<BsHouseDoor size={20} className="text flex-shrink-0" />}
      onClick={() => router.push('/link/all')}
      isActivating={false}
    />
  );
};
export default HomeButton;
