'use client';

import { useFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';
import TermsWithAgreeForm from '@/features/auth/common/containers/TermsWithAgreeForm';

const EmailSignUpTermsWithAgree = () => {
  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const handleChangeValidationState = (value: boolean) => {
    setFormsValidationState({
      ...formsValidationState,
      isVerifiedTermsOfAgree: value,
    });
  };

  return (
    <TermsWithAgreeForm onChangeValidation={handleChangeValidationState} />
  );
};

export default EmailSignUpTermsWithAgree;
