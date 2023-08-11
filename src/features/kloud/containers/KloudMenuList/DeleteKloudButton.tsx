'use client';

import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteKloudByIdMutation } from '@/features/kloud/modules/apiHooks/useDeleteKloudByIdMutation';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { josa } from 'josa';
import { toNumber } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Props {
  kloud: KloudListKloudType;
}

const DeleteKloudButton = ({ kloud }: Props) => {
  const { kloudId } = useParams();
  const router = useRouter();

  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useOpen();

  const { mutate: deleteKloudMutate, isLoading: isLoadingDeleteKloud } =
    useDeleteKloudByIdMutation();

  const deleteMutate = () => {
    deleteKloudMutate(
      { id: kloud.id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());

          if (toNumber(kloudId) === kloud.id) {
            // 삭제한 클라우드 페이지에 유저가 있는 경우 전체 페이지로 이동
            router.push('/link/all');
          }

          toast({
            title: '삭제되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          console.log('error', error);
        },
      }
    );
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Link 태그의 실행을 막기 위함
    event.stopPropagation();
    onOpen();
  };

  const modalInfo = {
    title: josa(`"${kloud.name}" 클라우드를 삭제하시겠어요?`),
    description: `삭제 시 클라우드에 저장된 링크도 함께 제거됩니다.`,
    positiveAction: {
      text: '삭제하기',
      action: () => {
        deleteMutate();
      },
      isLoading: isLoadingDeleteKloud,
      color: 'red' as positiveActionColorType,
    },
    negativeAction: {
      text: '삭제하지 않기',
      action: onClose,
      isLoading: false,
    },
  };

  return (
    <>
      <button
        className="w-fit rounded-md px-3 py-2 text-sm font-semibold text-red-500 hover:bg-zinc-200"
        onClick={handleClick}
      >
        삭제하기
      </button>
      {isOpen && (
        <ConfirmModal
          title={modalInfo.title}
          description={modalInfo.description}
          onClose={onClose}
          positiveAction={modalInfo.positiveAction}
          negativeAction={modalInfo.negativeAction}
        />
      )}
    </>
  );
};

export default DeleteKloudButton;
