import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchLinkCountParam,
  PatchLinkCountResponse,
  patchLinkCount,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchLinkCountMutation = (): UseMutationResult<
  PatchLinkCountResponse,
  AxiosError<ErrorResponseType>,
  PatchLinkCountParam
> => {
  return useMutation(patchLinkCount);
};
