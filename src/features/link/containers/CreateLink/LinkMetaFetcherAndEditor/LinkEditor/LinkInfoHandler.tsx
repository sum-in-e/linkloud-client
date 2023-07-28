'use client';

import {
  useLinkState,
  useShowLinkEditorState,
} from '@/features/link/modules/stores/createLinkStore';
import { ChangeEvent } from 'react';
import { TbRefresh } from 'react-icons/tb';

const LinkInfoHanlder = () => {
  const { link, setLink } = useLinkState();
  const { setIsShowLinkEditor } = useShowLinkEditorState();

  const handleClickRefresh = () => {
    setIsShowLinkEditor(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setLink({ ...link, title: event.target.value });
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLink({ ...link, description: event.target.value });
  };

  const changeImageSrcToDefault = (element: HTMLImageElement) => {
    element.src = '/images/linkloud_thumbnail.png';
  };

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    changeImageSrcToDefault(event.target as HTMLImageElement);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <picture>
          <img
            alt="thumbnail"
            src={link.thumbnailUrl}
            className="aspect-[1.91/1] w-full rounded-lg object-cover"
            onError={handleErrorImage}
          />
        </picture>
        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-sm text-gray-500">{link.url}</p>
          <button
            className="rounded-2xl bg-blue-200 p-1"
            onClick={handleClickRefresh}
          >
            <TbRefresh size={20} />
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <input
          value={link.title}
          onChange={handleChangeTitle}
          className="common-input bg-stone-100"
          placeholder="제목을 필수로 입력해 주세요!"
        />
        <textarea
          value={link.description}
          onChange={handleChangeDescription}
          className="w-full resize-none rounded-2xl bg-stone-100 px-4 py-3 text-sm"
          placeholder="어떤 내용이 담긴 링크인가요?👀"
        />
      </div>
    </div>
  );
};

export default LinkInfoHanlder;
