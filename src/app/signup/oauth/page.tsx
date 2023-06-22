import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import KakaoSignUp from '@/features/auth/signup/containers/KakaoSignUp';

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
        alt: 'Linkloud image',
      },
    ],
  },
};

const KakaoSignUpOauthPage = () => {
  return <KakaoSignUp />;
};
export default KakaoSignUpOauthPage;
