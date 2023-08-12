'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import EditKloudModal from '@/features/kloud/containers/KloudMenuList/EditKloudButton/EditKloudModal';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import { MouseEvent } from 'react';

interface Props {
  kloud: KloudListKloudType;
}

const EditKloudButton = ({ kloud }: Props) => {
  const { isOpen, onClose, onOpen } = useOpen();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Link 태그의 실행을 막기 위함
    event.stopPropagation();
    onOpen();
  };

  return (
    <>
      <button
        className="w-fit rounded-md px-3 py-2 text-sm font-semibold hover:bg-zinc-200"
        onClick={handleClick}
      >
        수정하기
      </button>
      {isOpen && <EditKloudModal kloud={kloud} onCloseModal={onClose} />}
    </>
  );
};

export default EditKloudButton;
