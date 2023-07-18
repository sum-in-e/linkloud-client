import InputFormContainer from '@/features/auth/common/components/InputFormContainer';
import { usePasswordState } from '@/features/auth/common/modules/stores/authStore';
import { ChangeEvent, useEffect } from 'react';

const PasswordInput = () => {
  const { password, setPassword } = usePasswordState();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const hasPassword = password.length > 0;
  const isValidatedPassword = password.length > 5;

  useEffect(() => {
    setPassword('');
  }, [setPassword]);

  return (
    <InputFormContainer label="비밀번호*">
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해 주세요."
        value={password}
        onChange={handleChange}
        className={`common-input border-[1px] ${
          hasPassword && !isValidatedPassword
            ? 'border-red-400'
            : isValidatedPassword
            ? 'border-emerald-600'
            : 'border-stone-200'
        } bg-white text-gray-800`}
      />
    </InputFormContainer>
  );
};

export default PasswordInput;
