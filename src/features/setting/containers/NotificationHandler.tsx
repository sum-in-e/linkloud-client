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
  }: {
    title: ReactNode;
    status: AlertStatus;
  }) => {
    return toast({
      title,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

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
        }
      },
      onError: (error) => {
        if (error.status === 404) {
          // 서버에 구독 정보가 등록되지 않은 브라우저 -> 서버에 구독 정보 저장
          saveSubscription({ subscription, subscriptionInfo });
        }
      },
    });
  };

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

  const checkSubscribable = async (
    serviceWorker: ServiceWorkerRegistration
  ): Promise<void> => {
    // * 권한 확인
    if (Notification.permission === 'granted') {
      // * 이미 브라우저 알림 권한 동의되어있는 상태 -> 푸쉬 구독 진행
      console.log('granted');

      handleSubscription(serviceWorker);
    } else if (Notification.permission === 'denied') {
      // * 이미 브라우저 알림 권한이 거절되어있는 상태 -> 권한 허용해야 알림 발송 가능하다고 안내
      showToast({
        title: (
          <p className="whitespace-pre">
            {`브라우저 알림이 차단된 상태입니다🥲\n[브라우저 설정] - [개인 정보 보호 및 보안] - [사이트 설정] -\n[linkloud.co.kr]을 눌러 알림을 "허용"으로 변경후 다시 시도해 주세요!`}
          </p>
        ),
        status: 'info',
      });
      setIsChecked(false);
    } else {
      // * 권한 요청을 받아본적이 없는 상태 -> 알림 권한 요청부터 진행
      console.log('nothing');

      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        // 알림 권한 거절
        showToast({
          title: (
            <p className="whitespace-pre">
              {/* // TODO: 이거 브라우저별로 안내해주는 곳으로 보내자 */}
              {`알림 권한을 허용하지 않으셨습니다🥲\n 이후 알림 받기를 원하신다면 [브라우저 설정] - [개인 정보 보호 및 보안] - [사이트 설정] - [linkloud.co.kr]을 눌러 알림을 "허용"으로 변경후 다시 시도해 주세요!`}
            </p>
          ),
          status: 'info',
        });
        setIsChecked(false);
        return;
      }

      // 알림 권한 수락
      handleSubscription(serviceWorker);
    }
  };

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
                  {`서버 에러로 인해 알림 비활성화에 실패하였습니다.\n잠시후 다시 시도해 주세요.`}
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

  const getServiceWorker =
    async (): Promise<ServiceWorkerRegistration | null> => {
      // Returns existing service worker or register new one.
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        return registration;
      }
      return await navigator.serviceWorker.register('/sw.js');
    };

  const isServiceWorkerSupported = async (): Promise<boolean> => {
    // * 서비스워커 지원하는지 확인
    if (!('serviceWorker' in navigator)) {
      showToast({
        title: (
          <p className="whitespace-pre">
            {`해당 브라우저는 알림 기능을 지원하지 않아요🥲\n다른 브라우저에서 다시 시도해 주세요.\n(Chrome, Firefox, Safari 등)`}
          </p>
        ),
        status: 'info',
      });
      return false;
    }

    return true;
  };

  const handleSwitch = async (event: ChangeEvent<HTMLInputElement>) => {
    const prevChecked = isChecked;
    const newChecked = event.target.checked;
    setIsChecked(newChecked);

    if (!(await isServiceWorkerSupported())) {
      setIsChecked(prevChecked);
      return;
    }

    let serviceWorker;

    try {
      serviceWorker = await getServiceWorker();
    } catch (error) {
      handleServiceWorkerError(prevChecked);
      return;
    }

    if (!serviceWorker) {
      handleServiceWorkerError(prevChecked);
      return;
    }

    if (!newChecked) {
      // 알림 비활성화하는 경우
      console.log('비활성화');
      await handleUnsubscribe(serviceWorker);
      return;
    }

    // 알림 활성화하는 경우
    await checkSubscribable(serviceWorker);
  };

  useEffect(() => {
    // 알림 구독 여부 체크
    navigator.serviceWorker.ready.then((serviceWorker) => {
      serviceWorker.pushManager.getSubscription().then((subscription) => {
        console.log(subscription);
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
        <label htmlFor="notification-handler" className="text-lg font-bold">
          알림 활성화
        </label>
        <Switch
          id="notification-handler"
          size="md"
          isChecked={isChecked}
          onChange={handleSwitch}
        />
      </form>
      <p className="whitespace-pre text-sm">{`확인하지 않은 링크가 10개 이상일 경우 알림을 보내드려요.\n저장한 글을 읽고 더 성장한 나를 만나보세요!`}</p>
      <p className="whitespace-pre text-xs text-gray-500">{`알림은 기기 혹은 브라우저별로 등록됩니다.\n이전에 기기에서 알림 활성화를 했더라도\n다른 기기로 접속 시 알림이 비활성화 되어있을 수 있습니다!`}</p>
      <p className="whitespace-pre text-sm text-gray-500">{`✅window, mac에서 브라우저 자체 알림 기능 활성화 필요 안내`}</p>
      <p className="whitespace-pre text-sm text-gray-500">{`✅알림 권한을 수락해주세요! 브라우저별 안내`}</p>
    </div>
  );
};

export default NotificationHandler;
