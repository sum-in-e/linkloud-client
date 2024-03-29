'use client';
import { isValidNickname } from '@/common/modules/utils/validation';
import {
  useFormsValidationState,
  useNicknameState,
} from '@/features/auth/signup/modules/stores/signupStore';
import NicknameForm from '@/features/auth/common/containers/NicknameForm';
import { useEffect } from 'react';

const NicknameInput = () => {
  const { nickname, setNickname } = useNicknameState();

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const handleChangeNicknameValidationStatus = (newNickname: string) => {
    const isValid = isValidNickname(newNickname);
    if (formsValidationState.isVerifiedNickname !== isValid) {
      setFormsValidationState({
        isVerifiedNickname: isValid,
      });
    }
  };

  const handleChangeNickname = (newNickname: string) => {
    setNickname(newNickname);
    handleChangeNicknameValidationStatus(newNickname);
  };

  useEffect(() => {
    setNickname('');
  }, [setNickname]);

  return (
    <NicknameForm
      value={nickname}
      onChange={handleChangeNickname}
      isVerified={formsValidationState.isVerifiedNickname}
    />
  );
};

export default NicknameInput;
