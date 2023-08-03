'use client';

import { ReactNode, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';
import Loader from '@/common/components/Loader';

interface Props {
  kloudId: number | null;
  onSelect: (kloudId: number | null, kloudName: string) => void;
}
const KloudList = ({ kloudId, onSelect }: Props) => {
  const toast = useToast();

  const { data, isError, error, isLoading } = useGetKloudListQuery();

  useEffect(() => {
    if (isError) {
      const isNotServerError = error.response?.status !== 500;

      if (isNotServerError) {
        const message = error.response?.data.message;
        toast({
          title: message || '클라우드 리스트를 가져오지 못했습니다.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [isError, error, toast]);

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-xl bg-zinc-100">
        <Loader size={30} theme="black" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-between px-2 text-xs font-semibold text-gray-500">
        <p>내 클라우드</p>
        <p>{data?.count || 0}</p>
      </div>

      {!data || data.klouds.length === 0 ? (
        <div className="flex w-full items-center justify-center bg-zinc-100 p-5">
          <p className="whitespace-pre text-center text-sm font-semibold text-gray-500">
            {`클라우드가 없어요🥲\n바로 위의 입력창에서 생성해 볼까요?`}
          </p>
        </div>
      ) : (
        <ul className="flex h-[400px] flex-col gap-1 overflow-scroll">
          <KloudItem
            isCurrentKloud={kloudId === null}
            onClick={() => onSelect(null, '미분류')}
          >
            <p className="truncate">미분류</p>
          </KloudItem>
          {data.klouds.map((kloud) => (
            <KloudItem
              key={kloud.id}
              isCurrentKloud={kloudId === kloud.id}
              onClick={() => onSelect(kloud.id, kloud.name)}
            >
              <p className="truncate">{kloud.name}</p>
              <p>{kloud.linkCount}</p>
            </KloudItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KloudList;

interface KloudItemProps {
  isCurrentKloud: boolean;
  onClick: () => void;
  children: ReactNode;
}

const KloudItem = ({ isCurrentKloud, onClick, children }: KloudItemProps) => {
  return (
    <li>
      <button
        type="button"
        className={`reset-button flex justify-between rounded-xl px-4 py-3 text-sm ${
          isCurrentKloud
            ? 'bg-primary-alt text-white hover:bg-primary-alt-lighter'
            : 'bg-zinc-100 hover:bg-zinc-200'
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
