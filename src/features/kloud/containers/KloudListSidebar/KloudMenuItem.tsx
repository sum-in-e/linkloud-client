'use client';

import { positiveActionColorType } from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteKloudByIdMutation } from '@/features/kloud/modules/apiHooks/useDeleteKloudByIdMutation';
import { usePatchKloudByIdMutation } from '@/features/kloud/modules/apiHooks/usePatchKloudByIdMutation';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { josa } from 'josa';
import { toNumber } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
  kloud: KloudListKloudType;
}

const KloudMenuItem = ({ kloud }: Props) => {
  const { kloudId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen, onToggle } = useOpen();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const { mutate: patchKloudMutate } = usePatchKloudByIdMutation();
  const { mutate: deleteKloudMutate, isLoading: isLoadingDeleteKloud } =
    useDeleteKloudByIdMutation();

  const handleChangeNewName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const resetNewNameInput = () => {
    setIsEditing(false);
    setNewName('');
  };

  const handleCancelEdit = () => {
    resetNewNameInput();
  };

  const handleEditKloud = () => {
    patchKloudMutate(
      { id: kloud.id, body: { name: newName } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          if (toNumber(kloudId) === kloud.id) {
            // 수정한 클라우드가 현재 보여지고 있는 페이지의 클라우드라면 리스트 상단의 클라우드명 새로고침
            queryClient.invalidateQueries(
              queryKeys.kloud.getKloudById(kloud.id)
            );
          }
          resetNewNameInput();
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

    if (newName.length > 50) {
      toast({
        title: '클라우드 이름은 50자 이내로 작성해 주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (newName === kloud.name) {
      resetNewNameInput();
      return;
    }

    handleEditKloud();
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const deleteMutate = () => {
    deleteKloudMutate(
      { id: kloud.id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          if (toNumber(kloudId) === kloud.id) {
            // 삭제한 클라우드 페이지에 유저가 있는 경우 상단에 클라우드 이름 가져오는 부분을 리셋해줘야한다. 안그러면 캐싱된 데이터를 쓰기 때문에 클라우드에 대한 데이터가 계속 보여지게 된다.
            queryClient.resetQueries(queryKeys.kloud.getKloudById(kloud.id));
          }
          toast({
            title: '삭제되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          console.log('error', error);
        },
      }
    );
  };

  const handleClickDelete = () => {
    onOpen();
  };

  const title = josa(`"${kloud.name}" 클라우드를 삭제하시겠어요?`);
  const description = `🚨클라우드에 저장된 링크도 함께 제거됩니다.🚨`;
  const positiveAction = {
    text: '삭제하기',
    action: () => {
      deleteMutate();
    },
    isLoading: isLoadingDeleteKloud,
    color: 'red' as positiveActionColorType,
  };
  const negativeAction = {
    text: '삭제하지 않기',
    action: onClose,
    isLoading: false,
  };

  const router = useRouter();

  const handlePushToKloudPage = () => {
    router.push(`/link/${kloud.id}`);
  };

  const {
    isOpen: isOpenPopover,
    onClose: onClosePopover,
    onOpen: onOpenPopover,
  } = useOpen();

  const handleClickMore = () => {
    onOpenPopover();
  };

  return (
    <div
      className={`color-duration relative flex w-full items-center justify-between gap-1 rounded-lg border bg-primary-alt px-3 py-2 hover:bg-primary-alt-lighter`}
      onClick={handlePushToKloudPage}
    >
      <p
        className={`${
          toNumber(kloudId) === kloud.id
            ? 'font-extrabold text-white'
            : 'font-medium text-gray-300'
        } w-full truncate text-start text-xs`}
      >
        {kloud.name}
      </p>
      {kloud.unreadLinkCount > 0 && (
        <div className="absolute left-[8px] top-[8px] h-[6px] w-[6px] rounded-full bg-secondary-lighter" />
      )}
      <div className="flex w-fit items-center justify-end">
        <Popover
          isOpen={isOpenPopover}
          onClose={onClosePopover}
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <button
              className="rounded-lg p-1 hover:bg-primary-darker"
              onClick={(event) => {
                event.stopPropagation();
                handleClickMore();
              }}
            >
              <BsThreeDotsVertical size={16} className="fill-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <button className="w-fit px-3 py-2 text-sm font-semibold">
              수정
            </button>
            <button className="w-fit px-3 py-2 text-sm font-semibold">
              제거
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default KloudMenuItem;
