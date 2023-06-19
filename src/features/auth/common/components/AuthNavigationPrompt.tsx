import { AuthMethodType } from '@/features/auth/common/modules/types/auth';
import Link from 'next/link';

interface Props {
  type: AuthMethodType;
}

const AuthNavigationPrompt = ({ type }: Props) => {
  const isLogIn = type === 'login';
  const href = isLogIn ? '/signup' : '/login';
  const text = isLogIn ? '아직 회원이 아니신가요?' : '이미 회원이신가요?';
  const linkText = isLogIn ? '회원가입하러 가기' : '로그인하러 가기';

  return (
    <section className="flex w-full justify-center gap-2">
      <p className="text-xs text-gray-500">{text}</p>
      <Link href={href} prefetch={false} className="text-xs font-bold">
        {linkText}
      </Link>
    </section>
  );
};

export default AuthNavigationPrompt;
