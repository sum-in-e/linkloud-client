import { instance } from '@/common/modules/apis/instance';
import queryString from 'querystring';

export type PostEmailVerificationCodeParams = {
  email: string;
};

export type PostEmailVerificationCodeResponse = SuccessResponseType<{
  expiredAt: string;
}>;

export const postEmailVerificationCode = async ({
  email,
}: PostEmailVerificationCodeParams): Promise<PostEmailVerificationCodeResponse> => {
  const query = queryString.stringify({ email });

  const { data } = await instance.post(`/email-verification/send?${query}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type ConfirmVerificationParams = {
  email: string;
  verificationCode: string;
};

export type ConfirmVerificationResponse = SuccessResponseType<{
  email: string;
}>;

export const confirmVerificationCode = async ({
  email,
  verificationCode,
}: ConfirmVerificationParams): Promise<ConfirmVerificationResponse> => {
  const query = queryString.stringify({ email, verificationCode });

  const { data } = await instance.post(`/email-verification/confirm?${query}`);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type EmailSignUpBody = {
  email: string;
  password: string;
  name: string;
};

export type EmailSignUpResponse = SuccessResponseType<{
  email: string;
}>;

export const emailSignUp = async (
  body: EmailSignUpBody
): Promise<EmailSignUpResponse> => {
  const { data } = await instance.post('/user/signup', body);
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
