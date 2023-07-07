import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchLinkReadParam,
  PatchLinkReadResponse,
  patchLinkRead,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchLinkReadMutation = (): UseMutationResult<
  PatchLinkReadResponse,
  AxiosError<ErrorResponseType>,
  PatchLinkReadParam
> => {
  return useMutation(patchLinkRead);
};
