'use client';

import EmailSignUpTermsWithAgree from '@/features/auth/signup/containers/EmailSignUp/EmailSignUpTermsWithAgree';
import EmailInputGroup from '@/features/auth/signup/containers/EmailSignUp/EmailInputGroup';
import PasswordInputGroup from '@/features/auth/signup/containers/EmailSignUp/PasswordInputGroup';
import NicknameInput from '@/features/auth/signup/containers/EmailSignUp/NicknameInput';
import SignUpButton from '@/features/auth/signup/containers/EmailSignUp/SignUpButton';
import { FormEvent } from 'react';

const EmailSignUpForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <EmailInputGroup />
          <PasswordInputGroup />
          <NicknameInput />
        </div>
        <EmailSignUpTermsWithAgree />
        <SignUpButton />
      </form>
    </section>
  );
};
export default EmailSignUpForm;
