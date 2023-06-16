import {
  EmailLogInBody,
  EmailLogInResponse,
  emailLogIn,
} from '@/features/auth/login/modules/apis/login';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useEmailLogInMutation = (): UseMutationResult<
  EmailLogInResponse,
  AxiosError<ErrorResponseType>,
  EmailLogInBody
> => {
  return useMutation(emailLogIn);
};
