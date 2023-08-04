'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePostKloudMutation } from '@/features/kloud/modules/apiHooks/usePostKloudMutation';
import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';
import { BsX } from 'react-icons/bs';
import { kloudMessage } from '@/features/kloud/modules/constants/kloud';

interface Props {
  onSelect: (kloudId: number | null, kloudName: string) => void;
}

const CreateKloudForm = ({ onSelect }: Props) => {
  const toast = useToast();

  const [name, setName] = useState('');

  const { mutate } = usePostKloudMutation();
  const { data: kloudListData } = useGetKloudListQuery();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const kloudName = event.target.value;
    setName(kloudName);
  };

  const queryClient = useQueryClient();

  const handleMutate = () => {
    mutate(
      { name },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getKloudList);
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          onSelect(data.data.id, data.data.name);
          toast({
            title: '클라우드가 생성되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message || '클라우드를 생성하지 못했습니다.';
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

    const exceededCreateLimit = kloudListData?.klouds.length === 20;
    const exceededNameLength = name.length > 50;

    if (exceededCreateLimit || exceededNameLength) {
      const getMessage = () => {
        if (exceededCreateLimit) return kloudMessage.클라우드_20개_생성제한;
        if (exceededNameLength)
          return '클라우드 이름은 50자 이내로 작성해 주세요.';

        return '클라우드를 생성할 수 없습니다.';
      };

      toast({
        title: getMessage(),
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    handleMutate();
  };

  const handleReset = () => {
    setName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2 border-b px-2 py-3"
    >
      <input
        type="text"
        className="reset-input flex items-center justify-between text-sm"
        placeholder="생성할 클라우드의 이름을 50자 이내로 입력해 주세요."
        onChange={handleChangeName}
        value={name}
      />
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-zinc-300 p-[2px] md:hidden"
        onClick={handleReset}
      >
        <BsX size={16} />
      </button>
    </form>
  );
};

export default CreateKloudForm;
