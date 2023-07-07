import { UserEntity } from '@/features/auth/common/modules/types/authType';
import { LinkEntity } from '@/features/link/modules/types/linkType';

export interface KloudEntity {
  id: number;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  user: UserEntity;
  links: LinkEntity[];
}

export const groupMapper = {
  unread: '미열람',
  uncategorized: '미분류',
  collection: 'Collection',
  all: '전체',
} as const;

export type GroupKeyType = keyof typeof groupMapper;
export type GroupValueType = (typeof groupMapper)[keyof typeof groupMapper];
