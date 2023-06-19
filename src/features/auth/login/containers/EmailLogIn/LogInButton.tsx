import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { isValidEmail } from '@/common/modules/utils/validation';
import AuthCompleteButton from '@/features/auth/common/components/AuthCompleteButton';
import {
  useEmailState,
  usePasswordState,
} from '@/features/auth/common/modules/stores/authStore';
import { useEmailLogInMutation } from '@/features/auth/login/modules/apiHooks/useEmailLogInMutation';
import { useRouter } from 'next/navigation';

const LogInButton = () => {
  const toast = useToast();
  const router = useRouter();

  const { email } = useEmailState();
  const { password } = usePasswordState();

  const isValidatedEmail = isValidEmail(email);
  const isValidatedPassword = password.length >= 5;

  const isActivateButton = isValidatedEmail && isValidatedPassword;

  const { isSuccess, isError, error, isLoading, mutate } =
    useEmailLogInMutation();

  const handleClick = () => {
    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/my/all');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const err = error.response?.data;
      const errorMessage =
        err?.message || '로그인에 실패하였습니다. 다시 시도해 주세요.';

      toast({
        title: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError]);

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
