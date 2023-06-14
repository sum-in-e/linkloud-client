import { useOpen } from '@/common/modules/hooks/useOpen';
import Loader from '@/features/signup/components/Loader';
import SignUpCompleteModal from '@/features/signup/containers/EmailSignUp/SignUpCompleteModal';
import { emailSignUpMutation } from '@/features/signup/modules/apiHooks/emailSignUpMutation';
import {
  useEmailState,
  useFormsValidationState,
  useNicknameState,
  usePasswordState,
} from '@/features/signup/modules/stores/signupStore';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SignUpButton() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onToggle } = useOpen();
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
    emailSignUpMutation();

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
      <button
        onClick={handleClickSignUp}
        disabled={!isActivateSignUp}
        className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-primary py-[0.6rem]  text-sm font-bold text-white hover:bg-primary-darker focus:outline-none disabled:bg-gray-400"
      >
        {isLoading ? <Loader /> : '가입 완료하기'}
      </button>
      {isOpen && <SignUpCompleteModal />}
    </>
  );
}

export default SignUpButton;
