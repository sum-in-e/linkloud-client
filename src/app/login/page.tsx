import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithJWT } from '@/common/modules/utils/session';
import LogIn from '@/features/auth/login/containers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud | 로그인',
  description: LINKLOUD_SLOGAN,
};

export default async function LoginPage() {
  const isLogin = await getSessionWithJWT();

  if (isLogin) {
    redirect('/my/all');
  }

  return <LogIn />;
}
