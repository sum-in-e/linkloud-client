import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  KakaoSignUpBody,
  KakaoSignUpResponse,
  kakaoSignUp,
} from '@/features/auth/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useKakaoSignUpMutation = (): UseMutationResult<
  KakaoSignUpResponse,
  AxiosError<ErrorResponseType>,
  KakaoSignUpBody
> => {
  return useMutation(kakaoSignUp);
};
