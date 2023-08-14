'use client';

import { useParams, usePathname } from 'next/navigation';
import { ChangeEvent, MouseEvent } from 'react';
import {
  BsFileTextFill,
  BsJournalBookmarkFill,
  BsCheckLg,
  BsThreeDotsVertical,
  BsShare,
} from 'react-icons/bs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { usePatchLinkByIdMutation } from '@/features/link/modules/apiHooks/usePatchLinkByIdMutation';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import LinkDetailModal from '@/features/link/containers/LinkDetailModal';
import ConfirmModal, {
  positiveActionColorType,
} from '@/common/components/ConfirmModal';
import { useDeleteLinkByIdMutation } from '@/features/link/modules/apiHooks/useDeleteLinkByIdMutation';
import { toNumber } from 'lodash';
import KloudSelectModal from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkItem/KloudSelectModal';
import { useLinkSharing } from '@/features/kloud/modules/hooks/useLinkSharing';
import { useOpenLink } from '@/features/kloud/modules/hooks/useOpenLink';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { LinkInfoType } from '@/features/link/modules/apis/link';

interface Props {
  link: LinkInfoType;
  isEditMode: boolean;
  onSelectItem: (id: number) => void;
  isSelected: boolean;
}

const LinkItem = ({ link, isEditMode, isSelected, onSelectItem }: Props) => {
  const {
    id,
    url,
    thumbnailUrl,
    title,
    description,
    isInMyCollection,
    isRead,
    memo,
    kloud,
  } = link;

  const { kloudId } = useParams();
  const pathname = usePathname();

  const {
    onClose: onCloseDetail,
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
  } = useOpen();

  const {
    isOpen: isOpenPopover,
    onClose: onClosePopover,
    onOpen: onOpenPopover,
  } = useOpen();

  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useOpen();

  const {
    isOpen: isOpenChangeKloud,
    onClose: onCloseChangeKloud,
    onOpen: onOpenChangeKloud,
  } = useOpen();

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: patchLinkById } = usePatchLinkByIdMutation();

  const { handleShare } = useLinkSharing({ title, url });
  const { openLinkInNewTap } = useOpenLink({ id, isRead, url });

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    event.target.src = '/images/linkloud_thumbnail.png';
  };

  const hasMemo = memo.length > 0;

  const isShowKloud =
    kloud !== null &&
    (pathname === '/link/all' ||
      pathname === '/link/unread' ||
      pathname === '/link/collection'); // 저장된 클라우드가 있고, 전체 || 미열람 || 내 컬렉션 페이지인 경우 클라우드를 보여줘야합니다.

  const handleClickCollection = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 링크 열리는 이벤트 막기 위함
    patchLinkById(
      { id, body: { isInMyCollection: !isInMyCollection } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            toast({
              title: `요청에 실패하였습니다.\n다시 시도해 주세요`,
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenPopover();
  };

  const handleClickShare = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleShare();
    onClosePopover();
  };

  const handleClickOpenDetail = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDetail();
  };

  const handleClickOpenChangeKloud = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenChangeKloud();
  };

  const handleClickOpenDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDelete();
  };

  const { mutate, isLoading } = useDeleteLinkByIdMutation();

  const handleDeleteLink = () => {
    mutate(
      { id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          if (kloudId)
            // 현재 페이지가 클라우드 페이지인 경우 count를 갱신하기 위해 새로고침
            queryClient.invalidateQueries(
              queryKeys.kloud.getKloudById(toNumber(kloudId))
            );

          toast({
            title: '링크가 제거되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onCloseDelete();
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
    description: `링크를 정리하면 공간이 깔끔해지고, 보다 효율적으로 링크를 관리할 수 있어요 :) `,
    positiveAction: {
      text: '삭제하기',
      action: () => {
        handleDeleteLink();
      },
      color: 'red' as positiveActionColorType,
      isLoading,
    },
    negativeAction: {
      text: '삭제하지 않기',
      action: onCloseDelete,
      isLoading: false,
    },
  };

  return (
    <li className="relative">
      <div
        className={`group/item aspect-square w-[300px] cursor-pointer md:w-[270px]`}
        onClick={openLinkInNewTap}
      >
        <picture>
          <img
            loading="lazy"
            alt="Link_thumbnail_image"
            src={thumbnailUrl}
            className={`aspect-[1.91/1] h-1/2 w-full rounded-lg object-cover ${
              isRead && 'opacity-50'
            } md:group-hover/item:brightness-125`}
            onError={handleErrorImage}
          />
        </picture>
        <div className="p-2 pt-4">
          <p className="mb-2 truncate text-xs text-zinc-400">{url}</p>
          <p className="mb-1 truncate text-sm font-bold">{title}</p>
          <p className="truncate text-xs text-zinc-600">{description}</p>
        </div>
        {hasMemo && (
          <div
            className={`absolute right-2 top-1/2 flex h-fit w-fit -translate-y-1/2 transform rounded-full border-2 border-zinc-50 bg-zinc-800 p-[10px]`}
          >
            <BsFileTextFill size={15} className="fill-secondary" />
          </div>
        )}
        {isShowKloud && (
          <div className="absolute left-2 top-2 w-fit max-w-[60%] select-none rounded-full bg-primary-alt px-3 py-1">
            <p className="truncate text-xs font-bold text-white">
              {kloud?.name}
            </p>
          </div>
        )}
        {/* 버튼 */}
        <div className="z-5 absolute bottom-3 right-2 flex gap-[6px] md:hidden md:group-hover/item:flex">
          <button
            aria-label={
              isInMyCollection ? 'Remove from Collection' : 'Add to Collection'
            }
            type="button"
            className="group/collection"
            onClick={handleClickCollection}
          >
            <BsJournalBookmarkFill
              size={18}
              className={`color-duration ${
                isInMyCollection
                  ? 'fill-secondary-lighter md:group-hover/collection:fill-secondary'
                  : 'fill-zinc-400 md:group-hover/collection:fill-zinc-600'
              }`}
            />
          </button>
          <Popover
            isOpen={isOpenPopover}
            onClose={onClosePopover}
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <button
                aria-label="Show More Options"
                type="button"
                className="group/more"
                onClick={handleClickMore}
              >
                <BsThreeDotsVertical
                  size={18}
                  className={`color-duration fill-zinc-400 transition-colors md:group-hover/more:fill-zinc-600`}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col gap-1 p-1">
              <button
                type="button"
                className="rounded-md px-3 py-2 hover:bg-zinc-200"
                onClick={handleClickOpenDetail}
              >
                <p className="text-sm font-semibold">상세보기</p>
              </button>
              <button
                type="button"
                className="rounded-md px-3 py-2 hover:bg-zinc-200"
                onClick={handleClickOpenChangeKloud}
              >
                <p className="text-sm font-semibold">이동하기</p>
              </button>
              <button
                type="button"
                className="rounded-md px-3 py-2 hover:bg-zinc-200"
                onClick={handleClickOpenDelete}
              >
                <p className="text-sm font-semibold text-red-500">삭제하기</p>
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md px-3 py-2 hover:bg-zinc-200"
                onClick={handleClickShare}
              >
                <BsShare size={15} />
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* 체크 UI */}
      {isEditMode && (
        <div
          onClick={() => onSelectItem(link.id)}
          className={`absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-300 bg-opacity-60 md:hover:bg-opacity-40`}
        >
          <BsCheckLg
            size={70}
            className={`${isSelected ? 'fill-black' : 'fill-zinc-400'}`}
          />
        </div>
      )}

      {/* 링크 상세 모달 */}
      {isOpenDetail && (
        <LinkDetailModal link={link} onCloseModal={onCloseDetail} />
      )}

      {/* 링크 삭제 모달 */}
      {isOpenDelete && (
        <ConfirmModal
          onClose={onCloseDelete}
          title={modalInfo.title}
          description={modalInfo.description}
          negativeAction={modalInfo.negativeAction}
          positiveAction={modalInfo.positiveAction}
        />
      )}

      {/* 클라우드 변경 모달 */}
      {isOpenChangeKloud && (
        <KloudSelectModal
          linkId={link.id}
          kloudId={link.kloud === null ? null : link.kloud.id}
          onCloseModal={onCloseChangeKloud}
        />
      )}
    </li>
  );
};

export default LinkItem;