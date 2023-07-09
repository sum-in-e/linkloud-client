'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { FaBookmark, FaRegFileAlt, FaCheck, FaPenSquare } from 'react-icons/fa';
import LinkDetailDrawer from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer';
import { useLinkSharing } from '@/features/kloud/modules/hooks/useLinkSharing';
import { useOpenLink } from '@/features/kloud/modules/hooks/useOpenLink';
import {
  GroupKeyType,
  groupMapper,
} from '@/features/kloud/modules/types/kloudType';
import { useOpen } from '@/common/modules/hooks/useOpen';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { MdIosShare } from 'react-icons/md';

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

  const { group } = useParams();
  const { onClose, isOpen, onOpen } = useOpen();

  const changeImageSrcToDefault = (element: HTMLImageElement) => {
    element.src = '/images/linkloud_thumbnail.png';
  };

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    changeImageSrcToDefault(event.target as HTMLImageElement);
  };

  const hasMemo = memo.length > 0;

  const isShowKloud =
    kloud !== null &&
    Object.keys(groupMapper).includes(group) &&
    group !== 'uncategorized'; // 저장된 클라우드가 있고, 전체 || 미열람 || 내 컬렉션 페이지인 경우 클라우드를 보여줘야합니다.

  const isShowUnread = group !== ('unread' as GroupKeyType) && !isRead; // 미열람인 링크는 눈에 띄게 만들기(미열람 페이지일 경우 제외)

  const { handleClickShare } = useLinkSharing({ title, url });

  const { openLinkInNewTap } = useOpenLink({ id, isRead, url });

  // TODO: description ellipsis 적용 -> 디자인 나오면 그 사이즈에 맞춰서 진행
  return (
    <li className="relative">
      {/* 링크 아이템 UI */}
      <div
        className={`w-[300px] rounded-lg border-stone-400 shadow-xl ${
          isShowUnread ? 'bg-secondary-lighter' : 'bg-transparent'
        } cursor-pointer`}
        onClick={openLinkInNewTap}
      >
        <picture>
          <img
            alt="thumbnail"
            src={thumbnailUrl}
            className="aspect-[1.91/1] w-full rounded-b-none rounded-t-lg object-cover"
            onError={handleErrorImage}
          />
        </picture>
        {/* // TODO: 컨텐츠 감싸는 div 높이도 조정 필요 */}
        <div className="h-[150px] max-h-[150px] p-2">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
            {url}
          </p>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex items-center gap-1">
            {/* 메모 등록 여부 */}
            <div
              className={`p-2 ${
                hasMemo ? 'bg-black' : 'bg-gray-100'
              } w-fit rounded-full`}
            >
              <FaRegFileAlt
                size={15}
                className={`${hasMemo ? 'fill-secondary' : 'fill-gray-400'}`}
              />
            </div>
            {/* 내 컬렉션 등록 여부 */}
            <div
              className={`p-2 ${
                isInMyCollection ? 'bg-black' : 'bg-gray-100'
              } w-fit rounded-full`}
            >
              <FaBookmark
                size={15}
                className={`${
                  isInMyCollection ? 'fill-secondary' : 'fill-gray-400'
                }`}
              />
            </div>
            {/* 속해있는 클라우드 - 클라우드가 아니고 미분류도 아닌 그룹에서만 보여준다. */}
            {isShowKloud && (
              <div className="w-fit select-none rounded-xl bg-gray-100 px-2 py-1 text-sm font-bold">
                <p>{kloud?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 클릭 가능한 버튼 UI - 아이템 눌렀을 때 링크 열림과 별도 동작해야해서 분리 */}
      <div className="z-5 absolute right-2 top-2 flex gap-1">
        <button
          type="button"
          className="h-fit w-fit rounded-full bg-black p-2"
          onClick={handleClickShare}
        >
          <MdIosShare size={15} className="fill-gray-200" />
        </button>
        <button
          type="button"
          className="h-fit w-fit rounded-full bg-black p-2"
          onClick={onOpen}
        >
          <FaPenSquare size={15} className="fill-gray-200" />
        </button>
      </div>

      {/* 체크 UI */}
      {isEditMode && (
        <div
          onClick={() => onSelectItem(link.id)}
          className={`absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center  rounded-lg bg-gray-200 opacity-60`}
        >
          <FaCheck
            size={50}
            className={`${isSelected ? 'fill-primary' : 'fill-gray-800'} `}
          />
        </div>
      )}
      {isOpen && <LinkDetailDrawer link={link} onClose={onClose} />}
    </li>
  );
};

export default LinkItem;
