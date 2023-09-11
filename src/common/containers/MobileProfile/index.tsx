'use client';

import { BsFillPersonFill } from 'react-icons/bs';
import MobileProfileDrawer from '@/common/containers/MobileProfile/MobileProfileDrawer';
import { useOpen } from '@/common/modules/hooks/useOpen';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';

const MobileProfile = () => {
  const { isOpen, onClose, onOpen } = useOpen();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 p-1"
        onClick={onOpen}
      >
        <BsFillPersonFill className="h-full w-full fill-white" />
      </div>
      {isMobile && isOpen && <MobileProfileDrawer onClose={onClose} />}
    </>
  );
};

export default MobileProfile;
