import { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  DeleteSubscriptionResponse,
  SubscriptionParams,
  deleteSubscription,
} from '@/features/kloud/modules/apis/subscription';

export const useDeleteSubscriptionMutation = (): UseMutationResult<
  DeleteSubscriptionResponse,
  AxiosError<ErrorResponseType>,
  SubscriptionParams
> => {
  return useMutation(deleteSubscription);
};
