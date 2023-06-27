import {
    SignOutParams,
  SignOutResponse,
  signOut,
} from '@/features/auth/common/modules/apis/auth';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useSignOutMutation = (): UseMutationResult<
  SignOutResponse,
  AxiosError<ErrorResponseType>,
  SignOutParams
> => {
  return useMutation(signOut);
};
