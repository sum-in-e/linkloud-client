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
    if (password.length > 0) {
      setPassword('');
    }
  }, []);

  return (
    <InputFormContainer label="비밀번호*">
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해 주세요."
        value={password}
        onChange={handleChange}
        className={`w-full rounded-2xl border-[1px] ${
          hasPassword && !isValidatedPassword
            ? 'border-red-400'
            : isValidatedPassword
            ? 'border-emerald-600'
            : 'border-stone-100'
        } bg-stone-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none`}
      />
    </InputFormContainer>
  );
};

export default PasswordInput;
