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
