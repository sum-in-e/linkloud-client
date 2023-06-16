'use client';

import SignLayout from '@/features/auth/signup/components/SignLayout';
import KakaoSignUpTermsWithAgree from '@/features/auth/signup/containers/KakaoSignUp/KakaoSignUpTermsWithAgree';
import NicknameInput from '@/features/auth/signup/containers/KakaoSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/KakaoSignUp/SignUpButton';

const KakaoSignUp = () => {
  return (
    <SignLayout>
      <img
        src="https://res.cloudinary.com/dqcgvbbv7/image/upload/v1686554950/linkloud/logo_v_avimgi.png"
        className="w-[120px]"
      />
      <h1 className="text-lg font-semibold">회원가입을 위한 추가 정보 입력</h1>
      <NicknameInput />
      <KakaoSignUpTermsWithAgree />
      <SignUpButton />
    </SignLayout>
  );
};

export default KakaoSignUp;
