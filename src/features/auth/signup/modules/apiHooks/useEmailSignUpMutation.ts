import EmailSignUp from '@/features/auth/signup/containers/EmailSignUp';
import {
  EmailSignUpBody,
  EmailSignUpResponse,
  emailSignUp,
} from '@/features/auth/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useEmailSignUpMutation = (): UseMutationResult<
  EmailSignUpResponse,
  AxiosError<ErrorResponseType>,
  EmailSignUpBody
> => {
  return useMutation(emailSignUp);
};
