'use client';

import { BsArrowRepeat } from 'react-icons/bs';

interface Props {
  onRetry: () => void;
}

const MenuListError = ({ onRetry }: Props) => {
  return (
    <section className="flex w-full flex-col items-center gap-2 py-5">
      <p className="whitespace-pre-wrap break-keep text-center text-sm font-semibold">
        메뉴를 불러오는데 실패했습니다.
      </p>
      <button
        type="button"
        className="rounded-full bg-black p-[6px] md:hover:bg-gray-700"
        onClick={onRetry}
      >
        <BsArrowRepeat size={18} className="fill-white" />
      </button>
    </section>
  );
};

export default MenuListError;
