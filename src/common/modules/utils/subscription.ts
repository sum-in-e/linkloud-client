import {
  checkSubscription,
  getSubscriptionPublicKey,
  saveSubscription,
} from '@/features/kloud/modules/apis/subscription';
import { sentryLogger } from '@/common/modules/utils/sentry';

/**
 * @description ArrayBuffer를 받아 이를 Base64 형태의 문자열로 변환하는 함수
 * 푸시 알림을 위한 구독을 생성할 때, VAPID 공개키를 이 형식으로 제공해야하기 때문에 필요
 */
const arrayBufferToBase64 = (buffer: ArrayBufferLike) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

/**
 * @description Base64URL 문자열을 Uint8Array로 변환하는 함수
 */
const urlBase64ToUint8Array = (base64String: string) => {
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
 * @description 구독 상태를 확인
 */
const checkSubscriptionStatus = async (
  subscription: PushSubscription,
  registration: ServiceWorkerRegistration
) => {
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  if (auth && p256dh) {
    try {
      await checkSubscription({
        endpoint: subscription.endpoint,
        keys: {
          auth: arrayBufferToBase64(auth),
          p256dh: arrayBufferToBase64(p256dh),
        },
      });
    } catch (error) {
      // * 서버에 구독 정보가 존재하지 않음 -> 브라우저의 구독과 서버에 저장된 구독 정보 동기화를 위한 작업 실행

      // 브라우저 구독 취소
      await subscription.unsubscribe();
      // 새로운 구독 생성 및 등록
      subscribeWithRegistration(registration);
    }
  }
};

/**
 * @description registration으로 구독을 등록
 */
const subscribeWithRegistration = async (
  registration: ServiceWorkerRegistration
) => {
  try {
    const {
      data: { publicKey },
    } = await getSubscriptionPublicKey();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    try {
      const auth = subscription.getKey('auth');
      const p256dh = subscription.getKey('p256dh');

      if (auth && p256dh) {
        await saveSubscription({
          endpoint: subscription.endpoint,
          keys: {
            auth: arrayBufferToBase64(auth),
            p256dh: arrayBufferToBase64(p256dh),
          },
        });
      }
    } catch (error) {
      // * 서버에 구독 정보 저장 실패
      // 실패를 유저에게 알려주면 구독을 저장한다는 개념을 유저가 인식하게 된다.
      // 구독 취소 (DB에 저장된 구독 정보과 브라우저 구독의 동기화를 위해)
      await subscription.unsubscribe();
    }
  } catch (error) {
    // * 구독을 생성하지 못 함(publicKey를 못 가져왔거나 구독 생성 과정에서의 에러 발생)
    // 실패를 유저에게 알려주면 구독을 저장한다는 개념을 유저가 인식하게 된다.
  }
};

/**
 * @description 알림 권한 수락 혹은 거절에 따른 로직 처리
 */
const handleNotificationPermission = async (
  permission: NotificationPermission
) => {
  // * 권한 요청 거절
  if (permission !== 'granted') {
    alert(
      '이후 알림 받기를 원하신다면 [브라우저 설정 - 개인정보 및 보안 - 사이트 설정 - 권한]에서 Linkloud 사이트의 알림 권한을 허용해주세요.'
    );
    return;
  }

  // * 권한 요청 수락
  const serviceWorker = await navigator.serviceWorker.ready;
  // 구독 생성 및 등록
  return await subscribeWithRegistration(serviceWorker);
};

/**
 * @description Main function (유저 로그인된 상태에서 실행되어야합니다.)
 *
 */
export const checkNotificationSubscription = async () => {
  if (!('serviceWorker' in navigator)) return;
  console.log('registrateion');
  try {
    let serviceWorker;

    if (navigator.serviceWorker.controller) {
      // 서비스워커가 이미 등록되어 있음
      console.log('Service Worker is already registered.');
      serviceWorker = await navigator.serviceWorker.ready;
    } else {
      // 서비스워커가 등록되어 있지 않음 -> 서비스워커 등록
      console.log('Service Worker is not registered.');
      serviceWorker = await navigator.serviceWorker.register('/sw.js');
    }

    console.log('serviceWorker', serviceWorker);

    // * 사용자의 알림 권한을 확인
    if (Notification.permission === 'granted') {
      // * 사용자가 이미 알림 수신을 허용한 상태 -> 구독 확인
      console.log('granted');
      const subscription = await serviceWorker.pushManager.getSubscription();

      if (!subscription) {
        console.log('!subscription');
        // 구독 정보가 없으므로, 새로운 구독을 생성
        await subscribeWithRegistration(serviceWorker);
      } else {
        const LAST_CHECKED_TIME = 'lastCheckedTime';
        console.log('subscription');
        // 마지막으로 구독 정보를 확인한 시점을 가져옴
        const lastCheckedTime = localStorage.getItem(LAST_CHECKED_TIME);

        if (
          !lastCheckedTime ||
          Date.now() - Number(lastCheckedTime) >= 7 * 24 * 60 * 60 * 1000
        ) {
          // 마지막 확인 시간이 없거나, 마지막 확인 후 일주일이 지났으면
          // 서버에 저장된 구독 정보와 브라우저의 구독 상태를 동기화하기 위해 checkSubscriptionStatus를 호출
          await checkSubscriptionStatus(subscription, serviceWorker);

          // 확인 작업이 끝났으면 현재 시간을 로컬 스토리지에 저장 (일주일 후 다시 확인하기 위함)
          localStorage.setItem(LAST_CHECKED_TIME, Date.now().toString());
        }
      }
    } else if (Notification.permission !== 'denied') {
      // * 사용자가 권한 거절이나 수락 어느것도 하지 않은 상태
      console.log('denied');
      // 권한 요청
      const permission = await Notification.requestPermission();
      // 수락 혹은 거절에 따른 처리
      await handleNotificationPermission(permission);
    }
  } catch (error) {
    sentryLogger(error);
  }
};
