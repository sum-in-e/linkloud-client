'use client';

import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'lodash';
import { josa } from 'josa';
import { BsChevronDown, BsArrowLeft } from 'react-icons/bs';
import { usePatchSelectedLinksKloudMutation } from '@/features/link/modules/apiHooks/usePatchSelectedLinksKloudMutation';
import Loader from '@/common/components/Loader';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import KloudSelector from '@/features/kloud/containers/KloudSelector';
import CustomModal from '@/common/components/CustomModal';
import { LinkInfoKloudType } from '@/features/link/modules/apis/link';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  selectedIds: number[];
}

const KloudSelectModal = ({ onClose, onSuccess, selectedIds }: Props) => {
  const toast = useToast();
  const { kloudId } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [isShowKloudSelector, setIsShowKloudSelector] = useState(false);
  const [kloud, setKloud] = useState<LinkInfoKloudType>(null);

  const selectedKloudId = kloud === null ? null : kloud.id;
  const selectedKloudTitle = kloud === null ? '미분류' : kloud.name;

  const { mutate, isLoading } = usePatchSelectedLinksKloudMutation();

  const handleSelect = (newKloudId: number | null, newKloudName: string) => {
    setKloud(
      newKloudId === null ? null : { id: newKloudId, name: newKloudName }
    );
    setIsShowKloudSelector(false);
  };

  // 현재 페이지의 클라우드와 같은 클라우드를 선택했거나 현재 미분류 링크 페이지인데 미분류 카테고리를 선택할 경우 버튼 비활성화
  const isDisabledMoveButton =
    (kloudId && toNumber(kloudId) === selectedKloudId) ||
    (pathname === '/link/uncategorized' && selectedKloudId === null);

  const handleClick = () => {
    mutate(
      { linkIds: selectedIds, kloudId: selectedKloudId },
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

  const title = josa(
    `${selectedIds.length}개의 링크를 "${selectedKloudTitle}"#{으로} 옮기시겠어요?`
  );

  return (
    <CustomModal onClose={onClose}>
      {isShowKloudSelector ? (
        <div className="flex w-[340px] flex-col rounded-2xl bg-white">
          <div className="px-3 pt-3 md:px-5">
            <button
              type="button"
              className="w-fit rounded-full p-2"
              onClick={() => setIsShowKloudSelector(false)}
            >
              <BsArrowLeft size={18} />
            </button>
          </div>
          <KloudSelector kloudId={selectedKloudId} onChange={handleSelect} />
        </div>
      ) : (
        <div className="flex w-[340px] flex-col gap-5 rounded-2xl bg-white p-5">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm font-semibold text-gray-600">{`이동할 클라우드를 선택해 주세요.`}</p>
          <button
            type="button"
            className="reset-button flex items-center justify-between rounded-full bg-zinc-100 px-4 py-3"
            onClick={() => setIsShowKloudSelector(true)}
          >
            <p className="truncate text-sm">{selectedKloudTitle}</p>
            <BsChevronDown size={15} className="flex-shrink-0" />
          </button>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleClick}
              disabled={isDisabledMoveButton}
              className="reset-button rounded-full bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-lighter"
            >
              {isLoading ? <Loader /> : '이동하기'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="reset-button rounded-full bg-black px-4 py-3 text-sm font-bold text-white hover:bg-gray-900"
            >
              기존 클라우드 유지하기
            </button>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default KloudSelectModal;
