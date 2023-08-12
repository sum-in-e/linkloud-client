'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useCreateLinkMutation } from '@/features/link/modules/apiHooks/useCreateLinkMutation';
import { useLinkState } from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  onClose: () => void;
}

export const useCreateLinkHook = ({ onClose }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { link, resetLink } = useLinkState();

  const { mutate, isLoading } = useCreateLinkMutation();

  const handleMutate = () => {
    mutate(
      {
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnailUrl: link.thumbnailUrl,
        kloudId: link.kloud === null ? null : link.kloud.id,
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

  return {
    isDisabled,
    isLoading,
    onCreateLinkMutate: handleMutate,
  };
};
