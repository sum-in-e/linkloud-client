'use client';

import EmailInput from '@/features/auth/login/containers/EmailLogIn/EmailInput';
import LogInButton from '@/features/auth/login/containers/EmailLogIn/LogInButton';
import PasswordInput from '@/features/auth/login/containers/EmailLogIn/PasswordInput';
import { FormEvent } from 'react';

const EmailLogInForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // 키보드 닫기
    }
  };

  return (
    <section className="flex w-full">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <EmailInput />
          <PasswordInput />
        </div>
        <LogInButton />
      </form>
    </section>
  );
};

export default EmailLogInForm;
