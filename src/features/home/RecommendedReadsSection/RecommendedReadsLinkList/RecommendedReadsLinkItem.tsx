'use client';

import { useOpenLink } from '@/features/kloud/modules/hooks/useOpenLink';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { handleErrorThumbnailImage } from '@/features/link/modules/utils/link';
import Image from 'next/image';

const RecommendedReadsLinkItem = ({ link }: { link: LinkInfoType }) => {
  const {
    id,
    thumbnailUrl,
    title,
    url,
    description,
    memo,
    kloud,
    createdAt,
  } = link;

  const { openLinkInNewTap } = useOpenLink({ id, url });

  return (
    <div
      className="group/item relative w-[270px] flex-shrink-0 cursor-pointer rounded-lg p-2 shadow-md "
      onClick={openLinkInNewTap}
    >
      <div className="relative aspect-[1.91/1] h-auto w-full duration-300 md:group-hover/item:-translate-y-2">
        <Image
          fill
          loading="lazy"
          alt="Link_thumbnail_image"
          src={thumbnailUrl}
          className="rounded-lg object-cover"
          onError={handleErrorThumbnailImage}
        />
      </div>

      <div className="p-2 pt-4">
        <p className="mb-2 truncate text-xs text-zinc-400">{url}</p>
        <p className="mb-1 truncate text-sm font-bold">{title}</p>
        <p className="truncate text-xs text-zinc-600">{description}</p>
      </div>

      {kloud && (
        <div className="absolute left-4 top-4 w-fit max-w-[60%] select-none rounded-full bg-primary-alt px-3 py-1">
          <p className="truncate text-xs font-bold text-white">{kloud?.name}</p>
        </div>
      )}
    </div>
  );
};
export default RecommendedReadsLinkItem;
