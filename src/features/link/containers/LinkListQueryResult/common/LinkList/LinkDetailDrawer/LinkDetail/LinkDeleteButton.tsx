'use client';

import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteLinkByIdMutation } from '@/features/link/modules/apiHooks/useDeleteLinkByIdMutation';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  id: number;
  onClose: () => void;
}

const LinkDeleteButton = ({ id, onClose }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    isOpen: isOpenConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen: onOpenConfirmModal,
  } = useOpen();

  const { mutate, isLoading } = useDeleteLinkByIdMutation();

  const handleDeleteLink = () => {
    mutate(
      { id },
      {
        onSuccess: (data) => {
          onClose();
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());

          toast({
            title: '링크가 제거되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크를 제거하지 못했습니다. 다시 시도해 주세요.';

            toast({
              title: message,
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const handleClick = () => {
    onOpenConfirmModal();
  };

  const title = `링크를 제거하시겠어요?`;
  const description = `"정리하지 않기" 선택 시 링크는 제거되지 않습니다.`;
  const positiveAction = {
    text: '선택한 링크 정리하기',
    action: () => {
      handleDeleteLink();
    },
    isLoading,
    color: 'red' as positiveActionColorType,
  };
  const negativeAction = {
    text: '정리하지 않기',
    action: onCloseConfirmModal,
    isLoading: false,
  };

  return (
    <>
      <button
        className="common-button bg-red-500 font-bold text-white"
        onClick={handleClick}
      >
        정리하기
      </button>
      {/* <ConfirmModal
        title={title}
        description={description}
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
        positiveAction={positiveAction}
        negativeAction={negativeAction}
      /> */}
    </>
  );
};
export default LinkDeleteButton;
