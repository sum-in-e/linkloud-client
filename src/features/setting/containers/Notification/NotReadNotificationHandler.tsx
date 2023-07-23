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

const NotReadNotificationHandler = () => {
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
   * 알림 활성화 완료 토스트를 보여줍니다.
   */
  const showSuccessToast = () => {
    return showToast({
      title: '알림이 활성화 되었습니다.',
      status: 'success',
    });
  };

  /**
   * 서비스 워커를 가져오는 도중 발생한 오류를 처리합니다.
   */
  const handleFailedError = () => {
    showToast({
      title: (
        <p className="whitespace-pre">
          {`알림을 활성화하지 못했습니다.\n새로고침후 다시 시도해 주세요.`}
        </p>
      ),
      status: 'warning',
    });
    setIsChecked(isChecked);
  };

  /**
   * 서버에 구독을 저장하고 응답을 처리합니다.
   *
   * @param {PushSubscription} subscription - 구독 객체입니다.
   * @param {SubscriptionInfoType} subscriptionInfo - 구독 정보입니다.
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
        showSuccessToast();
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
   * @param {SubscriptionInfoType} subscriptionInfo - 구독 정보입니다.
   */
  const checkSubscription = ({
    subscriptionInfo,
  }: {
    subscriptionInfo: SubscriptionInfoType;
  }): Promise<'valid' | 'invalid'> => {
    return new Promise((resolve, reject) => {
      checkSubscriptionMutate(subscriptionInfo, {
        onSuccess: (data) => {
          if (data.data.status === 'valid') {
            resolve('valid');
          }
          if (data.data.status === 'invalid') {
            resolve('invalid');
          }
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  /**
   * 새 알림 구독을 생성합니다.
   */
  const createNewSubscription = async ({
    serviceWorker,
    publicKey,
  }: {
    serviceWorker: ServiceWorkerRegistration;
    publicKey: string;
  }) => {
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  };

  /**
   * 푸시 구독 정보를 검사하고 저장하는 함수입니다.
   */
  const checkAndSaveSubscription = async ({
    serviceWorker,
    subscription,
    publicKey,
  }: {
    serviceWorker: ServiceWorkerRegistration;
    subscription: PushSubscription | null;
    publicKey: string;
  }) => {
    if (subscription) {
      // 기존 푸쉬 구독 정보 사용
      const subscriptionInfo = getSubscriptionInfo(subscription);
      if (subscriptionInfo) {
        const subscriptionStatus = await checkSubscription({
          subscriptionInfo,
        });
        if (subscriptionStatus === 'valid') {
          showSuccessToast();
        }
        if (subscriptionStatus === 'invalid') {
          saveSubscription({ subscription, subscriptionInfo });
        }
      }
    } else {
      // 새로운 푸쉬 구독 생성

      const newSubscription = await createNewSubscription({
        serviceWorker,
        publicKey,
      });

      const newSubscriptionInfo = getSubscriptionInfo(newSubscription);
      if (newSubscriptionInfo) {
        saveSubscription({
          subscription: newSubscription,
          subscriptionInfo: newSubscriptionInfo,
        });
      }
    }
  };

  /**
   * 푸시 알림을 구독하고 구독을 처리합니다.
   *
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
   */
  const handleSubscription = async (
    serviceWorker: ServiceWorkerRegistration
  ) => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) throw new Error();

      const subscription = await serviceWorker.pushManager.getSubscription();
      await checkAndSaveSubscription({
        serviceWorker,
        subscription,
        publicKey,
      });
    } catch (error) {
      handleFailedError();
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
   * 브라우저가 알림을 구독할 수 있는 상태인지 확인하고 처리합니다.
   */
  const checkSubscribable = async (
    serviceWorker: ServiceWorkerRegistration
  ): Promise<void> => {
    showToast({
      title: `권한 ${Notification.permission}`,
      status: 'info',
      duration: 2000,
    });
    switch (Notification.permission) {
      // 이미 브라우저 알림 권한 동의되어있는 상태
      case 'granted':
        showToast({
          title: 'case: granted',
          status: 'info',
          duration: 2000,
        });
        await handleSubscription(serviceWorker);
        break;

      // 권한 요청에 대한 사용자의 결정이 알려지지 않은 상태 (app의 경우 denied와 같은 상태로 여겨지기 때문에 먼저 선언하지 않으면 denied 처리되서 권한 요청이 안 되는 이슈 발생)
      // case 'default':
      //   requestPermission(serviceWorker);
      //   break;

      // 브라우저 알림 권한이 거절되었거나
      case 'denied':
        showToast({
          title: 'case: denied',
          status: 'info',
          duration: 2000,
        });
        showPermissionRequiredToast();
        setIsChecked(false);
        break;

      default:
        showToast({
          title: 'default',
          status: 'info',
          duration: 2000,
        });
        requestPermission(serviceWorker);
        break;
    }
  };

  /**
   * 서버에서 구독을 삭제하고 응답을 처리합니다.
   *
   * @param {PushSubscription} subscription - 구독 객체입니다.
   * @param {ServiceWorkerRegistration} serviceWorker - 서비스 워커 등록 객체입니다.
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
            handleFailedError();
          }
        },
      });
    }
  };

  /**
   * 푸시 알림을 구독 해제하고 응답을 처리합니다.
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
   * 브라우저가 Service worker API와 Notification API를 지원하는지 확인합니다.
   * 모바일의 경우 PWA 앱을 설치하지 않고 알림 활성화가 불가능합니다.
   * @returns {Promise<boolean>}
   */
  const isSupported = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      showToast({
        title: (
          <p className="whitespace-pre">
            {`해당 브라우저는 알림 기능을 지원하지 않아요🥲\n다른 브라우저에서 다시 시도해 주세요.\n모바일은 알림을 위해 App 설치가 필요합니다.`}
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
        // 알림 비활성화
        const serviceWorker = await navigator.serviceWorker.getRegistration(); // 기존 서비스워커

        if (serviceWorker) {
          await handleUnsubscribe(serviceWorker);
        } else {
          setIsChecked(!newChecked);
        }
      } else {
        // 알림 활성화
        await navigator.serviceWorker.register('/sw.js'); // 새 서비스워커 등록
        const serviceWorker = await navigator.serviceWorker.ready; // 서비스 워커가 활성화될 때까지 대기

        // 서비스워커가 페이지를 제어하고 있는지 확인
        if (navigator.serviceWorker.controller) {
          await checkSubscribable(serviceWorker);
        } else {
          // 제어하고 있지 않으면 controllerchange 이벤트 리스너 등록 -> 서비스워커가 페이지 제어할 수 있는 상태 되는 것을 기다림
          navigator.serviceWorker.addEventListener(
            'controllerchange',
            async () => {
              // 이벤트 발생 시 푸시 구독 처리
              if (
                serviceWorker.active?.state === 'activated' ||
                serviceWorker.active?.state === 'activating'
              )
                await checkSubscribable(serviceWorker);
            }
          );
        }
      }
    } catch (error) {
      handleFailedError();
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
          className="font-semibold text-gray-800"
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

export default NotReadNotificationHandler;
