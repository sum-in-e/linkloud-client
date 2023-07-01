import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  GetKloudListData,
  getKloudList,
} from '@/features/kloud/modules/apis/kloud';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetKloudListQuery = (): UseQueryResult<
  GetKloudListData,
  AxiosError<ErrorResponseType>
> => {
  return useQuery(queryKeys.kloud.getKloudList, getKloudList, {
    select: (data) => {
      return data.data;
    },
  });
};
