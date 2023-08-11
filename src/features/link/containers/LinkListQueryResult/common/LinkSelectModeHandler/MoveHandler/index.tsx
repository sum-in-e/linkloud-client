'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import KloudSelectModal from '@/features/link/containers/LinkListQueryResult/common/LinkSelectModeHandler/MoveHandler/KloudSelectModal';

interface Props {
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const MoveHandler = ({ onDisableEditMode, selectedIds }: Props) => {
  const { isOpen, onClose, onOpen } = useOpen();

  return (
    <>
      <button
        onClick={onOpen}
        disabled={selectedIds.length === 0}
        className="reset-button w-fit rounded-full bg-primary px-3 py-[6px] text-sm font-semibold text-white hover:bg-primary-lighter"
      >
        이동하기
      </button>
      {isOpen && (
        <KloudSelectModal
          onClose={onClose}
          onSuccess={onDisableEditMode}
          selectedIds={selectedIds}
        />
      )}
    </>
  );
};
export default MoveHandler;
