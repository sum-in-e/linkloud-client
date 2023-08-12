import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  GetLinkListData,
  GetLinkListParams,
  getLinkList,
} from '@/features/link/modules/apis/link';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetLinkListQuery = (
  params: GetLinkListParams,
  enabledOption?: { enabled: boolean }
): UseQueryResult<GetLinkListData, AxiosError<ErrorResponseType>> => {
  return useQuery(
    queryKeys.link.getLinkList(params),
    () => getLinkList(params),
    {
      select: (data) => {
        return data.data;
      },
      ...enabledOption,
    }
  );
};
