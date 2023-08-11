'use client';

import LinkInfoLabel from '@/features/link/components/LinkInfoLabel';
import dayjs from 'dayjs';

interface Props {
  initValue: string;
}

const LinkCreatedAt = ({ initValue }: Props) => {
  return (
    <div className="mt-3 flex gap-2">
      <LinkInfoLabel htmlFor="link_createdAt" title="생성일" />
      <p id="link_createdAt" className="text-xs text-zinc-500">
        {dayjs(initValue).format('YYYY-MM-DD HH:mm:ss')}
      </p>
    </div>
  );
};
export default LinkCreatedAt;
