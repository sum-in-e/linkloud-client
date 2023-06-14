import {
  postEmailVerificationCode,
  PostEmailVerificationCodeParams,
  PostEmailVerificationCodeResponse,
} from '@/features/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

export const emailVerificationCodeMutation = (): UseMutationResult<
  PostEmailVerificationCodeResponse,
  AxiosError<ErrorResponseType>,
  PostEmailVerificationCodeParams
> => {
  return useMutation(postEmailVerificationCode);
};
