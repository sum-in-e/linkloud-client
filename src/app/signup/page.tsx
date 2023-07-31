import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import { getSessionWithJwtInServer } from '@/common/modules/utils/session';
import SignUp from '@/features/auth/signup/containers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Linkloud | 회원가입',
  openGraph: {
    title: 'Linkloud | 회원가입',
    description: LINKLOUD_SLOGAN,
    url: 'https://linkloud.co.kr/signup',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dqcgvbbv7/image/upload/v1687269892/linkloud/emtygeehcgigfn9wlhw3.jpg',
        alt: 'Linkloud Image',
      },
    ],
  },
};

export default async function SignUpPage() {
  const isLogin = await getSessionWithJwtInServer();

  if (isLogin) {
    redirect('/link/all');
  }

  return <SignUp />;
}
