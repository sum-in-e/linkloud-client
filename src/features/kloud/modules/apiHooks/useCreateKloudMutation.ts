import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  CreateKloudResponse,
  createKloud,
  createKloudBody,
} from '@/features/kloud/modules/apis/kloud';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateKloudMutation = (): UseMutationResult<
  CreateKloudResponse,
  AxiosError<ErrorResponseType>,
  createKloudBody
> => {
  return useMutation(createKloud);
};
