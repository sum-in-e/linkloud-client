'use client';

import { useFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';
import TermsWithAgreeForm from '@/features/auth/common/containers/TermsWithAgreeForm';

const EmailSignUpTermsWithAgree = () => {
  const { setFormsValidationState } = useFormsValidationState();

  const handleChangeValidationState = (value: boolean) => {
    setFormsValidationState({
      isVerifiedTermsOfAgree: value,
    });
  };

  return (
    <TermsWithAgreeForm onChangeValidation={handleChangeValidationState} />
  );
};

export default EmailSignUpTermsWithAgree;
