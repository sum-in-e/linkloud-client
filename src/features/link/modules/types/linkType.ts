import { UserEntity } from '@/features/auth/common/modules/types/authType';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';

export interface LinkEntity {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  memo: string;
  isInMyCollection: boolean;
  isRead: boolean;
  readAt: string;
  clickCount: number;
  clickFrequency: number | null;
  lastClickedAt: string | null;
  createdAt: string;
  updatedAt: string;
  kloud: KloudEntity | null;
  user: UserEntity;
}
