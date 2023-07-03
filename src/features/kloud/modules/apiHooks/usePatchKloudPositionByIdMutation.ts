import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  PatchKloudPositionByIdParam,
  PatchKloudPositionByIdResponse,
  patchKloudPositionById,
} from '@/features/kloud/modules/apis/kloud';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePatchKloudPositionByIdMutation = (): UseMutationResult<
  PatchKloudPositionByIdResponse,
  AxiosError<ErrorResponseType>,
  PatchKloudPositionByIdParam
> => {
  return useMutation(patchKloudPositionById);
};
