'use client';

import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';

const HelpAndInfoButton = () => {
  return (
    <Link
      target="_blank"
      href="https://www.craft.me/s/AGjkOZUm2mFTDE"
      className="color-duration mx-10 mb-3 flex w-fit items-center gap-3 rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200"
    >
      <BsInfoCircle size={15} className="fill-zinc-700" />
      Help & Info
    </Link>
  );
};

export default HelpAndInfoButton;
