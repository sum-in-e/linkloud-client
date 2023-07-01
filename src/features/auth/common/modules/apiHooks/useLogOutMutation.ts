import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  LogOutResponse,
  logOut,
} from '@/features/auth/common/modules/apis/auth';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLogOutMutation = (): UseMutationResult<
  LogOutResponse,
  AxiosError<ErrorResponseType>
> => {
  return useMutation(logOut);
};
