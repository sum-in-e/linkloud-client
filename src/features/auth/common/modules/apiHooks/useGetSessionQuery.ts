import queryKeys from '@/common/modules/apiHooks/queryKeys';
import {
  GetSessionResponse,
  getSession,
} from '@/features/auth/common/modules/apis/session';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetSessionQuery = (): UseQueryResult<
  GetSessionResponse,
  AxiosError
> => {
  return useQuery(queryKeys.user.getSession, getSession, {
    enabled: false,
  });
};
