'use client';

import { SubscriptionInfoType } from '@/common/modules/types/subscription';
import {
  arrayBufferToBase64,
  getSubscriptionInfo,
  urlBase64ToUint8Array,
} from '@/common/modules/utils/subscription';
import { useCheckSubscriptionMutation } from '@/features/kloud/modules/apiHooks/subscription/useCheckSubscriptionMutation';
import { useDeleteSubscriptionMutation } from '@/features/kloud/modules/apiHooks/subscription/useDeleteSubscriptionMutation';
import { useSaveSubscriptionMutation } from '@/features/kloud/modules/apiHooks/subscription/useSaveSubscriptionMutation';
import { AlertStatus, Switch, useToast } from '@chakra-ui/react';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

const NotificationHandler = () => {
  const toast = useToast();

  const [isChecked, setIsChecked] = useState(false);

  const { mutate: checkSubscriptionMutate } = useCheckSubscriptionMutation();
  const { mutate: saveSubscriptionMutate } = useSaveSubscriptionMutation();
  const { mutate: deleteSubscriptionMutate } = useDeleteSubscriptionMutation();

  const showToast = ({
    title,
    status,
    duration = 2000,
  }: {
    title: ReactNode;
    status: AlertStatus;
    duration?: number;
  }) => {
    return toast({
      title,
      status,
      duration,
      isClosable: true,
    });
  };

  /**
   * 서버에 구독을 저장하고 응답을 처리합니다.
   *
   * @param {Object} options - 옵션 객체입니다.
   * @param {PushSubscription} options.subscription - 구독 객체입니다.
   * @param {SubscriptionInfoType} options.subscriptionInfo - 구독 정보입니다.
   */
  const saveSubscription = ({
    subscription,
    subscriptionInfo,
  }: {
    subscription: PushSubscription;
    subscriptionInfo: SubscriptionInfoType;
  }) => {
    saveSubscriptionMutate(subscriptionInfo, {
      onSuccess: (data) => {
        showToast({
          title: '알림이 활성화 되었습니다.',
          status: 'success',
        });
      },
      onError: async (error) => {
        const isNotServerError = error.response?.status !== 500;

        if (isNotServerError) {
          // 구독 해제
          showToast({
            title:
              '서버 에러로 인해 알림을 활성화할 수 없습니다.\n잠시후 다시 시도해 주세요.',
            status: 'warning',
          });
          setIsChecked(false);
          await subscription.unsubscribe();
        }
      },
    });
  };

  /**
   * 서버에서 구독 상태를 확인하고 응답을 처리합니다.
   *
   * @param {Object} options - 옵션 객체입니다.
   * @param {PushSubscription} options.subscription - 구독 객체입니다.
   * @param {SubscriptionInfoType} options.subscriptionInfo - 구독 정보입니다.
   */
  const checkSubscription = ({
    subscription,
    subscriptionInfo,
  }: {
    subscription: PushSubscription;
    subscriptionInfo: SubscriptionInfoType;
  }) => {
    checkSubscriptionMutate(subscriptionInfo, {
      onSuccess: (data) => {
        // 이미 서버에 구독 정보가 등록된 브라우저 -> 활성화 됐다고 안내 해주기
        if (data.data.status === 'valid') {
          showToast({
            title: '알림이 활성화 되었습니다.',
            status: 'success',
          });
          return;
        }

        if (data.data.status === 'invalid') {
          saveSubscription({ subscription, subscriptionInfo });
          return;
        }
      },
    });
  };

  /**
   * 푸시 알림을 구독하고 구독을 처리합니다.
   *
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const handleSubscription = async (
    serviceWorker: ServiceWorkerRegistration
  ) => {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!publicKey) {
      showToast({
        title: (
          <p className="whitespace-pre">
            {`서버 에러로 인해 알림을 활성화할 수 없습니다.\n잠시후 다시 시도해 주세요.`}
          </p>
        ),
        status: 'warning',
      });
      setIsChecked(false);
      return;
    }

    // 푸쉬 구독
    try {
      const subscription = await serviceWorker.pushManager.getSubscription();

      if (subscription) {
        // * 기존 푸쉬 구독 정보 사용
        const subscriptionInfo = getSubscriptionInfo(subscription);

        if (subscriptionInfo) {
          checkSubscription({
            subscription,
            subscriptionInfo,
          });
        }
      } else {
        // * 새로운 푸쉬 구독 생성
        // 푸시 구독 정보의 endpoint와 keys는 각 구독 생성 시에 unique하게 생성되므로 서버에 있을 수 없다. = 서버에 있는지 확인할 필요가 없다.
        const subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });

        const subscriptionInfo = getSubscriptionInfo(subscription);

        if (subscriptionInfo) {
          saveSubscription({ subscription, subscriptionInfo });
        }
      }
    } catch (error) {
      // 구독 관련 에러 발생 시
    }
  };

  /**
   * 알림 권한이 필요함을 알리는 토스트를 보여줍니다.
   */
  const showPermissionRequiredToast = () => {
    return showToast({
      title: (
        <p className="whitespace-pre">
          {`브라우저 알림 허용이 필요합니다🥲\n하단의 사용 가이드 문서를 확인하여\n알림 권한 허용 후 다시 시도해 주세요!`}
        </p>
      ),
      status: 'info',
      duration: 3000,
    });
  };

  /**
   * 푸시 알림을 위한 권한을 요청하고 응답을 처리합니다.
   *
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const requestPermission = async (
    serviceWorker: ServiceWorkerRegistration
  ) => {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission === 'denied') {
      // 알림 권한 거절
      showToast({
        title: (
          <p className="whitespace-pre">
            {`알림 권한을 허용하지 않으셨습니다🥲\n이후 알림 받기를 원하신다면\n하단의 사용 가이드 문서를 확인하여\n알림 권한 허용 후 다시 시도해 주세요!`}
          </p>
        ),
        status: 'info',
        duration: 3000,
      });
      setIsChecked(false);
      return;
    }

    // 알림 권한 수락
    handleSubscription(serviceWorker);
  };

  /**
   * 브라우저가 알림을 구독할 수 있는지 확인하고 처리합니다.
   *
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const checkSubscribable = async (
    serviceWorker: ServiceWorkerRegistration
  ): Promise<void> => {
    if (Notification.permission === 'granted') {
      // * 이미 브라우저 알림 권한 동의되어있는 상태
      handleSubscription(serviceWorker);
    } else if (Notification.permission === 'denied') {
      // * 이미 브라우저 알림 권한이 거절되어있는 상태
      showPermissionRequiredToast();
      setIsChecked(false);
    } else {
      // * 권한 요청을 받아본적이 없는 상태

      if (Notification.permission === 'default') {
        // 사용자에게 알림 권한 요청이 보여지지 않았을 경우
        showPermissionRequiredToast();
        setIsChecked(false);
        return;
      }

      // 권한 요청 및 유저 선택에 따른 로직 수행
      requestPermission(serviceWorker);
    }
  };

  /**
   * 서버에서 구독을 삭제하고 응답을 처리합니다.
   *
   * @param {Object} options - 옵션 객체입니다.
   * @param {PushSubscription} options.subscription - 구독 객체입니다.
   * @param {ServiceWorkerRegistration} options.serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const deleteSubscription = ({
    subscription,
    serviceWorker,
  }: {
    subscription: PushSubscription;
    serviceWorker: ServiceWorkerRegistration;
  }) => {
    const auth = subscription.getKey('auth');
    const p256dh = subscription.getKey('p256dh');

    if (auth && p256dh) {
      // 구독 정보 서버에 저장되었는지 확인
      const subscriptionInfo: SubscriptionInfoType = {
        endpoint: subscription.endpoint,
        keys: {
          auth: arrayBufferToBase64(auth),
          p256dh: arrayBufferToBase64(p256dh),
        },
      };
      deleteSubscriptionMutate(subscriptionInfo, {
        onSuccess: async () => {
          await subscription.unsubscribe(); // 브라우저 푸쉬 구독 취소
          await serviceWorker.unregister(); // 서비스워커 제거
          showToast({
            title: '알림이 비활성화 되었습니다.',
            status: 'success',
          });
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            showToast({
              title: (
                <p className="whitespace-pre">
                  {`서버 에러로 인해 비활성화에 실패하였습니다.\n잠시후 다시 시도해 주세요.`}
                </p>
              ),
              status: 'warning',
            });
            setIsChecked(true);
          }
        },
      });
    }
  };

  /**
   * 푸시 알림을 구독 해제하고 응답을 처리합니다.
   *
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const handleUnsubscribe = async (
    serviceWorker: ServiceWorkerRegistration
  ) => {
    const subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      return;
    }

    // 서버에 저장된 구독 제거
    deleteSubscription({ subscription, serviceWorker });
  };

  /**
   * 서비스 워커를 가져오는 도중 발생한 오류를 처리합니다.
   *
   * @param {boolean} prevChecked - 이전 체크 상태입니다.
   */
  const handleServiceWorkerError = (prevChecked: boolean) => {
    showToast({
      title: (
        <p className="whitespace-pre">
          {`서버 에러로 인해 요청을 수행하지 못했습니다.\n잠시후 다시 시도해 주세요.`}
        </p>
      ),
      status: 'warning',
    });
    setIsChecked(prevChecked);
  };

  /**
   * 브라우저가 Service worker API와 Notification API를 지원하는지 확인합니다.
   * 모바일의 경우 PWA 앱을 설치하지 않고 알림 활성화가 불가능합니다.
   * @returns {Promise<boolean>} 지원하면 true, 그렇지 않으면 false입니다.
   */
  const isSupported = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      showToast({
        title: (
          <p className="whitespace-pre">
            {`해당 브라우저는 알림 기능을 지원하지 않아요🥲\n다른 브라우저에서 다시 시도해 주세요.\n모바일의 경우 알림을 위해 App 설치가 필요합니다.`}
          </p>
        ),
        status: 'info',
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  /**
   * 스위치 이벤트를 처리합니다.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - 스위치 이벤트입니다.
   */
  const handleSwitch = async (event: ChangeEvent<HTMLInputElement>) => {
    const prevChecked = isChecked;
    const newChecked = event.target.checked;
    setIsChecked(newChecked);

    if (!(await isSupported())) {
      setIsChecked(prevChecked);
      return;
    }

    try {
      if (!newChecked) {
        // 알림 비활성화하는 경우
        const serviceWorker = await navigator.serviceWorker.getRegistration(); // 기존 서비스워커

        if (serviceWorker) {
          await handleUnsubscribe(serviceWorker);
        } else {
          setIsChecked(!newChecked);
        }
      } else {
        // 알림 활성화하는 경우
        await navigator.serviceWorker.register('/sw.js'); // 새 서비스워커 등록

        const serviceWorker = await navigator.serviceWorker.ready; // 서비스 워커가 활성화될 때까지 대기
        console.log('serviceWorker.ready', serviceWorker);
        showToast({
          title: 'pass',
          status: 'info',
          duration: 2000,
        });
        await checkSubscribable(serviceWorker);
      }
    } catch (error) {
      handleServiceWorkerError(prevChecked);
      return;
    }
  };

  useEffect(() => {
    // * 알림 구독 여부 체크 및 그에 따른 스위치 활성화
    navigator.serviceWorker.ready.then((serviceWorker) => {
      serviceWorker.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          const subscriptionInfo = getSubscriptionInfo(subscription);

          if (subscriptionInfo) {
            checkSubscriptionMutate(subscriptionInfo, {
              onSuccess: (data) => {
                if (data.data.status === 'valid') {
                  setIsChecked(true);
                }
              },
            });
          }
        }
      });
    });
  }, [checkSubscriptionMutate, setIsChecked]);

  return (
    <div className="flex flex-col gap-2">
      <form className="flex items-center justify-between">
        <label
          htmlFor="notification-handler"
          className="text-lg font-bold text-gray-800"
        >
          미열람 링크 알림
        </label>
        <Switch
          id="notification-handler"
          size="md"
          isChecked={isChecked}
          onChange={handleSwitch}
        />
      </form>
      <p className="break-keep text-sm">
        확인하지 않은 링크가 10개 이상일 경우 알림을 보내드려요.
      </p>
      <p className="text-xs text-gray-500">
        {`알림 활성화가 되지 않는다면 `}
        <button
          type="button"
          className="w-fit text-xs text-gray-500 underline"
          onClick={() => window.open('https://www.craft.me/s/AGjkOZUm2mFTDE')}
        >
          {`사용 가이드`}
        </button>
        {` 문서를 확인해 주세요.`}
      </p>
    </div>
  );
};

export default NotificationHandler;
