import { SignUpMethodType } from '@/features/auth/signup/modules/types/signupType';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';
import { LinkEntity } from '@/features/link/modules/types/linkType';

export type AuthMethodType = 'login' | 'signup';

export interface UserEntity {
  id: number;
  email: string;
  name: string;
  method: SignUpMethodType;
  isInactive: boolean;
  inactivedAt: string | null;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  links: LinkEntity[];
  klouds: KloudEntity[];
}
