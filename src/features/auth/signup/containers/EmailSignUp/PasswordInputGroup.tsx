'use client';
import { isValidPassword } from '@/common/modules/utils/validation';
import InputContainer from '@/features/auth/common/components/InputFormContainer';
import { usePasswordState } from '@/features/auth/common/modules/stores/authStore';
import { useFormsValidationState } from '@/features/auth/signup/modules/stores/signupStore';
import { ChangeEvent, useEffect, useState } from 'react';

const PasswordInputGroup = () => {
  const { password, setPassword } = usePasswordState();
  const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const hasPassword = password.length > 0;
  const hasConfirmPassword = confirmPassword.length > 0;

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const handleMatchStatus = (currentPw: string, currentConfirmPw: string) => {
    const isMatchCurrentPw = currentPw === currentConfirmPw;
    const isValid = isValidPassword(currentPw);
    const areBothNotEmpty = currentPw.length > 0 && currentConfirmPw.length > 0;

    setIsMatch(isMatchCurrentPw);

    if (
      isMatchCurrentPw &&
      isValid &&
      areBothNotEmpty &&
      !formsValidationState.isVerifiedPassword
    ) {
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedPassword: true,
      });
    }

    if (formsValidationState.isVerifiedPassword) {
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedPassword: false,
      });
    }
  };

  const handleUpdatePasswordVerificationStatus = (newPassword: string) => {
    const isValid = isValidPassword(newPassword);
    setIsVerifiedPassword(isValid);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;

    setPassword(newPassword);
    handleUpdatePasswordVerificationStatus(newPassword);
    handleMatchStatus(newPassword, confirmPassword);
  };

  const handleChangeConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;

    setConfirmPassword(newConfirmPassword);
    handleMatchStatus(password, newConfirmPassword);
  };

  useEffect(() => {
    if (password.length > 0) {
      setPassword('');
    }
    if (confirmPassword.length > 0) {
      setConfirmPassword('');
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <InputContainer label="비밀번호*">
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="영어, 숫자, 특수문자를 모두 포함하는 8~15자"
          value={password}
          onChange={handleChangePassword}
          className={`w-full rounded-2xl border-[1px] ${
            hasPassword && !isVerifiedPassword
              ? 'border-red-400'
              : isVerifiedPassword
              ? 'border-emerald-600'
              : 'border-stone-100'
          } bg-stone-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none`}
        />
      </InputContainer>
      <InputContainer label="비밀번호 확인*">
        <input
          type="password"
          name="confirm password"
          autoComplete="new-password"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          className={`w-full rounded-2xl border-[1px] ${
            hasConfirmPassword && !isMatch
              ? 'border-red-400'
              : hasConfirmPassword && isMatch
              ? 'border-emerald-600'
              : 'border-stone-100'
          } bg-stone-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none`}
        />
      </InputContainer>
    </div>
  );
};

export default PasswordInputGroup;
