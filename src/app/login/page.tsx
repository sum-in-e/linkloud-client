import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import LogIn from '@/features/auth/login/containers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud | 로그인',
  openGraph: {
    title: 'Linkloud | 로그인',
    description: LINKLOUD_SLOGAN,
    url: 'https://linkloud.co.kr/login',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg',
        alt: 'Linkloud Image',
      },
    ],
  },
};

export default async function LoginPage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/all');
  }

  return <LogIn />;
}
