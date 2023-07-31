'use Client';

import DeleteHandler from '@/features/link/containers/LinkListQueryResult/common/LinkList/EditModeHandler/DeleteHandler';
import MoveHandler from '@/features/link/containers/LinkListQueryResult/common/LinkList/EditModeHandler/MoveHandler';

interface Props {
  isDisabledEditModeActivationButton: boolean;
  isEditMode: boolean;
  onEnableEditMode: () => void;
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const EditModeHandler = ({
  isDisabledEditModeActivationButton,
  isEditMode,
  onEnableEditMode,
  onDisableEditMode,
  selectedIds,
}: Props) => {
  return isEditMode ? (
    <div className="flex items-center gap-1">
      <p className="text-md font-bold">{`(${selectedIds.length})`}</p>
      <MoveHandler
        onDisableEditMode={onDisableEditMode}
        selectedIds={selectedIds}
      />
      <DeleteHandler
        onDisableEditMode={onDisableEditMode}
        selectedIds={selectedIds}
      />
      <div className="mx-1 h-7 border-r-2 border-gray-500" />
      <button
        onClick={onDisableEditMode}
        className="common-button w-fit bg-black px-3 py-2 font-bold text-white hover:bg-gray-800"
      >
        수정 종료
      </button>
    </div>
  ) : (
    <button
      onClick={onEnableEditMode}
      disabled={isDisabledEditModeActivationButton}
      className="common-button w-fit bg-black px-3 py-2 font-bold text-white hover:bg-gray-800"
    >
      선택하기
    </button>
  );
};

export default EditModeHandler;
