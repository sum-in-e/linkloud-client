'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import KloudSelectModal from '@/features/kloud/containers/ResultContainer/LinkListSection/EditModeHandler/MoveHandler/KloudSelectModal';

interface Props {
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const MoveHandler = ({ onDisableEditMode, selectedIds }: Props) => {
  const { isOpen, onClose, onOpen, onToggle } = useOpen();

  const handleOpenConfirm = () => {
    onOpen();
  };

  const handleSuccess = () => {
    onDisableEditMode();
  };

  return (
    <>
      <button
        onClick={handleOpenConfirm}
        disabled={selectedIds.length === 0}
        className="common-button w-fit bg-primary px-3 py-2 font-bold text-white hover:bg-primary-lighter"
      >
        이동하기
      </button>
      {isOpen && (
        <KloudSelectModal
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={handleSuccess}
          selectedIds={selectedIds}
        />
      )}
    </>
  );
};
export default MoveHandler;
