'use client';

import Loader from '@/common/components/Loader';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import KloudSelector from '@/features/kloud/containers/KloudSelector';
import { groupMapper } from '@/features/kloud/modules/types/kloudType';
import { usePatchSelectedLinksKloudMutation } from '@/features/link/modules/apiHooks/usePatchSelectedLinksKloudMutation';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { josa } from 'josa';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedIds: number[];
}

const KloudSelectModal = ({
  isOpen,
  onClose,
  onSuccess,
  selectedIds,
}: Props) => {
  console.log('modal');
  const toast = useToast();
  const { group } = useParams();
  const queryClient = useQueryClient();

  const [kloudId, setKloudId] = useState<number | null>(null);
  const [kloudName, setKloudName] = useState('미분류');

  const { mutate, isLoading } = usePatchSelectedLinksKloudMutation();

  const handleChange = (newKloudId: number | null, newKloudName: string) => {
    setKloudId(newKloudId);
    setKloudName(newKloudName);
  };

  const isUsersKloud = !Object.keys(groupMapper).includes(group); // 유저가 생성한 클라우드인지를 반환

  const isDisabledMoveButton =
    (isUsersKloud && toNumber(group) === kloudId) ||
    (group === 'uncategorized' && kloudId === null);

  const handleClick = () => {
    mutate(
      { linkIds: selectedIds, kloudId },
      {
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList()); // 링크 리스트 새로고침
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList); // 클라우드 메뉴 새로고침

          toast({
            title: '선택한 링크의 클라우드를 변경하였습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
          onSuccess();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '선택한 링크의 클라우드 이동에 실패하였습니다. 다시 시도해 주세요.';

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

  const handleClose = () => {
    onClose();
    if (kloudId !== null) setKloudId(null);
    if (kloudName !== '미분류') setKloudName('미분류');
  };

  const title = josa(
    `${selectedIds.length}개의 링크를 "${kloudName}"#{으로} 옮기시겠어요?`
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      colorScheme="yellow"
    >
      <ModalContent className="max-w-[340px] rounded-3xl">
        <ModalHeader className="font-bold">{title}</ModalHeader>
        <ModalBody>
          <p className="mb-2 text-sm font-semibold text-gray-600">{`"기존 클라우드 유지하기" 선택 시 클라우드는 변경되지 않습니다.`}</p>
          <KloudSelector kloudId={kloudId} onChange={handleChange} />
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2">
          <button
            onClick={handleClick}
            disabled={isDisabledMoveButton}
            className="common-button bg-primary font-bold text-white hover:bg-primary-lighter"
          >
            {isLoading ? <Loader /> : '이동하기'}
          </button>
          <button
            onClick={handleClose}
            className="common-button bg-black font-bold text-white hover:bg-gray-900"
          >
            기존 클라우드 유지하기
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KloudSelectModal;
