import { SubscriptionInfoType } from '@/common/modules/types/subscription';

/**
 * ArrayBuffer를 받아 이를 Base64 형태의 문자열로 변환하는 함수입니다.
 * 푸시 알림을 위한 구독을 생성할 때, VAPID 공개키를 이 형식으로 제공해야하기 때문에 필요합니다.
 */
export const arrayBufferToBase64 = (buffer: ArrayBufferLike) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

/**
 * Base64URL 문자열을 Uint8Array로 변환하는 함수입니다.
 */
export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

/**
 * 주어진 PushSubscription으로부터 subscription 정보를 추출하는 함수입니다.
 * 이 함수는 auth 및 p256dh 키를 추출하고 이를 바탕으로 subscription 정보 객체를 생성합니다.
 *
 * @param {PushSubscription} subscription - 푸쉬 구독 정보를 포함하는 PushSubscription 객체
 * @returns {SubscriptionInfoType | null} auth 및 p256dh 키가 유효한 경우 subscription 정보 객체를 반환하고, 그렇지 않은 경우 null을 반환합니다.
 */
export const getSubscriptionInfo = (
  subscription: PushSubscription
): SubscriptionInfoType | null => {
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  if (auth && p256dh) {
    return {
      endpoint: subscription.endpoint,
      keys: {
        auth: arrayBufferToBase64(auth),
        p256dh: arrayBufferToBase64(p256dh),
      },
    };
  }
  return null;
};
