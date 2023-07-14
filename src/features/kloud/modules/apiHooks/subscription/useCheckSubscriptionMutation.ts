import { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  CheckSubscriptionResponse,
  SubscriptionParams,
  checkSubscription,
} from '@/features/kloud/modules/apis/subscription';

export const useCheckSubscriptionMutation = (): UseMutationResult<
  CheckSubscriptionResponse,
  AxiosError<ErrorResponseType>,
  SubscriptionParams
> => {
  return useMutation(checkSubscription);
};
