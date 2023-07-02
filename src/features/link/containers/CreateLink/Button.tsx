'use client';

import Loader from '@/common/components/Loader';
import { useCreateLinkMutation } from '@/features/link/modules/apiHooks/useCreateLinkMutation';
import {
  useKloudIdState,
  useLinkState,
} from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';

interface Props {
  onClose: () => void;
}

const CreateLinkButton = ({ onClose }: Props) => {
  const toast = useToast();

  const { link } = useLinkState();
  const { kloudId } = useKloudIdState();

  const { mutate, isLoading } = useCreateLinkMutation();

  const handleMutate = () => {
    mutate(
      {
        ...link,
        kloudId,
      },
      {
        onSuccess: (data) => {
          toast({
            title: '링크가 추가되었습니다!',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
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
      className="common-button flex w-[300px] items-center justify-center bg-primary font-bold text-white hover:bg-primary-lighter"
      onClick={handleMutate}
      disabled={isDisabled}
    >
      {isLoading ? <Loader /> : '링크 추가하기'}
    </button>
  );
};

export default CreateLinkButton;
