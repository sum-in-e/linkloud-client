'use client';

import { useQueryClient } from '@tanstack/react-query';
import { BsTrash, BsBookmarkPlus, BsBoxArrowInUpRight } from 'react-icons/bs';
import { useToast } from '@chakra-ui/toast';
import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { useDeleteLinkByIdMutation } from '@/features/link/modules/apiHooks/useDeleteLinkByIdMutation';
import { usePatchLinkByIdMutation } from '@/features/link/modules/apiHooks/usePatchLinkByIdMutation';
import { usePatchLinkCountMutation } from '@/features/link/modules/apiHooks/usePatchLinkCountMutation';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { handleErrorThumbnailImage } from '@/features/link/modules/utils/link';
import { LinkManagerListType } from '@/features/linkManager/modules/types/linkManager';

interface Props {
  link: LinkInfoType;
  listType: LinkManagerListType;
}

const LinkManagerLinkItem = ({ link, listType }: Props) => {
  const {
    id,
    thumbnailUrl,
    title,
    url,
    description,
    memo,
    kloud,
    isInMyCollection,
    isChecked,
    createdAt,
    clickCount,
    clickFrequency,
    lastClickedAt,
  } = link;

  const { mutate: linkCount } = usePatchLinkCountMutation();
  const { mutate: patchLinkById } = usePatchLinkByIdMutation();
  const { mutate: deleteLink, isLoading: isLoadingDeleteLink } =
    useDeleteLinkByIdMutation();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useOpen();

  const toast = useToast();
  const queryClient = useQueryClient();

  const handleOpenLink = () => {
    linkCount(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            queryKeys.link.getLinkListForLinkManager
          );
        },
      }
    );

    window.open(url, '_blank');
  };

  const handleAddToCollection = () => {
    patchLinkById(
      { id, body: { isInMyCollection: true } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            queryKeys.link.getLinkListForLinkManager
          );
          toast({
            title: '내 컬렉션에 추가되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            toast({
              title: `내 컬렉션 등록에 실패하였습니다.\n다시 시도해 주세요`,
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const handleDeleteLink = () => {
    deleteLink(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            queryKeys.link.getLinkListForLinkManager
          );

          toast({
            title: '링크가 제거되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onCloseDeleteModal();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '링크를 제거하지 못했습니다. 다시 시도해 주세요.';

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

  const modalInfo = {
    title: `링크를 삭제하시겠어요?`,
    description: `'삭제하기' 선택 시 해당 링크는 영구적으로 제거됩니다.\n더 이상 저장할 필요가 없는 링크들을 정리하면 보다 효율적으로 링크들을 관리할 수 있어요!`,
    positiveAction: {
      text: '삭제하기',
      action: () => {
        handleDeleteLink();
      },
      color: 'red' as positiveActionColorType,
      isLoading: isLoadingDeleteLink,
    },
    negativeAction: {
      text: '삭제하지 않기',
      action: onCloseDeleteModal,
      isLoading: false,
    },
  };

  return (
    <>
      <div className="relative flex w-[270px] flex-shrink-0 flex-col justify-between rounded-lg p-2 shadow-md">
        <div className="w-full">
          <picture>
            <img
              loading="lazy"
              alt="Link_thumbnail_image"
              src={thumbnailUrl}
              className={`aspect-[1.91/1] h-auto w-full rounded-lg object-cover duration-300`}
              onError={handleErrorThumbnailImage}
            />
          </picture>
          <div className="px-2 py-4">
            <p className="mb-2 truncate text-xs text-zinc-400">{url}</p>
            <p className="mb-1 truncate text-sm font-bold">{title}</p>
            <p className="truncate text-xs text-zinc-600">{description}</p>
            {listType === 'recommendAddToCollection' && (
              <div className="mt-2 w-fit rounded-md bg-blue-200 p-1 text-xs">{`${clickCount}회 클릭`}</div>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2 border-t border-zinc-200 pt-2 md:flex-col md:justify-normal md:gap-0">
          <button
            type="button"
            onClick={handleOpenLink}
            className="color-duration flex w-full items-center justify-center gap-3 rounded-lg border px-2 py-3  md:justify-start md:rounded-none md:border-0 md:border-l-2 md:border-transparent md:px-3 md:py-2 md:hover:border-black"
          >
            <BsBoxArrowInUpRight className="fill-zinc-700" size={15} />
            <p className="hidden text-xs font-semibold text-zinc-700 md:block">
              지금 확인하기
            </p>
          </button>
          <button
            type="button"
            onClick={handleAddToCollection}
            className="color-duration flex w-full items-center justify-center gap-3 rounded-lg border px-2 py-3  md:justify-start md:rounded-none md:border-0 md:border-l-2 md:border-transparent md:px-3 md:py-2 md:hover:border-secondary"
          >
            <BsBookmarkPlus className="fill-secondary" size={15} />
            <p className="hidden text-xs font-semibold text-zinc-700 md:block">
              내 컬렉션에 추가하기
            </p>
          </button>
          <button
            type="button"
            onClick={onOpenDeleteModal}
            className="color-duration flex w-full items-center justify-center gap-3 rounded-lg border px-2 py-3  md:justify-start md:rounded-none md:border-0 md:border-l-2 md:border-transparent md:px-3 md:py-2 md:hover:border-red-500"
          >
            <BsTrash className="fill-red-500" size={15} />
            <p className="hidden text-xs font-semibold text-zinc-700 md:block">
              링크 제거하기
            </p>
          </button>
        </div>

        {kloud !== null && (
          <div className="absolute left-4 top-4 w-fit max-w-[60%] select-none rounded-full bg-primary-alt px-3 py-1">
            <p className="truncate text-xs font-bold text-white">
              {kloud?.name}
            </p>
          </div>
        )}
      </div>

      {/* 링크 삭제 모달 */}
      {isOpenDeleteModal && (
        <ConfirmModal
          onClose={onCloseDeleteModal}
          title={modalInfo.title}
          description={modalInfo.description}
          negativeAction={modalInfo.negativeAction}
          positiveAction={modalInfo.positiveAction}
        />
      )}
    </>
  );
};

export default LinkManagerLinkItem;
