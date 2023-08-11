'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteSelectedLinksMutation } from '@/features/link/modules/apiHooks/useDeleteSelectedLinksMutation';
import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';

interface Props {
  onDisableEditMode: () => void;
  selectedIds: number[];
}

const DeleteHandler = ({ onDisableEditMode, selectedIds }: Props) => {
  const { kloudId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen } = useOpen();

  const { mutate, isLoading } = useDeleteSelectedLinksMutation();

  const handleMutate = () => {
    mutate(
      { linkIds: selectedIds },
      {
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList()); // 링크 리스트 새로고침
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList); // 메뉴 새로고침
          if (kloudId)
            // 현재 페이지가 클라우드 페이지인 경우 count를 갱신하기 위해 새로고침
            queryClient.invalidateQueries(
              queryKeys.kloud.getKloudById(toNumber(kloudId))
            );

          toast({
            title: '선택한 링크를 정리하였습니다!🧹',
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
              '선택한 링크를 정리하지 못했습니다. 다시 시도해 주세요.';

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

  const modalInfo = {
    title: `${selectedIds.length}개의 링크를 삭제하시겠어요?`,
    description: `링크를 정리하면 공간이 깔끔해지고, 보다 효율적으로 링크를 관리할 수 있어요 :) `,
    positiveAction: {
      text: '선택한 링크 정리하기',
      action: () => {
        handleMutate();
      },
      color: 'red' as positiveActionColorType,
      isLoading,
    },
    negativeAction: {
      text: '정리하지 않기',
      action: onClose,
      isLoading: false,
    },
  };

  return (
    <>
      <button
        onClick={onOpen}
        disabled={selectedIds.length === 0}
        className="reset-button w-fit rounded-full bg-red-500 px-3 py-[6px] text-sm font-semibold text-white hover:bg-red-400"
      >
        정리하기
      </button>
      {isOpen && (
        <ConfirmModal
          onClose={onClose}
          title={modalInfo.title}
          description={modalInfo.description}
          negativeAction={modalInfo.negativeAction}
          positiveAction={modalInfo.positiveAction}
        />
      )}
    </>
  );
};
export default DeleteHandler;
