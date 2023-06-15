'use client';

import TermsWithAgreeGroup from '@/features/auth/signup/containers/TermsWithAgreeGroup';
import EmailInputGroup from '@/features/auth/signup/containers/EmailSignUp/EmailInputGroup';
import PasswordInputGroup from '@/features/auth/signup/containers/EmailSignUp/PasswordInputGroup';
import NicknameInput from '@/features/auth/signup/containers/EmailSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/EmailSignUp/SignUpButton';

function EmailSignUp() {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <EmailInputGroup />
        <PasswordInputGroup />
        <NicknameInput />
      </div>
      <TermsWithAgreeGroup />
      <SignUpButton />
    </section>
  );
}
export default EmailSignUp;
