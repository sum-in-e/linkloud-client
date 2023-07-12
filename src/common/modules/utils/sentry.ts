import { AxiosError } from 'axios';
import { captureException, withScope } from '@sentry/nextjs';
import { ErrorResponseType } from '@/common/modules/types/responseType';

const MODE = process.env.NEXT_PUBLIC_MODE;

export const sentryLogger = (
  error: AxiosError<ErrorResponseType> | unknown
) => {
  if (MODE === 'production') {
    withScope((scope) => {
      if (error instanceof AxiosError) {
        scope.setTransactionName(
          error.response?.data.message || '🚨AxiosError🚨'
        );
      } else {
        scope.setTransactionName('🚨unknownError🚨');
      }

      captureException(error);
    });
  }
};
