'use client';
import { isValidNickname } from '@/common/modules/utils/validation';
import {
  useFormsValidationState,
  useNicknameState,
} from '@/features/auth/signup/modules/stores/signupStore';
import NicknameForm from '@/features/auth/common/containers/NicknameForm';

function NicknameInput() {
  const { nickname, setNickname } = useNicknameState();

  const { formsValidationState, setFormsValidationState } =
    useFormsValidationState();

  const handleChangeNicknameValidationStatus = (newNickname: string) => {
    const isValid = isValidNickname(newNickname);
    if (formsValidationState.isVerifiedNickname !== isValid) {
      setFormsValidationState({
        ...formsValidationState,
        isVerifiedNickname: isValid,
      });
    }
  };

  const handleChangeNickname = (newNickname: string) => {
    setNickname(newNickname);
    handleChangeNicknameValidationStatus(newNickname);
  };

  return (
    <NicknameForm
      value={nickname}
      onChange={handleChangeNickname}
      isVerified={formsValidationState.isVerifiedNickname}
    />
  );
}

export default NicknameInput;

