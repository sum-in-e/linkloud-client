'use client';

import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';

const HelpAndInfoArea = () => {
  return (
    <div className="md:mb-3 md:px-10">
      <Link
        target="_blank"
        href="https://www.craft.me/s/AGjkOZUm2mFTDE"
        className="color-duration flex w-full items-center gap-3 rounded-md border px-2 py-3  text-sm font-semibold text-zinc-700 md:w-fit md:rounded-full md:border-0 md:px-3 md:py-2 md:hover:bg-zinc-200"
      >
        <BsInfoCircle size={15} className="fill-zinc-700" />
        Help & Info
      </Link>
    </div>
  );
};

export default HelpAndInfoArea;
