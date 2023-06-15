import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import SignUp from '@/features/auth/signup/containers';

export const metadata = {
  title: 'Linkloud | 회원가입',
  description: LINKLOUD_SLOGAN,
};

export default function SignUpPage() {
  return <SignUp />;
}
