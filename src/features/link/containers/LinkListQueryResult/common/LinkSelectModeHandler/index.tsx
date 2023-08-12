'use Client';

import DeleteHandler from '@/features/link/containers/LinkListQueryResult/common/LinkSelectModeHandler/DeleteHandler';
import MoveHandler from '@/features/link/containers/LinkListQueryResult/common/LinkSelectModeHandler/MoveHandler';
import {
  BsCheckSquareFill,
  BsCheck,
  BsTrashFill,
  BsArrowLeftRight,
} from 'react-icons/bs';

interface Props {
  isDisabledActivationButton: boolean;
  isEditMode: boolean;
  onEnableEditMode: () => void;
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const LinkSelectModeHandler = ({
  isDisabledActivationButton,
  isEditMode,
  onEnableEditMode,
  onDisableEditMode,
  selectedIds,
}: Props) => {
  return isEditMode ? (
    <div className="flex items-center gap-1">
      <p className="text-md font-semibold">{`(${selectedIds.length})`}</p>
      <MoveHandler
        onDisableEditMode={onDisableEditMode}
        selectedIds={selectedIds}
      />
      <DeleteHandler
        onDisableEditMode={onDisableEditMode}
        selectedIds={selectedIds}
      />
      <div className="mx-1 h-7 border-r border-zinc-400" />
      <button
        onClick={onDisableEditMode}
        className="reset-button w-fit rounded-full border border-zinc-400 bg-inherit px-3 py-[6px] text-xs font-semibold text-black hover:bg-zinc-200 md:text-sm"
      >
        취소하기
      </button>
    </div>
  ) : (
    <button
      onClick={onEnableEditMode}
      disabled={isDisabledActivationButton}
      className="reset-button w-fit rounded-full bg-black px-3 py-[6px] text-xs font-semibold text-white md:text-sm md:hover:bg-zinc-700"
    >
      선택하기
    </button>
  );
};

export default LinkSelectModeHandler;
