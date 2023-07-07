'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePostKloudMutation } from '@/features/kloud/modules/apiHooks/usePostKloudMutation';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { FaPlus } from 'react-icons/fa';

interface Props {
  onClose: () => void;
}

const CreateKloudForm = ({ onClose }: Props) => {
  // TODO: 다 만들고 링크 추가의 CreateKloudForm 컴포넌트와 겹치는 비즈니스 로직 공통 훅으로 빼는 등 할 수 있는지 검토

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
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between rounded-2xl bg-stone-100"
    >
      <input
        type="text"
        value={name}
        onChange={handleChangeName}
        className="common-input bg-slate-100"
        placeholder="생성할 클라우드를 50자 이내로 입력해 주세요"
        autoFocus
      />
      <button
        type="submit"
        className="flex w-[15%] items-center justify-center bg-transparent"
        disabled={name.length === 0}
      >
        <FaPlus
          size={15}
          className={`${name.length === 0 ? 'fill-slate-400' : 'fill-black'}`}
        />
      </button>
    </form>
  );
};
export default CreateKloudForm;
