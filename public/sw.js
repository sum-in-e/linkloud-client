/**
 * @description 서비스워커에서 발생하는 푸시 이벤트를 수신한다.(서버에서 푸시 이벤트 보내도록 구현)
 * self는 서비스워커를 참조한다.
 */
self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log(data);
  const title = data.title || '흥미로운 링크를 담아두셨네요?👀';
  const options = {
    body: data.description || '저장한 글을 읽고 더 성장한 나를 만나보세요!', // 푸시 알림 본문
    icon: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg', // 푸시 알림에 표시될 아이콘
    badge:
      'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg', // 푸시 알림 배지 이미지 / android에서만 보인다.
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

/**
 * @description push notification 클릭 시 동작 정의
 */
self.addEventListener('notificationclick', (event) => {
  // 알림창 닫기
  event.notification.close();

  if (event.action === 'show-unread-action') {
    // 지금 확인하기 버튼 클릭 시 미열람 페이지로 이동
    event.waitUntil(clients.openWindow('https://linkloud.co.kr/kloud/unread'));
  }

  // 알림 클릭 시 발생할 기본 액션도 정의 가능
});
