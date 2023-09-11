'use client';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import { useOpen } from '@/common/modules/hooks/useOpen';
import SignOutReasonModal from '@/features/auth/SignOut/SignOutReasonModal';
import { BsExclamationDiamond } from 'react-icons/bs';

const SignOutArea = () => {
  const { isOpen, onOpen, onClose } = useOpen();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleClick = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center gap-3 rounded-md border px-2 py-3 text-start text-sm font-semibold text-zinc-700 md:w-fit md:border-0 md:p-0 md:hover:underline"
      >
        {isMobile && (
          <BsExclamationDiamond size={15} className="fill-zinc-700" />
        )}
        회원탈퇴
      </button>
      {isOpen && <SignOutReasonModal onClose={handleClose} />}
    </>
  );
};

export default SignOutArea;
