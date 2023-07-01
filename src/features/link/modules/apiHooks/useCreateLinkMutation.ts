import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  CreateLinkResponse,
  createLink,
  createLinkBody,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateLinkMutation = (): UseMutationResult<
  CreateLinkResponse,
  AxiosError<ErrorResponseType>,
  createLinkBody
> => {
  return useMutation(createLink);
};
