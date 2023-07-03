import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchKloudByIdParam,
  PatchKloudByIdResponse,
  patchKloudById,
} from '@/features/kloud/modules/apis/kloud';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchKloudByIdMutation = (): UseMutationResult<
  PatchKloudByIdResponse,
  AxiosError<ErrorResponseType>,
  PatchKloudByIdParam
> => {
  return useMutation(patchKloudById);
};
