import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  DeleteKloudByIdParam,
  DeleteKloudByIdResponse,
  deleteKloudById,
} from '@/features/kloud/modules/apis/kloud';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteKloudByIdMutation = (): UseMutationResult<
  DeleteKloudByIdResponse,
  AxiosError<ErrorResponseType>,
  DeleteKloudByIdParam
> => {
  return useMutation(deleteKloudById);
};
