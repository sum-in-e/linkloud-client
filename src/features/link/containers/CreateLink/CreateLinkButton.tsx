'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import CreateLinkModal from '@/features/link/containers/CreateLink/CreateLinkModal';

const CreateLinkButton = () => {
  const { isOpen, onClose, onOpen } = useOpen();

  return (
    <>
      <button
        type="button"
        className="color-duration w-full rounded-2xl bg-black px-5 py-2 text-sm font-bold text-white hover:bg-zinc-700"
        onClick={onOpen}
      >
        링크 추가하기
      </button>
      {isOpen && <CreateLinkModal onCloseModal={onClose} />}
    </>
  );
};

export default CreateLinkButton;
