import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithJWT } from '@/common/modules/utils/session';
import SignUp from '@/features/auth/signup/containers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud | 회원가입',
  description: LINKLOUD_SLOGAN,
};

export default async function SignUpPage() {
  const isLogin = await getSessionWithJWT();

  if (isLogin) {
    redirect('/my');
  }

  return <SignUp />;
}
