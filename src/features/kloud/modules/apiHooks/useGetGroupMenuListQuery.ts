import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  GetGroupMenuListData,
  getGroupMenuList,
} from '@/features/kloud/modules/apis/kloud';

export const useGetGroupMenuListQuery = (): UseQueryResult<
  GetGroupMenuListData,
  AxiosError<ErrorResponseType>
> => {
  return useQuery(queryKeys.kloud.getGroupMenuList, getGroupMenuList, {
    select: (data) => {
      return data.data;
    },
  });
};
