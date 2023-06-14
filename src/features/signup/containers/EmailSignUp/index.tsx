'use client';

import TermsWithAgreeGroup from '@/features/signup/containers/TermsWithAgreeGroup';
import EmailInputGroup from '@/features/signup/containers/EmailSignUp/EmailInputGroup';
import PasswordInputGroup from '@/features/signup/containers/EmailSignUp/PasswordInputGroup';
import NicknameInput from '@/features/signup/containers/EmailSignUp/NicknameInput';
import SignUpButton from '@/features/signup/containers/EmailSignUp/SignUpButton';

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
