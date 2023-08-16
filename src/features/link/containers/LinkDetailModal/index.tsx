'use client';

import CustomModal from '@/common/components/CustomModal';
import useMediaQuery from '@/common/modules/hooks/useMediaQuery';
import LinkCreatedAt from '@/features/link/containers/LinkDetailModal/LinkCreatedAt';
import LinkDescription from '@/features/link/containers/LinkDetailModal/LinkDescription';
import LinksKloud from '@/features/link/containers/LinkDetailModal/LinksKloud';
import LinkMemo from '@/features/link/containers/LinkDetailModal/LinkMemo';
import LinkTitle from '@/features/link/containers/LinkDetailModal/LinkTitle';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { ChangeEvent, useState } from 'react';
import { BsX, BsArrowLeft, BsPencilSquare } from 'react-icons/bs';
import Loader from '@/common/components/Loader';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchLinkByIdMutation } from '@/features/link/modules/apiHooks/usePatchLinkByIdMutation';
import queryKeys from '@/common/modules/apiHooks/queryKeys';

interface Props {
  link: LinkInfoType;
  onCloseModal: () => void;
}

const LinkDetailModal = ({ link, onCloseModal }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { mutate, isLoading } = usePatchLinkByIdMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [memo, setMemo] = useState(link.memo);

  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleChangeDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleChangeMemo = (newMemo: string) => {
    setMemo(newMemo);
  };

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    event.target.src = '/images/linkloud_thumbnail.png';
  };

  const handleCancelEdit = () => {
    setTitle(link.title);
    setDescription(link.description);
    setMemo(link.memo);
    setIsEditMode(false);
  };

  const handleCompleteEdit = () => {
    let body = {};

    if (title !== link.title) body = { ...body, title };
    if (description !== link.description) body = { ...body, description };
    if (memo !== link.memo) body = { ...body, memo };

    mutate(
      { id: link.id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          toast({
            title: '수정되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setIsEditMode(false);
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크 정보를 수정하지 못했습니다. 다시 시도해 주세요.';

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

  const isDisabledComplete =
    (link.title === title &&
      link.description === description &&
      link.memo === memo) ||
    title.length === 0;

  return (
    <CustomModal onClose={onCloseModal}>
      <div className="flex h-[calc(var(--calcvh)*100)] w-screen flex-col overflow-y-scroll rounded-none bg-white md:h-fit md:max-h-[700px] md:w-[400px] md:rounded-lg">
        <div className="flex items-center justify-between p-3 md:px-5">
          {isMobile ? (
            <button
              type="button"
              className="w-fit rounded-full px-2 py-3"
              onClick={onCloseModal}
            >
              <BsArrowLeft size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="w-fit rounded-full py-2"
              onClick={onCloseModal}
            >
              <BsX size={25} />
            </button>
          )}
          {isEditMode ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="reset-button w-fit min-w-[60px] rounded-xl border px-4 py-2 text-sm font-bold md:hover:bg-zinc-100"
                onClick={handleCancelEdit}
              >
                취소
              </button>
              <button
                type="button"
                className="reset-button w-fit min-w-[60px] rounded-xl bg-black px-4 py-2 text-sm font-bold text-white md:hover:bg-zinc-700"
                onClick={handleCompleteEdit}
                disabled={isDisabledComplete}
              >
                {isLoading ? <Loader /> : '완료'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="reset-button w-fit rounded-xl bg-black p-2 md:hover:bg-zinc-700"
              onClick={() => setIsEditMode(true)}
            >
              <BsPencilSquare size={15} className="fill-white" />
            </button>
          )}
        </div>

        <div className="px-3 pb-3 md:px-5 md:pb-5">
          <p className="mb-2 truncate text-xs text-zinc-400">{link.url}</p>
          <div className="flex w-full gap-2">
            <picture className="flex-shrink-0">
              <img
                alt="thumbnail"
                src={link.thumbnailUrl}
                className="aspect-square w-20 rounded-lg object-cover"
                onError={handleErrorImage}
              />
            </picture>
            <LinkTitle
              value={title}
              onChange={handleChangeTitle}
              isEditMode={isEditMode}
            />
          </div>
          <LinkDescription
            value={description}
            onChange={handleChangeDescription}
            isEditMode={isEditMode}
          />
          <LinkMemo
            value={memo}
            onChange={handleChangeMemo}
            isEditMode={isEditMode}
          />
          <LinksKloud kloud={link.kloud} />
          <LinkCreatedAt initValue={link.createdAt} />
        </div>
      </div>
    </CustomModal>
  );
};

export default LinkDetailModal;
