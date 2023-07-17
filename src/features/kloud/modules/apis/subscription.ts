import { instance } from '@/common/modules/apis/instance';
import { SuccessResponseType } from '@/common/modules/types/responseType';

export type SubscriptionParams = {
  endpoint: string;
  keys: {
    //  auth와 p256dh는 클라이언트에서 PushManager.subscribe 메서드를 사용하여 푸시 구독을 생성할 때 자동으로 생성되므로 이를 서버로 전달하면 된다.
    auth: string;
    p256dh: string;
  };
};

export type SaveSubscriptionResponse = SuccessResponseType<{}>;

/**
 * @description 구독 등록 API
 */
export const saveSubscription = async (
  params: SubscriptionParams
): Promise<SaveSubscriptionResponse> => {
  const { data } = await instance.post(`/subscription`, {
    ...params,
  });
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export type CheckSubscriptionResponse = SuccessResponseType<{
  status: 'valid' | 'invalid';
}>;

/**
 * @description 구독 확인 API
 */
export const checkSubscription = async (
  params: SubscriptionParams
): Promise<CheckSubscriptionResponse> => {
  const { data } = await instance.post(`/subscription/check-subscription`, {
    ...params,
  });
  return data;
};

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
export type DeleteSubscriptionResponse = SuccessResponseType<{}>;

/**
 * @description 구독 제거 API
 */
export const deleteSubscription = async (
  params: SubscriptionParams
): Promise<DeleteSubscriptionResponse> => {
  const { data } = await instance.post(`/subscription/delete-subscription`, {
    ...params,
  });
  return data;
};
