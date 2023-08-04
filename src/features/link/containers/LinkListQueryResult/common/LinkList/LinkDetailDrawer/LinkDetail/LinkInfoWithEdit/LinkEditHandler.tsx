'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePatchLinkByIdMutation } from '@/features/link/modules/apiHooks/usePatchLinkByIdMutation';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  id: number;
  title?: string;
  description?: string;
  memo?: string;
  isInMyCollection?: boolean;
  kloudId?: number | null;
  isEditMode: boolean;
  handleChangeEditMode: (value: boolean) => void;
  onCloseLinkDetail: () => void;
}

const LinkEditHandler = ({
  id,
  title,
  description,
  memo,
  isInMyCollection,
  kloudId,
  isEditMode,
  handleChangeEditMode,
  onCloseLinkDetail,
}: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate } = usePatchLinkByIdMutation();

  const handleClickEnable = () => {
    handleChangeEditMode(true);
  };

  const handleClickCancel = () => {
    handleChangeEditMode(false);
  };

  const handleMutate = () => {
    let body = {};

    if (title !== undefined) body = { ...body, title };
    if (description !== undefined) body = { ...body, description };
    if (memo !== undefined) body = { ...body, memo };
    if (isInMyCollection !== undefined) body = { ...body, isInMyCollection };
    if (kloudId !== undefined) body = { ...body, kloudId };

    if (Object.keys(body).length === 0 && body.constructor === Object) {
      // * body가 빈 객체이면 변경사항 없으므로 함수 종료
      toast({
        title: '수정되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      handleChangeEditMode(false);
      return;
    }

    mutate(
      { id, body },
      {
        onSuccess: (data, varables) => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          if (
            varables.body.kloudId !== undefined ||
            varables.body.isInMyCollection !== undefined
          ) {
            // 클라우드를 변경하거나 내 컬렉션 저장 여부가 변경된 경우 그룹 리스트 새로고침
            queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          }
          toast({
            title: '수정되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          handleChangeEditMode(false);
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크 정보를 수정하지 못했습니다. 다시 시도해 주세요.';

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

  const handleClickComplete = () => {
    handleMutate();
  };

  return isEditMode ? (
    <div className="flex w-full gap-2">
      <button
        className="common-button bg-black font-bold text-white hover:bg-gray-800"
        onClick={handleClickCancel}
      >
        수정 취소
      </button>
      <button
        className="common-button bg-primary font-bold text-white hover:bg-primary-lighter"
        onClick={handleClickComplete}
        disabled={title === ''}
      >
        수정 완료
      </button>
    </div>
  ) : (
    <button
      className="common-button bg-black font-bold text-white"
      onClick={handleClickEnable}
    >
      수정하기
    </button>
  );
};

export default LinkEditHandler;
