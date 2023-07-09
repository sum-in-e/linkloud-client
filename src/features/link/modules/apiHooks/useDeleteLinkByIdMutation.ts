import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  DeleteLinkByIdParam,
  DeleteLinkByIdResponse,
  deleteLinkById,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteLinkByIdMutation = (): UseMutationResult<
  DeleteLinkByIdResponse,
  AxiosError<ErrorResponseType>,
  DeleteLinkByIdParam
> => {
  return useMutation(deleteLinkById);
};
