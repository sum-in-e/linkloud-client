import { LINKLOUD_THUMBNAIL_IMAGE_URL } from '@/common/modules/constants/brand';
import { ChangeEvent } from 'react';

export const handleErrorThumbnailImage = (
  event: ChangeEvent<HTMLImageElement>
) => {
  return (event.target.src = LINKLOUD_THUMBNAIL_IMAGE_URL);
};
