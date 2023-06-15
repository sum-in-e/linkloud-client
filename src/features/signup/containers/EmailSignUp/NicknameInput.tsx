'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import { isValidNickname } from '@/common/modules/utils/validation';
import InputContainer from '@/features/signup/components/InputContainer';
import {
  useFormsValidationState,
  useNicknameState,
} from '@/features/signup/modules/stores/signupStore';

function NicknameInput() {
  const { nickname, setNickname } = useNicknameState();
  const [isVerifiedNickname, setIsVerifiedNickname] = useState(false);

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const handleChangeNicknameVerificationStatus = (newNickname: string) => {
    const isValid = isValidNickname(newNickname);
    if (isVerifiedNickname !== isValid) {
      setIsVerifiedNickname(isValid);
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedNickname: isValid,
      });
    }
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
    handleChangeNicknameVerificationStatus(newNickname);
  };

  const hasNickname = nickname.length > 0;

  return (
    <InputContainer label="닉네임*">
      <input
        type="text"
        name="name"
        value={nickname}
        onChange={handleChangeNickname}
        placeholder="닉네임을 입력해 주세요.(2~15자)"
        className={`w-full rounded-2xl border-[1px] bg-stone-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none ${
          hasNickname && !isVerifiedNickname
            ? 'border-red-400'
            : isVerifiedNickname
            ? 'border-emerald-600'
            : 'border-stone-100'
        }`}
      />
    </InputContainer>
  );
}

export default NicknameInput;
