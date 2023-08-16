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

export const notKloudCategory = {
  unread: '미확인',
  uncategorized: '미분류',
  collection: 'Collection',
  search: '검색',
  all: '전체',
} as const;

export type NotKloudCategoryKeyType = keyof typeof notKloudCategory;
export type NotKloudCategoryValueType =
  (typeof notKloudCategory)[keyof typeof notKloudCategory];
