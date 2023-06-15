'use client';
import SignLayout from '@/features/auth/signup/components/SignLayout';
import EmailSignUpForms from '@/features/auth/signup/containers/EmailSignUp';
import KakaoButton from '@/features/auth/common/containers/KakaoButton';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import TopLogo from '@/features/auth/common/components/TopLogo';

function SignUp() {
  const toast = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get('error');

  useEffect(() => {
    if (error) {
      const title = `${error}`;

      toast({
        title,
        status: 'error',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          router.replace('/signup');
        },
      });
    }
  }, [error]);

  return (
    <SignLayout>
      <TopLogo />
      <KakaoButton type="signup" />
      <hr className="w-full border-gray-300" />
      <EmailSignUpForms />
      <section className="flex w-full justify-center gap-2">
        <p className="text-xs text-gray-500">이미 회원이신가요?</p>
        <Link href="/login" className="text-xs font-bold">
          로그인하러 가기
        </Link>
      </section>
    </SignLayout>
  );
}

export default SignUp;
