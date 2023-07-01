'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useCreateKloudMutation } from '@/features/kloud/modules/apiHooks/useCreateKloudMutation';
import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface Props {
  onSelect: (id: number | null) => void;
}

const CreateKloudForm = ({ onSelect }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [name, setName] = useState('');

  const { mutate, data, isSuccess, isError, error } = useCreateKloudMutation();
  const { data: kloudListData } = useGetKloudListQuery();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const kloudName = event.target.value;
    setName(kloudName);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const exceededCreateLimit = kloudListData?.klouds.length === 20;
    const exceededNameLength = name.length > 50;

    if (exceededCreateLimit || exceededNameLength) {
      const getMessage = () => {
        let message = '클라우드를 생성할 수 없습니다.';

        if (exceededCreateLimit)
          message = '유저당 최대 20개의 클라우드까지 생성 가능합니다.';
        if (exceededNameLength)
          message = '클라우드 이름은 50자 이내로 작성해 주세요.';

        return message;
      };

      toast({
        title: getMessage(),
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    mutate({ name });
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(queryKeys.kloud.getKloudList);
      setName('');
      onSelect(data.data.id);
      toast({
        title: '클라우드가 생성되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isSuccess, queryClient, toast, data]);

  useEffect(() => {
    if (isError) {
      const isNotServerError = error.response?.status !== 500;

      if (isNotServerError) {
        const message = error.response?.data.message;
        toast({
          title: message || '클라우드를 생성하지 못했습니다.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [isError, error, toast]);

  const isDisabledButton = name.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between rounded-2xl bg-stone-100"
    >
      <input
        type="text"
        className="common-input bg-transparent"
        placeholder="생성할 클라우드를 50자 이내로 입력해 주세요"
        onChange={handleChangeName}
        value={name}
      />
      <button
        type="submit"
        className="flex w-[15%] items-center justify-center bg-transparent"
        disabled={isDisabledButton}
      >
        <FaPlus
          className={`${isDisabledButton ? 'fill-slate-400' : 'fill-black'}`}
        />
      </button>
    </form>
  );
};

export default CreateKloudForm;
