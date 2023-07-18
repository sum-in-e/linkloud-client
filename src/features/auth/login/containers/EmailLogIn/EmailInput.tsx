import { isValidEmail } from '@/common/modules/utils/validation';
import InputFormContainer from '@/features/auth/common/components/InputFormContainer';
import { useEmailState } from '@/features/auth/common/modules/stores/authStore';
import { ChangeEvent, useEffect } from 'react';

const EmailInput = () => {
  const { email, setEmail } = useEmailState();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const hasEmail = email.length > 0;
  const isValidatedEmail = isValidEmail(email);

  useEffect(() => {
    setEmail('');
  }, [setEmail]);

  return (
    <InputFormContainer label="이메일*">
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="이메일을 입력해 주세요."
        value={email}
        onChange={handleChange}
        className={`common-input border-[1px] ${
          hasEmail && !isValidatedEmail
            ? 'border-red-400'
            : isValidatedEmail
            ? 'border-emerald-600'
            : 'border-stone-200'
        } bg-white text-gray-800`}
      />
    </InputFormContainer>
  );
};

export default EmailInput;
