'use client';

import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';

const HelpAndInfoButton = () => {
  return (
    <Link
      target="_blank"
      href="https://www.craft.me/s/AGjkOZUm2mFTDE"
      className="color-duration flex w-full items-center gap-3 rounded-md border px-2 py-3 text-sm font-semibold text-zinc-700"
    >
      <BsInfoCircle size={15} className="fill-zinc-700" />
      Help & Info
    </Link>
  );
};

export default HelpAndInfoButton;
