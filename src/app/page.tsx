import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import TopSection from '@/features/randing/TopSection';
import PointSection from '@/features/randing/PointSection';

export default async function HomePage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/all');
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-center">
        <TopSection />
        <PointSection />
      </div>
    </div>
  );
}
