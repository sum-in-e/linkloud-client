import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  LinkAnalyzeResponse,
  linkAnalyze,
  linkAnalyzeParams,
} from '@/features/link/modules/apis/link';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLinkAnalyzeMutation = (): UseMutationResult<
  LinkAnalyzeResponse,
  AxiosError<ErrorResponseType>,
  linkAnalyzeParams
> => {
  return useMutation(linkAnalyze);
};
