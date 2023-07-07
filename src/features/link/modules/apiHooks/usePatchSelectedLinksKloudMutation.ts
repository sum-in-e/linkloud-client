import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchSelectedLinksKloudParams,
  PatchSelectedLinksKloudResponse,
  patchSelectedLinksKloud,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchSelectedLinksKloudMutation = (): UseMutationResult<
  PatchSelectedLinksKloudResponse,
  AxiosError<ErrorResponseType>,
  PatchSelectedLinksKloudParams
> => {
  return useMutation(patchSelectedLinksKloud);
};
