import EmailSignUp from '@/features/signup/containers/EmailSignUp';
import {
  EmailSignUpBody,
  EmailSignUpResponse,
  emailSignUp,
} from '@/features/signup/modules/apis/signup';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const emailSignUpMutation = (): UseMutationResult<
  EmailSignUpResponse,
  AxiosError<ErrorResponseType>,
  EmailSignUpBody
> => {
  return useMutation(emailSignUp);
};
