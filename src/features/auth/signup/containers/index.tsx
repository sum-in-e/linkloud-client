'use client';
import SignLayout from '@/features/auth/common/components/SignLayout';
import EmailSignUpForm from '@/features/auth/signup/containers/EmailSignUp';
import KakaoButton from '@/features/auth/common/containers/KakaoButton';
import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import TopLogo from '@/features/auth/common/components/TopLogo';
import AuthNavigationPrompt from '@/features/auth/common/components/AuthNavigationPrompt';

const SignUp = () => {
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

  useEffect(() => {
    const isLoggedIn = Cookies.get('client_in') === 'true';
    if (isLoggedIn) {
      router.push('/mykloud');
    }
  }, []);

  return (
    <SignLayout>
      <TopLogo />
      <KakaoButton type="signup" />
      <hr className="w-full border-gray-300" />
      <EmailSignUpForm />
      <AuthNavigationPrompt type="signup" />
    </SignLayout>
  );
};

export default SignUp;
