import { useOpen } from '@/common/modules/hooks/useOpen';
import SignUpCompleteButton from '@/features/auth/common/components/SignUpCompleteButton';
import SignUpCompleteModal from '@/features/auth/signup/containers/EmailSignUp/SignUpCompleteModal';
import { useKakaoSignUpMutation } from '@/features/auth/signup/modules/apiHooks/useKakaoSignUpMutation';
import {
  useKakaoFormsValidationState,
  useKakaoNicknameState,
} from '@/features/auth/signup/modules/stores/signupStore';
import { useToast } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SignUpButton = () => {
  const toast = useToast();
  const params = useSearchParams();
  const sign = params.get('sign');
  const { isOpen, onOpen } = useOpen();

  const { nickname: name } = useKakaoNicknameState();
  const {
    formsValidationState: { isVerifiedNickname, isVerifiedTermsOfAgree },
  } = useKakaoFormsValidationState();

  const isActivateSignUp = isVerifiedNickname && isVerifiedTermsOfAgree;

  const { mutate, isSuccess, isError, error, isLoading } =
    useKakaoSignUpMutation();

  const handleClick = () => {
    if (sign) mutate({ sign, name });
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
        onClick={handleClick}
        isDisabled={!isActivateSignUp}
        isLoading={isLoading}
      />
      {isOpen && <SignUpCompleteModal />}
    </>
  );
};

export default SignUpButton;
