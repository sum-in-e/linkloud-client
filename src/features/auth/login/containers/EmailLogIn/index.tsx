import EmailInput from '@/features/auth/login/containers/EmailLogIn/EmailInput';
import LogInButton from '@/features/auth/login/containers/EmailLogIn/LogInButton';
import PasswordInput from '@/features/auth/login/containers/EmailLogIn/PasswordInput';

const EmailLogInForm = () => {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <EmailInput />
        <PasswordInput />
      </div>
      <LogInButton />
    </section>
  );
};

export default EmailLogInForm;
