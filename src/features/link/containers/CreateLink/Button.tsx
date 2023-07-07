'use client';

import Loader from '@/common/components/Loader';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { groupMapper } from '@/features/kloud/modules/types/kloudType';
import { useCreateLinkMutation } from '@/features/link/modules/apiHooks/useCreateLinkMutation';
import {
  useKloudIdState,
  useLinkState,
} from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';

interface Props {
  onClose: () => void;
}

const CreateLinkButton = ({ onClose }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { group } = useParams();

  const { link, resetLink } = useLinkState();
  const { kloudId } = useKloudIdState();

  const { mutate, isLoading } = useCreateLinkMutation();

  const handleMutate = () => {
    mutate(
      {
        ...link,
        kloudId,
      },
      {
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList()); // 링크 리스트 새로고침
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList); // 클라우드 메뉴 새로고침
          toast({
            title: '링크가 추가되었습니다!',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          resetLink();
          onClose();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크 추가에 실패하였습니다. 다시 시도해 주세요.';

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

  const isDisabled =
    link.url.length === 0 ||
    link.title.length === 0 ||
    link.thumbnailUrl.length === 0;

  return (
    <button
      type="button"
      className="common-button w-[300px] bg-primary font-bold text-white hover:bg-primary-lighter"
      onClick={handleMutate}
      disabled={isDisabled}
    >
      {isLoading ? <Loader /> : '링크 추가하기'}
    </button>
  );
};

export default CreateLinkButton;
