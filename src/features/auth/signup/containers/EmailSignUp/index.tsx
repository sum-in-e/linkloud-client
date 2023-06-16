'use client';

import EmailSignUpTermsWithAgree from '@/features/auth/signup/containers/EmailSignUp/EmailSignUpTermsWithAgree';
import EmailInputGroup from '@/features/auth/signup/containers/EmailSignUp/EmailInputGroup';
import PasswordInputGroup from '@/features/auth/signup/containers/EmailSignUp/PasswordInputGroup';
import NicknameInput from '@/features/auth/signup/containers/EmailSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/EmailSignUp/SignUpButton';

function EmailSignUpForm() {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <EmailInputGroup />
        <PasswordInputGroup />
        <NicknameInput />
      </div>
      <EmailSignUpTermsWithAgree />
      <SignUpButton />
    </section>
  );
}
export default EmailSignUpForm;
