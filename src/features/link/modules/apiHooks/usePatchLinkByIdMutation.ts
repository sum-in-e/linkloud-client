import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchLinkByIdParam,
  PatchLinkByIdResponse,
  patchLinkById,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchLinkByIdMutation = (): UseMutationResult<
  PatchLinkByIdResponse,
  AxiosError<ErrorResponseType>,
  PatchLinkByIdParam
> => {
  return useMutation(patchLinkById);
};
