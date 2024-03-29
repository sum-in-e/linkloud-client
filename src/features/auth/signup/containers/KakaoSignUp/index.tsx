'use client';

import SignLayout from '@/features/auth/common/components/SignLayout';
import TermsWithAgreeText from '@/features/auth/signup/components/TermsWithAgreeText';
import NicknameInput from '@/features/auth/signup/containers/KakaoSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/KakaoSignUp/SignUpButton';

const KakaoSignUp = () => {
  return (
    <SignLayout>
      <h2 className="text-xl font-semibold">회원가입을 위한 추가 정보 입력</h2>
      <NicknameInput />
      <TermsWithAgreeText />
      <SignUpButton />
    </SignLayout>
  );
};

export default KakaoSignUp;
