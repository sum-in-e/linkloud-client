'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import CreateKloudModal from '@/features/kloud/containers/KloudList/CreatKloud/CreateKloudModal';

import { BsCloudPlus } from 'react-icons/bs';

const NewKloudButton = () => {
  const { isOpen, onClose, onOpen } = useOpen();

  return (
    <>
      <button
        type="button"
        className="min-h-20 group flex h-20 max-h-20 items-center justify-center rounded-2xl bg-slate-100 px-2 py-3 hover:bg-slate-200"
        onClick={onOpen}
      >
        <BsCloudPlus
          size={25}
          className="fill-slate-400 group-hover:fill-slate-500"
        />
      </button>

      {isOpen && <CreateKloudModal onClose={onClose} />}
    </>
  );
};

export default NewKloudButton;
