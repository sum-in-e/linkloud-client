'use client';
import { useOpen } from '@/common/modules/hooks/useOpen';
import SignOutReasonModal from '@/features/setting/containers/SignOut/SignOutReasonModal';

const SignOutButton = () => {
  const { isOpen, onOpen, onClose } = useOpen();

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
        onClick={handleClick}
        className=" flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-400 focus:outline-none"
      >
        회원탈퇴
      </button>
      {isOpen && <SignOutReasonModal onClose={handleClose} />}
    </>
  );
};

export default SignOutButton;
