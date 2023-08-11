'use client';

import Image from 'next/image';
import linkle from '/public/images/linkle.png';
import { BsArrowRepeat } from 'react-icons/bs';

interface Props {
  onRefetch: () => void;
}

const LinkListErrorUI = ({ onRefetch }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Image
        src={linkle}
        alt="linkloud Logo"
        className="h-auto w-28"
        priority
      />
      <h4 className="whitespace-pre text-center text-lg font-bold text-zinc-700">
        {`링크를 가져오지 못했어요..🥲\n아래 버튼을 눌러 다시 시도해 주세요.`}
      </h4>
      <button
        className="rounded-full bg-black p-[6px] hover:bg-gray-700"
        onClick={onRefetch}
      >
        <BsArrowRepeat size={18} className="fill-white" />
      </button>
    </div>
  );
};

export default LinkListErrorUI;
