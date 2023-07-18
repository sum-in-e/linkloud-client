import { useOpen } from '@/common/modules/hooks/useOpen';
import AuthUpCompleteButton from '@/features/auth/common/components/AuthCompleteButton';
import {
  useEmailState,
  usePasswordState,
} from '@/features/auth/common/modules/stores/authStore';
import SignUpCompleteModal from '@/features/auth/signup/containers/EmailSignUp/SignUpCompleteModal';
import { useEmailSignUpMutation } from '@/features/auth/signup/modules/apiHooks/useEmailSignUpMutation';
import {
  useFormsValidationState,
  useNicknameState,
} from '@/features/auth/signup/modules/stores/signupStore';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const SignUpButton = () => {
  const { isOpen, onOpen } = useOpen();
  const toast = useToast();

  const { email } = useEmailState();
  const { password } = usePasswordState();
  const { nickname } = useNicknameState();

  const {
    formsValidationState: {
      isVerifiedEmail,
      isVerifiedNickname,
      isVerifiedPassword,
    },
  } = useFormsValidationState();

  const isActivateButton =
    isVerifiedEmail && isVerifiedPassword && isVerifiedNickname;

  const { mutate, isLoading } = useEmailSignUpMutation();

  const handleClickSignUp = () => {
    mutate(
      {
        email,
        name: nickname,
        password,
      },
      {
        onSuccess: (data) => {
          onOpen();
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '회원가입에 실패하였습니다. 다시 시도해 주세요.';

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
    <>
      <AuthUpCompleteButton
        onClick={handleClickSignUp}
        isDisabled={!isActivateButton}
        isLoading={isLoading}
        type="signup"
      />
      {isOpen && <SignUpCompleteModal />}
    </>
  );
};

export default SignUpButton;
