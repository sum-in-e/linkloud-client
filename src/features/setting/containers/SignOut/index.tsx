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
        type="button"
        onClick={handleClick}
        className="w-fit rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-400"
      >
        회원탈퇴
      </button>
      {isOpen && <SignOutReasonModal onClose={handleClose} />}
    </>
  );
};

export default SignOutButton;
