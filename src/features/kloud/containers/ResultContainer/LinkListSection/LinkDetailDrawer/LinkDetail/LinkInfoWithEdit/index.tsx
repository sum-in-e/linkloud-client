'use client';

import LinkDescription from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinkDescription';
import LinkEditHandler from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinkEditHandler';
import LinkIsInMyCollection from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinkIsInMyCollection';
import LinkMemo from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinkMemo';
import LinkTitle from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinkTitle';
import LinksKloud from '@/features/kloud/containers/ResultContainer/LinkListSection/LinkDetailDrawer/LinkDetail/LinkInfoWithEdit/LinksKloud';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';

interface Props {
  link: LinkInfoType;
  onClose: () => void;
}

const LinkInfoWithEdit = ({ link, onClose }: Props) => {
  const {
    id,
    url,
    thumbnailUrl,
    title: initTitle,
    description: initDescription,
    isInMyCollection: initIsInMyCollection,
    isRead,
    memo: initMemo,
    kloud: initKloud,
    createdAt,
  } = link;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleResetEditableValues = () => {
    setTitle(initTitle);
    setDescription(initDescription);
    setMemo(initMemo);
    setIsInMyCollection(initIsInMyCollection);
    setKloudId(initKloud === null ? null : initKloud.id);
  };

  const handleChangeEditMode = (value: boolean) => {
    if (value) handleResetEditableValues();
    setIsEditMode(value);
  };

  const [title, setTitle] = useState(initTitle);
  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const [description, setDescription] = useState(initDescription);
  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const [memo, setMemo] = useState(initMemo);
  const handleChangeMemo = (value: string) => {
    setMemo(value);
  };

  const [isInMyCollection, setIsInMyCollection] =
    useState(initIsInMyCollection);
  const handleChangeIsInMyCollection = () => {
    setIsInMyCollection((prev) => !prev);
  };

  const [kloudId, setKloudId] = useState<number | null>(
    initKloud === null ? null : initKloud.id
  );
  const handleChangeKloudId = (
    newKloudId: number | null,
    newKloudName: string
  ) => {
    setKloudId(newKloudId);
  };

  const changeImageSrcToDefault = (element: HTMLImageElement) => {
    element.src = '/images/linkloud_thumbnail.png';
  };

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    changeImageSrcToDefault(event.target as HTMLImageElement);
  };

  return (
    <div>
      <picture>
        <img
          alt="thumbnail"
          src={thumbnailUrl}
          className="aspect-square w-[70px] rounded-lg object-cover"
          onError={handleErrorImage}
        />
      </picture>

      <div className="flex flex-col gap-2">
        <LinkTitle
          initValue={initTitle}
          value={title}
          onChange={handleChangeTitle}
          isEditMode={isEditMode}
        />
        <LinkDescription
          initValue={initDescription}
          value={description}
          isEditMode={isEditMode}
          onChange={handleChangeDescription}
        />
        <LinkMemo
          initValue={initMemo}
          value={memo}
          isEditMode={isEditMode}
          onChange={handleChangeMemo}
        />
        <LinksKloud
          initKloud={initKloud}
          isEditMode={isEditMode}
          onChange={handleChangeKloudId}
          value={kloudId}
        />
        <LinkIsInMyCollection
          initValue={initIsInMyCollection}
          value={isInMyCollection}
          isEditMode={isEditMode}
          onChange={handleChangeIsInMyCollection}
        />
        <div className="">
          <p className="text-sm font-bold text-gray-500">생성일</p>
          <p className="text-sm text-gray-500">
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        </div>
      </div>

      <LinkEditHandler
        id={id}
        title={initTitle === title ? undefined : title}
        description={initDescription === description ? undefined : description}
        memo={initMemo === memo ? undefined : memo}
        isInMyCollection={
          initIsInMyCollection === isInMyCollection
            ? undefined
            : isInMyCollection
        }
        kloudId={
          (initKloud === null && kloudId === null) || initKloud?.id === kloudId
            ? undefined
            : kloudId
        }
        isEditMode={isEditMode}
        handleChangeEditMode={handleChangeEditMode}
        onCloseLinkDetail={onClose}
      />
    </div>
  );
};

export default LinkInfoWithEdit;
