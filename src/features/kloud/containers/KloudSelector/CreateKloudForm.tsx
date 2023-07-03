'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePostKloudMutation } from '@/features/kloud/modules/apiHooks/usePostKloudMutation';
import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface Props {
  onSelect: (id: number | null) => void;
  isOpen: boolean;
}

const CreateKloudForm = ({ onSelect, isOpen }: Props) => {
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
          onSelect(data.data.id);
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
            const message = error.response?.data.message;
            toast({
              title: message || '클라우드를 생성하지 못했습니다.',
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
        if (exceededCreateLimit)
          return '유저당 최대 20개의 클라우드까지 생성 가능합니다.';
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

  useEffect(() => {
    setName(''); // 클라우드명 입력 후 list 아코디언 닫으면 name 남아있는 이슈 해결하기 위해 호출
  }, [isOpen]);

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
