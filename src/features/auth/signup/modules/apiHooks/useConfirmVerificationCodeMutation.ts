import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  ConfirmVerificationParams,
  ConfirmVerificationResponse,
  confirmVerificationCode,
} from '@/features/auth/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useConfirmVerificationCodeMutation = (): UseMutationResult<
  ConfirmVerificationResponse,
  AxiosError<ErrorResponseType>,
  ConfirmVerificationParams
> => {
  return useMutation(confirmVerificationCode);
};
