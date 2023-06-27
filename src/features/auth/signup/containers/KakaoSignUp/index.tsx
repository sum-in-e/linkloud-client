'use client';

import SignLayout from '@/features/auth/common/components/SignLayout';
import KakaoSignUpTermsWithAgree from '@/features/auth/signup/containers/KakaoSignUp/KakaoSignUpTermsWithAgree';
import NicknameInput from '@/features/auth/signup/containers/KakaoSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/KakaoSignUp/SignUpButton';
import Image from 'next/image';

const KakaoSignUp = () => {
  return (
    <SignLayout>
      <h1 className="text-xl font-semibold">회원가입을 위한 추가 정보 입력</h1>
      <NicknameInput />
      <KakaoSignUpTermsWithAgree />
      <SignUpButton />
    </SignLayout>
  );
};

export default KakaoSignUp;
