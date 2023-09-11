import UncheckedNotificationHandler from '@/features/Notification/UncheckedNotificationHandler';

const NotificationArea = () => {
  return (
    <section>
      <p className="mb-5 font-bold">알림 설정</p>
      <UncheckedNotificationHandler />
    </section>
  );
};

export default NotificationArea;
