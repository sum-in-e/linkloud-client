'use client';

import Loader from '@/common/components/Loader';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export type positiveActionColorType = 'blue' | 'red';

interface Props {
  isOpen: boolean;
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
  isOpen,
  onClose,
  title,
  description,
  positiveAction,
  negativeAction,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="max-w-[340px] rounded-3xl">
        <ModalHeader className="font-bold">{title}</ModalHeader>
        <ModalBody>
          <p className="text-sm font-semibold text-gray-600">{description}</p>
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2">
          <button
            onClick={positiveAction.action}
            className={`common-button font-bold text-white  ${
              positiveAction.color === 'red'
                ? 'bg-red-500 hover:bg-red-400'
                : 'bg-primary hover:bg-primary-lighter'
            }`}
          >
            {positiveAction.isLoading ? <Loader /> : positiveAction.text}
          </button>
          <button
            onClick={negativeAction.action}
            className="common-button bg-black font-bold text-white hover:bg-gray-800"
          >
            {negativeAction.isLoading ? <Loader /> : negativeAction.text}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
