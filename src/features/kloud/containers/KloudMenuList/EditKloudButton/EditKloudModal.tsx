'use clinet';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { toNumber } from 'lodash';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { BsX } from 'react-icons/bs';
import CustomModal from '@/common/components/CustomModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { usePatchKloudByIdMutation } from '@/features/kloud/modules/apiHooks/usePatchKloudByIdMutation';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';

interface Props {
  kloud: KloudListKloudType;
  onCloseModal: () => void;
}

const EditKloudModal = ({ kloud, onCloseModal }: Props) => {
  const { kloudId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: patchKloudMutate } = usePatchKloudByIdMutation();

  const [kloudName, setKloudName] = useState(kloud.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKloudName(event.target.value);
  };

  const handleEditMutate = () => {
    patchKloudMutate(
      { id: kloud.id, body: { name: kloudName } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          if (toNumber(kloudId) === kloud.id) {
            // 수정한 클라우드가 현재 보여지고 있는 페이지의 클라우드라면 리스트 상단의 클라우드명 새로고침
            queryClient.invalidateQueries(
              queryKeys.kloud.getKloudById(kloud.id)
            );
          }
          toast({
            title: '변경되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '클라우드 수정에 실패하였습니다. 다시 시도해 주세요.';

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
    handleEditMutate();
  };

  const handleClick = () => {
    handleEditMutate();
  };

  const handleClear = () => {
    setKloudName('');
  };

  return (
    <CustomModal onClose={onCloseModal}>
      <div className="flex h-fit w-[320px] flex-col rounded-lg bg-white">
        <div className="flex items-center justify-between p-3 md:px-5">
          <button
            type="button"
            className="w-fit rounded-full py-2"
            onClick={onCloseModal}
          >
            <BsX size={25} />
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="reset-button w-fit rounded-xl bg-black px-4 py-2 text-sm font-bold text-white md:hover:bg-zinc-700"
            disabled={
              kloudName === kloud.name ||
              kloudName.length > 50 ||
              kloudName.length === 0
            }
          >
            변경
          </button>
        </div>

        <div className="flex flex-col gap-1 px-3 pb-5 md:px-5">
          <div>
            <span className="text-sm font-semibold">
              변경할 이름을 입력해 주세요.
            </span>
            <span className="text-xs">{`(50자 이내)`}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between gap-2 rounded-xl bg-zinc-100 px-2 py-3"
          >
            <input
              type="text"
              className="reset-input bg-transparent text-sm"
              maxLength={50}
              value={kloudName}
              onChange={handleChange}
              autoFocus
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-zinc-300 p-[2px] md:hidden"
              onClick={handleClear}
            >
              <BsX size={16} />
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditKloudModal;
