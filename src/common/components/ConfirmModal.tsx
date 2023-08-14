'use client';

import CustomModal from '@/common/components/CustomModal';
import Loader from '@/common/components/Loader';

export type positiveActionColorType = 'blue' | 'red';

interface Props {
  onClose: () => void;
  title: string;
  description: string;
  positiveAction: {
    text: string;
    action: () => void;
    isLoading: boolean;
    color: positiveActionColorType;
  };
  negativeAction: {
    text: string;
    action: () => void;
    isLoading: boolean;
  };
}

const ConfirmModal = ({
  onClose,
  title,
  description,
  positiveAction,
  negativeAction,
}: Props) => {
  return (
    <CustomModal onClose={onClose}>
      <div className="flex max-w-[340px] flex-col gap-5 rounded-2xl bg-white p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm font-semibold text-gray-600">{description}</p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={positiveAction.action}
            className={`reset-button rounded-full px-4 py-3 text-sm font-bold text-white  ${
              positiveAction.color === 'red'
                ? 'bg-red-500 hover:bg-red-400'
                : 'bg-primary hover:bg-primary-lighter'
            }`}
          >
            {positiveAction.isLoading ? <Loader /> : positiveAction.text}
          </button>
          <button
            type="button"
            onClick={negativeAction.action}
            className="reset-button rounded-full bg-black px-4 py-3 text-sm font-bold text-white hover:bg-gray-800"
          >
            {negativeAction.isLoading ? <Loader /> : negativeAction.text}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;
