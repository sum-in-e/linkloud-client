'use client';

import { useCreateLinkMutation } from '@/features/link/modules/apiHooks/useCreateLinkMutation';
import {
  useKloudIdState,
  useLinkState,
} from '@/features/link/modules/stores/createLinkStore';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

const CreateLinkButton = ({ onClose }: Props) => {
  const toast = useToast();

  const { link } = useLinkState();
  const { kloudId } = useKloudIdState();

  const { mutate, data, isSuccess, isError, error } = useCreateLinkMutation();

  const handleClick = () => {
    mutate({
      ...link,
      kloudId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: '링크가 추가되었습니다!',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      onClose();
    }
  }, [isSuccess, onClose, toast]);

  useEffect(() => {
    if (isError) {
      const message = error.response?.data.message;

      toast({
        title: message || '링크 추가에 실패하였습니다. 다시 시도해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError, toast, error]);

  const isDisabled =
    link.url.length === 0 ||
    link.title.length === 0 ||
    link.thumbnailUrl.length === 0;

  return (
    <button
      type="button"
      className="common-button flex w-[300px] items-center justify-center bg-primary font-bold text-white hover:bg-primary-lighter"
      onClick={handleClick}
      disabled={isDisabled}
    >
      링크 추가하기
    </button>
  );
};

export default CreateLinkButton;
