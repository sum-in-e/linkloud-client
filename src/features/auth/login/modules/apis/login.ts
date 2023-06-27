import { instance } from '@/common/modules/apis/instance';
import { SignUpMethodType } from '@/features/auth/signup/modules/types/signupType';

export type EmailLogInBody = {
  email: string;
  password: string;
};

export type EmailLogInResponse = SuccessResponseType<{
  email: string;
  method: SignUpMethodType;
}>;

export const emailLogIn = async (
  body: EmailLogInBody
): Promise<EmailLogInResponse> => {
  const { data } = await instance.post('/user/login', body);
  return data;
};
