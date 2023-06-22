'use client';

import TermsWithAgreeForm from '@/features/auth/common/containers/TermsWithAgreeForm';
import { useKakaoFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';

const KakaoSignUpTermsWithAgree = () => {
  const { setFormsValidationState } = useKakaoFormsValidationState();

  const handleChangeValidationState = (value: boolean) => {
    setFormsValidationState({
      isVerifiedTermsOfAgree: value,
    });
  };

  return (
    <TermsWithAgreeForm onChangeValidation={handleChangeValidationState} />
  );
};

export default KakaoSignUpTermsWithAgree;
