'use client';

import AuthNavigationPrompt from '@/features/auth/common/components/AuthNavigationPrompt';
import TopLogo from '@/features/auth/common/components/TopLogo';
import KakaoButton from '@/features/auth/common/containers/KakaoButton';
import EmailLogInForm from '@/features/auth/login/containers/EmailLogIn';
import SignLayout from '@/features/auth/common/components/SignLayout';
import { useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const LogIn = () => {
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
          router.replace('/login');
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
      <KakaoButton type="login" />
      <hr className="w-full border-gray-300" />
      <EmailLogInForm />
      <AuthNavigationPrompt type="login" />
    </SignLayout>
  );
};

export default LogIn;
