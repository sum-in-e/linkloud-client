import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import ActionSection from '@/features/randing/ActionSection';
import FeatureSection from '@/features/randing/FeatureSection';
import IntroSection from '@/features/randing/IntroSection';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud',
};

export default async function HomePage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/all');
  }

  return (
    <div className="mb-20 mt-10 flex w-full flex-col items-center justify-center gap-20">
      <IntroSection />
      <FeatureSection />
      <ActionSection />
    </div>
  );
}
