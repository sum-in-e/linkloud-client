import NotReadNotificationHandler from '@/features/my/containers/Notification/NotReadNotificationHandler';

const NotificationArea = () => {
  return (
    <section>
      <p className="mb-5 font-bold">알림 설정</p>
      <NotReadNotificationHandler />
    </section>
  );
};

export default NotificationArea;
