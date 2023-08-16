import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import { redirect } from 'next/navigation';
import TopSection from '@/features/randing/TopSection';
import IntroSection from '@/features/randing/IntroSection';
import PointSection from '@/features/randing/PointSection';

export default async function HomePage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    // redirect('/link/all');
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-center">
        <TopSection />
        {isLogin && <h2 className="text-3xl">쿠키에 토큰이 남아있다</h2>}
        <IntroSection />
        <PointSection />
      </div>
    </div>
  );
}
