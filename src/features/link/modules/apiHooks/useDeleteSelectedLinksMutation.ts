import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  DeleteSelectedLinksParam,
  DeleteSelectedLinksResponse,
  deleteSelectedLinks,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteSelectedLinksMutation = (): UseMutationResult<
  DeleteSelectedLinksResponse,
  AxiosError<ErrorResponseType>,
  DeleteSelectedLinksParam
> => {
  return useMutation(deleteSelectedLinks);
};
