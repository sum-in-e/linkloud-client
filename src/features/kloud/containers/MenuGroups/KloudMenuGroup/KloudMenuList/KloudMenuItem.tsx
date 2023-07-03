'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteKloudByIdMutation } from '@/features/kloud/modules/apiHooks/useDeleteKloudByIdMutation';
import { usePatchKloudByIdMutation } from '@/features/kloud/modules/apiHooks/usePatchKloudByIdMutation';
import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import MenuItem from '@/features/kloud/components/MenuItem';
import queryKeys from '@/common/modules/apiHooks/queryKeys';

interface Props {
  kloud: KloudListKloudType;
}
const KloudMenuItem = ({ kloud }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const { mutate: patchKloudMutate } = usePatchKloudByIdMutation();
  const { mutate: deleteKloudMutate } = useDeleteKloudByIdMutation();

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
          // TODO: 수정한 클라우드가 현재 보여지고 있는 페이지의 클라우드라면 리스트 상단의 클라우드명도 새로고침 필요
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          setIsEditing(false);
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

  const handleClickDelete = () => {
    deleteKloudMutate(
      { id: kloud.id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
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

  return (
    <form onSubmit={handleSubmit}>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={handleChangeNewName}
          className="common-input bg-slate-100"
          placeholder={kloud.name}
        />
      ) : (
        <MenuItem
          href={`/kloud/${kloud.id}`}
          title={kloud.name}
          count={kloud.linkCount}
        />
      )}

      <div className="mt-1 flex justify-end gap-1">
        {isEditing ? (
          <div className="flex gap-1">
            <button
              type="button"
              className="rounded-md bg-slate-100 p-1 disabled:bg-gray-400 disabled:text-gray-100"
              onClick={handleCancelEdit}
            >
              수정 취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-100 p-1 disabled:bg-gray-400 disabled:text-gray-100"
              disabled={isEditing && newName.length === 0}
            >
              수정 완료
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="rounded-md bg-blue-100 p-1 disabled:bg-gray-400 disabled:text-gray-100"
            onClick={handleClickEdit}
          >
            수정하기
          </button>
        )}
        <button
          className="rounded-md bg-red-100 p-1"
          onClick={handleClickDelete}
        >
          삭제하기
        </button>
      </div>
    </form>
  );
};

export default KloudMenuItem;
