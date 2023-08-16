'use client';

import CustomModal from '@/common/components/CustomModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import KloudSelector from '@/features/kloud/containers/KloudSelector';
import { usePatchLinkByIdMutation } from '@/features/link/modules/apiHooks/usePatchLinkByIdMutation';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { BsArrowLeft, BsX } from 'react-icons/bs';

interface Props {
  onCloseModal: () => void;
  kloudId: number | null;
  linkId: number;
}

const KloudSelectModal = ({
  onCloseModal,
  kloudId: currentKloudId,
  linkId,
}: Props) => {
  const { kloudId } = useParams();

  const toast = useToast();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { mutate } = usePatchLinkByIdMutation();

  const handleMutate = (selectedKloudId: number | null) => {
    if (currentKloudId === selectedKloudId) {
      toast({
        title: '클라우드를 변경했습니다!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onCloseModal();
      return;
    }

    mutate(
      {
        id: linkId,
        body: {
          kloudId: selectedKloudId,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          if (kloudId)
            // 현재 페이지가 클라우드 페이지인 경우 count를 갱신하기 위해 새로고침
            queryClient.invalidateQueries(
              queryKeys.kloud.getKloudById(toNumber(kloudId))
            );

          toast({
            title: '클라우드를 변경했습니다!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onCloseModal();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            toast({
              title: '클라우드를 변경하지 못했습니다. 다시 시도해 주세요.',
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const handleSelectKloud = (kloudId: number | null, kloudName: string) => {
    handleMutate(kloudId);
  };

  return (
    <CustomModal onClose={onCloseModal}>
      <div className="flex h-[calc(var(--calcvh)*100)] w-screen flex-col rounded-none bg-white md:h-fit md:w-[400px] md:rounded-lg ">
        <div className="flex items-center justify-between px-3 pt-3 md:px-5">
          {isMobile ? (
            <button
              type="button"
              className="w-fit rounded-full px-2 py-3"
              onClick={onCloseModal}
            >
              <BsArrowLeft size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="w-fit rounded-full px-1 py-2"
              onClick={onCloseModal}
            >
              <BsX size={25} />
            </button>
          )}
        </div>
        <KloudSelector kloudId={currentKloudId} onChange={handleSelectKloud} />
      </div>
    </CustomModal>
  );
};
export default KloudSelectModal;
