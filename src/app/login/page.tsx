import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LogIn from '@/features/auth/login/containers';
import { redirect, notFound } from 'next/navigation';

export const metadata = {
  title: '링클라우드 | 로그인',
};

export default async function LoginPage() {
  if (process.env.NEXT_PUBLIC_MODE === 'production') {
    notFound()
  }
  
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/home');
  }

  return <LogIn />;
}
