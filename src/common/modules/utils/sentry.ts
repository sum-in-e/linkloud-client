import { AxiosError } from 'axios';
import { captureException, withScope } from '@sentry/nextjs';

const MODE = process.env.NEXT_PUBLIC_MODE;

export const sentryLogger = (error: AxiosError<ErrorResponseType>) => {
  if (MODE === 'production') {
    withScope((scope) => {
      scope.setTransactionName(
        error.response?.data.message || '알 수 없는 에러'
      );
      captureException(error);
    });
  }
};
