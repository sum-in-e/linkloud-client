'use client';

import LinkInfoLabel from '@/features/link/components/LinkInfoLabel';
import { LinkInfoKloudType } from '@/features/link/modules/apis/link';

interface Props {
  kloud: LinkInfoKloudType | null;
}

const LinksKloud = ({ kloud }: Props) => {
  return (
    <div className="mt-2 flex flex-col">
      <LinkInfoLabel htmlFor="link_kloud" title="클라우드" />
      <div className="mt-[2px] w-fit max-w-full select-none rounded-xl bg-primary-alt px-3 py-1">
        <p id="link_kloud" className="truncate text-sm font-bold text-white">
          {kloud === null ? '미분류' : kloud.name}
        </p>
      </div>
    </div>
  );
};

export default LinksKloud;
