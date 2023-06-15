'use client';

import TermsWithAgreeForm from '@/features/auth/common/containers/TermsWithAgreeForm';
import { useKakaoFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';

function KakaoSignUpTermsWithAgree() {
  const { formsValidationState, setFormsValidationState } =
    useKakaoFormsValidationState();

  const handleChangeValidationState = (value: boolean) => {
    setFormsValidationState({
      ...formsValidationState,
      isVerifiedTermsOfAgree: value,
    });
  };

  return (
    <TermsWithAgreeForm onChangeValidation={handleChangeValidationState} />
  );
}

export default KakaoSignUpTermsWithAgree;
