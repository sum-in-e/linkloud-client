'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostKloudMutation } from '@/features/kloud/modules/apiHooks/usePostKloudMutation';
import queryKeys from '@/common/modules/apiHooks/queryKeys';

interface Props {
  onClose: () => void;
}

const CreateKloudModal = ({ onClose }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');

  const { mutate: createKloudMutate } = usePostKloudMutation();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateKloud = () => {
    createKloudMutate(
      { name },
      {
        onSuccess: (data) => {
          toast({
            title: '🎉클라우드를 생성했어요!🎉',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          onClose();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '클라우드를 생성하지 못했습니다. 다시 시도해 주세요.';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.length > 50) {
      toast({
        title: '클라우드 이름은 50자 이내로 작성해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    handleCreateKloud();
  };

  useEffect(() => {
    setName('');
  }, [setName]);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-between rounded-2xl bg-stone-100"
        >
          <input
            type="text"
            value={name}
            onChange={handleChangeName}
            className="common-input bg-slate-100"
            placeholder="생성할 클라우드의 이름을 50자 이내로 입력해 주세요"
            autoFocus
          />
          <button
            type="submit"
            className="flex w-[15%] items-center justify-center bg-transparent"
            disabled={name.length === 0}
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateKloudModal;
