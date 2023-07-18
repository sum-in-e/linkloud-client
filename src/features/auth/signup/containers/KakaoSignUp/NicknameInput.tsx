'use client';
import { isValidNickname } from '@/common/modules/utils/validation';
import { useNicknameState } from '@/features/auth/signup/modules/stores/signupStore';
import NicknameForm from '@/features/auth/common/containers/NicknameForm';
import { useEffect } from 'react';

const NicknameInput = () => {
  const { nickname, setNickname } = useNicknameState();

  const handleChangeNickname = (newNickname: string) => {
    setNickname(newNickname);
  };

  useEffect(() => {
    setNickname('');
  }, [setNickname]);

  return (
    <NicknameForm
      value={nickname}
      onChange={handleChangeNickname}
      isVerified={isValidNickname(nickname)}
    />
  );
};

export default NicknameInput;
