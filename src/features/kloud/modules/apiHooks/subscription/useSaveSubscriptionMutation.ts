import { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ErrorResponseType } from '@/common/modules/types/responseType';
import {
  SaveSubscriptionResponse,
  SubscriptionParams,
  saveSubscription,
} from '@/features/kloud/modules/apis/subscription';

export const useSaveSubscriptionMutation = (): UseMutationResult<
  SaveSubscriptionResponse,
  AxiosError<ErrorResponseType>,
  SubscriptionParams
> => {
  return useMutation(saveSubscription);
};
