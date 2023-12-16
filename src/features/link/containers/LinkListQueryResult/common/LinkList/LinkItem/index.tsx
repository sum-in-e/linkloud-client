'use client';

import { useParams, usePathname } from 'next/navigation';
import { MouseEvent } from 'react';
import {
  BsFileTextFill,
  BsBookmarkPlusFill,
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
import { handleErrorThumbnailImage } from '@/features/link/modules/utils/link';
import Image from 'next/image';

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
    isFollowing,
    clickCount,
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
  const { openLinkInNewTap } = useOpenLink({ id, url });

  const hasMemo = memo.length > 0;

  const isShowKloud = kloud !== null && kloudId === undefined; // 저장된 클라우드가 있고, 유저가 생성한 클라우드 페이지가 아닌 경우에만 보여준다.

  const handleClickFollow = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    patchLinkById(
      { id, body: { isFollowing: !isFollowing } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.link.getLinkList());
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
          toast({
            title:
              !isFollowing === true
                ? '나중에 볼 링크로 추가했어요.'
                : '나중에 볼 링크에서 해제했어요.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
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

  const handleCheckItem = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onSelectItem(link.id);
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
    <li
      className={`group/item relative cursor-pointer overflow-hidden rounded-lg`}
      onClick={openLinkInNewTap}
    >
      <div className="relative">
        <div
          className={`relative aspect-[1.91/1] h-auto w-full md:group-hover/item:brightness-125 ${
            clickCount > 0 && 'opacity-50'
          }`}
        >
          <Image
            fill
            loading="lazy"
            alt="Link_thumbnail_image"
            src={thumbnailUrl}
            className="rounded-lg object-cover"
            onError={handleErrorThumbnailImage}
          />
        </div>
        {hasMemo && (
          <div
            className={`absolute -bottom-7 right-2 flex h-fit w-fit -translate-y-1/2 transform rounded-full border-2 border-zinc-50 bg-zinc-800 p-[5px] md:-bottom-10 md:p-[10px]`}
          >
            <BsFileTextFill size={15} className="fill-secondary" />
          </div>
        )}
      </div>
      <div>
        <div className="p-2 pt-4">
          <p className="mb-2 truncate text-xs text-zinc-400">{url}</p>
          <p className="mb-1 truncate text-sm font-bold">{title}</p>
          <p className="truncate text-xs text-zinc-600">{description}</p>
        </div>
        <div className="flex justify-end gap-[6px] py-4 md:opacity-0 md:group-hover/item:opacity-100">
          <button
            aria-label={isFollowing ? 'remove to bookmark' : 'add to bookmark'}
            type="button"
            className="group/following"
            onClick={handleClickFollow}
          >
            <BsBookmarkPlusFill
              size={18}
              className={`color-duration ${
                isFollowing
                  ? 'fill-secondary-lighter md:group-hover/following:fill-secondary'
                  : 'fill-zinc-400 md:group-hover/following:fill-zinc-600'
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

      {/* 클라우드 UI */}
      {isShowKloud && (
        <div className="absolute left-2 top-2 w-fit max-w-[60%] select-none rounded-full bg-primary-alt px-3 py-1">
          <p className="truncate text-xs font-bold text-white">{kloud?.name}</p>
        </div>
      )}

      {/* 나중에 볼 링크 표시 */}
      {isFollowing && pathname !== '/link/following' && (
        <div className="absolute left-1 top-1">
          <div className="absolute h-3 w-3 animate-ping rounded-full bg-secondary-lighter" />
          <div className="h-3 w-3 rounded-full bg-secondary-lighter" />
        </div>
      )}

      {/* 체크 UI */}
      {isEditMode && (
        <div
          onClick={handleCheckItem}
          className={`absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-zinc-300 bg-opacity-60 md:hover:bg-opacity-40`}
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
