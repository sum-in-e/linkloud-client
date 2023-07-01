import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';
import { SignUpMethodType } from '@/features/auth/signup/modules/types/signupType';

export type GetSessionResponse = SuccessResponseType<{
  id: number;
  email: string;
  method: SignUpMethodType;
  name: string;
}>;

export const getSession = async (): Promise<GetSessionResponse> => {
  const { data } = await instance.get(`/user/me`);
  return data;
};
