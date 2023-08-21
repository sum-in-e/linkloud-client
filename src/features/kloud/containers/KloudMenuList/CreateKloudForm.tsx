'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostKloudMutation } from '@/features/kloud/modules/apiHooks/usePostKloudMutation';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { BsX } from 'react-icons/bs';

interface Props {
  onClose: () => void;
}

const CreateKloudForm = ({ onClose }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');

  const { mutate: createKloudMutate } = usePostKloudMutation();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleReset = () => {
    setName('');
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

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // 키보드 닫기
    }

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

  return (
    <div className="mb-2 md:px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-between gap-2 rounded-full border px-3 py-[10px] md:rounded-lg md:bg-zinc-50 md:py-2"
      >
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          className="reset-input text-sm placeholder:text-gray-600 md:bg-zinc-50"
          placeholder="생성할 클라우드의 이름을 50자 이내로 입력해 주세요"
          autoFocus
        />
        <button
          type="button"
          className="flex items-center justify-center rounded-full bg-zinc-300 p-[2px] md:hidden"
          onClick={handleReset}
        >
          <BsX size={16} />
        </button>
      </form>
    </div>
  );
};

export default CreateKloudForm;
