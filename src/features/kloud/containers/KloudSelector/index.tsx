'use client';

import { useOpen } from '@/common/modules/hooks/useOpen';
import CreateKloudForm from '@/features/kloud/containers/KloudSelector/CreateKloudForm';
import KloudList from '@/features/kloud/containers/KloudSelector/KloudList';
import { useGetKloudListQuery } from '@/features/kloud/modules/apiHooks/useGetKloudListQuery';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  kloudId: number | null;
  onChange: (kloudId: number | null, kloudName: string) => void;
}

const KloudSelector = ({ kloudId, onChange }: Props) => {
  const toast = useToast();
  const { isOpen, onClose, onToggle } = useOpen();

  const { data, isError, error } = useGetKloudListQuery();

  const handleSelect = (id: number | null, name: string) => {
    onChange(id, name);
    onClose();
  };

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

  const currentKloud =
    kloudId === null
      ? '미분류'
      : data?.klouds.find((kloud) => kloud.id === kloudId)?.name || '미분류';

  return (
    <Accordion index={isOpen ? 0 : 1}>
      <AccordionItem className="border-none">
        {/* selector 버튼 */}
        <AccordionButton
          type="button"
          className="common-button flex w-full items-center justify-between bg-stone-100 px-4"
          onClick={onToggle}
        >
          <p className="text-sm">{currentKloud}</p>
          <FaAngleDown size={15} />
        </AccordionButton>

        {/* 클라우드 리스트 & 생성 폼 */}
        <AccordionPanel className="mt-2 p-0">
          <div className="flex max-h-[300px] flex-col gap-2 overflow-scroll rounded-2xl py-2">
            <CreateKloudForm onSelect={handleSelect} isOpen={isOpen} />
            <KloudList kloudId={kloudId} onSelect={handleSelect} />
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default KloudSelector;
