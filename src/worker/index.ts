/// <reference lib="webworker" />

// eslint-disable-next-line no-undef
export declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  // 대기 중인 서비스 워커를 강제로 활성화
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('push', (event) => {
  const data = event.data?.json();
  const title = data.title || '흥미로운 링크를 담아두셨네요?👀';
  const options = {
    body: data.description || '저장한 글을 읽고 더 성장한 나를 만나보세요!', // 푸시 알림 본문
    icon: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1686571366/linkloud/logo_200_rxrkca.png', // 푸시 알림에 표시될 아이콘
    badge:
      'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1686571366/linkloud/logo_200_rxrkca.png', // 푸시 알림 배지 이미지 / android에서만 보인다.
    tag: 'unread-notification',
    actions: [
      {
        action: 'show-unread-action',
        title: '지금 보러가기',
      },
    ],
    requireInteraction: true, // chrome과 같이 충분히 큰 창에서 사용자가 직접 닫을 때까지 알림 사라지지 않음
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  // 버튼 클릭이 아닌 알림 자체 클릭시 실행할 동작
  if (!event.action) {
    event.waitUntil(
      self.clients.openWindow('https://linkloud.co.kr/kloud/unread')
    );
  }

  if (event.action === 'show-unread-action') {
    // 지금 확인하기 버튼 클릭 시 미열람 페이지로 이동
    event.waitUntil(
      self.clients.openWindow('https://linkloud.co.kr/kloud/unread')
    );
  }

  // 알림창 닫기
  event.notification.close();
});
