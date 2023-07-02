import { useOpen } from '@/common/modules/hooks/useOpen';
import AuthCompleteButton from '@/features/auth/common/components/AuthCompleteButton';
import SignUpCompleteModal from '@/features/auth/signup/containers/EmailSignUp/SignUpCompleteModal';
import { useKakaoSignUpMutation } from '@/features/auth/signup/modules/apiHooks/useKakaoSignUpMutation';
import {
  useKakaoFormsValidationState,
  useNicknameState,
} from '@/features/auth/signup/modules/stores/signupStore';
import { useToast } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

const SignUpButton = () => {
  const toast = useToast();
  const params = useSearchParams();
  const sign = params.get('sign');
  const { isOpen, onOpen } = useOpen();

  const { nickname: name } = useNicknameState();
  const {
    formsValidationState: { isVerifiedNickname, isVerifiedTermsOfAgree },
  } = useKakaoFormsValidationState();

  const isActivateButton = isVerifiedNickname && isVerifiedTermsOfAgree;

  const { mutate, isLoading } = useKakaoSignUpMutation();

  const handleClick = () => {
    if (sign)
      mutate(
        { sign, name },
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
      <AuthCompleteButton
        onClick={handleClick}
        isDisabled={!isActivateButton}
        isLoading={isLoading}
        type="signup"
      />
      {isOpen && <SignUpCompleteModal />}
    </>
  );
};

export default SignUpButton;
