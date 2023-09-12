import queryKeys from '@/common/modules/apiHooks/queryKeys';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  GetLinkListForLinkManagerData,
  getLinkListForLinkManager,
} from '@/features/linkManager/modules/apis/linkManager';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetLinkListForLinkManagerQuery = (): UseQueryResult<
  GetLinkListForLinkManagerData,
  AxiosError<ErrorResponseType>
> => {
  return useQuery(
    queryKeys.link.getLinkListForLinkManager,
    () => getLinkListForLinkManager(),
    {
      select: (data) => {
        return data.data;
      },
    }
  );
};
