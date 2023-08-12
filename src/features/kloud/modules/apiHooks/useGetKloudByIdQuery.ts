import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  GetKloudByIdData,
  GetKloudByIdParam,
  GetKloudByIdResponse,
  getKloudById,
} from '@/features/kloud/modules/apis/kloud';
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetKloudByIdQuery = (
  params: GetKloudByIdParam,
  enabledOption?: { enabled: boolean }
): UseQueryResult<GetKloudByIdData, AxiosError<ErrorResponseType>> => {
  return useQuery(
    queryKeys.kloud.getKloudById(params.id),
    () => getKloudById(params),
    {
      select: (data) => {
        return data.data;
      },
      ...enabledOption,
      retry: 1,
    }
  );
};
