import { useOpen } from '@/common/modules/hooks/useOpen';
import SignUpCompleteButton from '@/features/auth/common/components/SignUpCompleteButton';
import SignUpCompleteModal from '@/features/auth/signup/containers/EmailSignUp/SignUpCompleteModal';
import { useEmailSignUpMutation } from '@/features/auth/signup/modules/apiHooks/useEmailSignUpMutation';
import {
  useEmailState,
  useFormsValidationState,
  useNicknameState,
  usePasswordState,
} from '@/features/auth/signup/modules/stores/signupStore';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

function SignUpButton() {
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
      isVerifiedTermsOfAgree,
    },
  } = useFormsValidationState();

  const isActivateSignUp =
    isVerifiedEmail &&
    isVerifiedPassword &&
    isVerifiedNickname &&
    isVerifiedTermsOfAgree;

  const { mutate, isSuccess, isError, error, isLoading } =
    useEmailSignUpMutation();

  const handleClickSignUp = () => {
    mutate({
      email,
      name: nickname,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onOpen();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const err = error.response?.data;
      const errorMessage =
        err?.message || '회원가입에 실패하였습니다. 다시 시도해 주세요.';

      toast({
        title: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError]);

  return (
    <>
      <SignUpCompleteButton
        onClick={handleClickSignUp}
        isDisabled={!isActivateSignUp}
        isLoading={isLoading}
      />
      {isOpen && <SignUpCompleteModal />}
    </>
  );
}

export default SignUpButton;
