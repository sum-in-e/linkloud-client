import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { isValidEmail } from '@/common/modules/utils/validation';
import AuthCompleteButton from '@/features/auth/common/components/AuthCompleteButton';
import {
  useEmailState,
  usePasswordState,
} from '@/features/auth/common/modules/stores/authStore';
import { useEmailLogInMutation } from '@/features/auth/login/modules/apiHooks/useEmailLogInMutation';
import { useRouter, useSearchParams } from 'next/navigation';

const LogInButton = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const returnUrl = params.get('return_to');

  const { email } = useEmailState();
  const { password } = usePasswordState();

  const isValidatedEmail = isValidEmail(email);
  const isValidatedPassword = password.length >= 5;

  const isActivateButton = isValidatedEmail && isValidatedPassword;

  const { isLoading, mutate } = useEmailLogInMutation();

  const handleClick = () => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const path = returnUrl || '/kloud';

          router.push(path);
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '로그인에 실패하였습니다. 다시 시도해 주세요.';

            toast({
              title: message,
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  return (
    <AuthCompleteButton
      type="login"
      isDisabled={!isActivateButton}
      isLoading={isLoading}
      onClick={handleClick}
    />
  );
};

export default LogInButton;
