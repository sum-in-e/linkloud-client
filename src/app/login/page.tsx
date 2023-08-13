import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LogIn from '@/features/auth/login/containers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud | 로그인',
};

export default async function LoginPage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/all');
  }

  return <LogIn />;
}
