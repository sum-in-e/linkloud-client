'use client';

import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteSelectedLinksMutation } from '@/features/link/modules/apiHooks/useDeleteSelectedLinksMutation';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const DeleteHandler = ({ onDisableEditMode, selectedIds }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen, onToggle } = useOpen();

  const { mutate, isLoading } = useDeleteSelectedLinksMutation();

  const handleMutate = () => {
    mutate(
      { linkIds: selectedIds },
      {
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList()); // 링크 리스트 새로고침
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList); // 클라우드 메뉴 새로고침

          toast({
            title: '선택한 링크를 정리하였습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
          onDisableEditMode();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '선택한 링크를 삭제하지 못했습니다. 다시 시도해 주세요.';

            toast({
              title: message,
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const linkCount = selectedIds.length;
  const title = `${linkCount}개의 링크를 제거하시겠어요?`;
  const description = `"정리하지 않기" 선택 시 링크는 제거되지 않습니다.`;
  const positiveAction = {
    text: '선택한 링크 정리하기',
    action: () => {
      handleMutate();
    },
    isLoading,
    color: 'red' as positiveActionColorType,
  };
  const negativeAction = {
    text: '정리하지 않기',
    action: onClose,
    isLoading: false,
  };

  return (
    <>
      <button
        onClick={onOpen}
        disabled={selectedIds.length === 0}
        className="common-button w-fit bg-red-500 px-3 py-2 font-bold text-white hover:bg-red-400"
      >
        정리하기
      </button>
      {/* {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          description={description}
          negativeAction={negativeAction}
          positiveAction={positiveAction}
        />
      )} */}
    </>
  );
};
export default DeleteHandler;
