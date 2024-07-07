import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import SignUp from '@/features/auth/signup/containers';
import { redirect, notFound } from 'next/navigation';

export const metadata = {
  title: '링클라우드 | 회원가입',
};

export default async function SignUpPage() {
  if (process.env.NEXT_PUBLIC_MODE === 'production') {
    notFound()
  }
  
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/home');
  }

  return <SignUp />;
}
