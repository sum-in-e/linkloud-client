import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  postEmailVerificationCode,
  PostEmailVerificationCodeParams,
  PostEmailVerificationCodeResponse,
} from '@/features/auth/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

export const usePostEmailVerificationCodeMutation = (): UseMutationResult<
  PostEmailVerificationCodeResponse,
  AxiosError<ErrorResponseType>,
  PostEmailVerificationCodeParams
> => {
  return useMutation(postEmailVerificationCode);
};
