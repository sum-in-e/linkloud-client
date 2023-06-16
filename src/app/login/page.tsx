import { LINKLOUD_SLOGAN } from '@/common/modules/constants/brand';
import LogIn from '@/features/auth/login/containers';

export const metadata = {
  title: 'Linkloud | 로그인',
  description: LINKLOUD_SLOGAN,
};

export default function LoginPage() {
  return <LogIn />;
}
