import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import MoreFeatureSection from '@/features/landing/container/MoreFeatureSection';
import PointSection from '@/features/landing/container/PointSection';
import TopSection from '@/features/landing/container/TopSection';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/home');
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <TopSection />
      <PointSection />
      <MoreFeatureSection />
    </div>
  );
}
