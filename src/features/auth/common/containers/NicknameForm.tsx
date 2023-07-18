'use client';
import { ChangeEvent } from 'react';
import InputContainer from '@/features/auth/common/components/InputFormContainer';

interface Props {
  value: string;
  onChange: (newNickname: string) => void;
  isVerified: boolean;
}

const NicknameForm = ({ value, onChange, isVerified }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    onChange(newNickname);
  };

  const hasNickname = value.length > 0;

  return (
    <InputContainer label="닉네임*">
      <input
        type="text"
        name="name"
        value={value}
        onChange={handleChange}
        placeholder="닉네임을 입력해 주세요.(2~15자)"
        className={`common-input border-[1px] bg-white text-gray-800  ${
          hasNickname && !isVerified
            ? 'border-red-400'
            : isVerified
            ? 'border-emerald-600'
            : 'border-stone-200'
        }`}
      />
    </InputContainer>
  );
};

export default NicknameForm;
