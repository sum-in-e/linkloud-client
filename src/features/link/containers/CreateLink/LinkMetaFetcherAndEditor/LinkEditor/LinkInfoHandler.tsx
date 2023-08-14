'use client';

import LinkInfoLabel from '@/features/link/components/LinkInfoLabel';
import {
  useLinkState,
  useShowLinkEditorState,
} from '@/features/link/modules/stores/createLinkStore';
import { ChangeEvent } from 'react';
import { BsArrowRepeat, BsChevronDown } from 'react-icons/bs';

interface Props {
  handleKloudSelectMode: (state: boolean) => void;
}

const LinkInfoHanlder = ({ handleKloudSelectMode }: Props) => {
  const { link, setLink } = useLinkState();
  const { setIsShowLinkEditor } = useShowLinkEditorState();

  const handleClickRefresh = () => {
    setIsShowLinkEditor(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setLink({ title: event.target.value });
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLink({ description: event.target.value });
  };

  const changeImageSrcToDefault = (element: HTMLImageElement) => {
    element.src = '/images/linkloud_thumbnail.png';
  };

  const handleErrorImage = (event: ChangeEvent<HTMLImageElement>) => {
    changeImageSrcToDefault(event.target as HTMLImageElement);
  };

  const handleClickKloud = () => {
    handleKloudSelectMode(true);
  };

  return (
    <div className="w-full px-3 md:px-5">
      <div className="w-full">
        <picture>
          <img
            alt="thumbnail"
            src={link.thumbnailUrl}
            className="aspect-[1.91/1] w-full rounded-lg object-cover"
            onError={handleErrorImage}
          />
        </picture>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="truncate text-sm text-gray-500">{link.url}</p>
          <button
            type="button"
            className="rounded-2xl bg-black p-1 hover:bg-zinc-600"
            onClick={handleClickRefresh}
          >
            <BsArrowRepeat size={18} className="fill-white" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <LinkInfoLabel title="제목" htmlFor="link-title" />
        <input
          id="link-title"
          value={link.title}
          onChange={handleChangeTitle}
          className="reset-input rounded-xl bg-zinc-100 px-4 py-3 text-sm"
          placeholder="제목을 필수로 입력해 주세요!"
        />
      </div>
      <div className="mt-2">
        <LinkInfoLabel title="내용" htmlFor="link-description" />
        <textarea
          id="link-description"
          value={link.description}
          onChange={handleChangeDescription}
          className="reset-textarea h-20 rounded-xl bg-zinc-100 px-4 py-3 text-sm"
          placeholder="어떤 내용이 담긴 링크인가요?👀"
        />
      </div>
      <div className="mt-2">
        <LinkInfoLabel title="클라우드" />
        <button
          type="button"
          className="reset-button flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3"
          onClick={handleClickKloud}
        >
          <p className="text-sm">
            {link.kloud === null ? '미분류' : link.kloud.name}
          </p>
          <BsChevronDown size={15} />
        </button>
      </div>
    </div>
  );
};

export default LinkInfoHanlder;
