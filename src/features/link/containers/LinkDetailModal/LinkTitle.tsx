'use client';

import { ChangeEvent, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isEditMode: boolean;
}

const LinkTitle = ({ value, onChange, isEditMode }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      disabled={!isEditMode}
      value={value}
      placeholder="링크를 한눈에 알아볼 수 있는 제목을 입력해 보세요!(*)"
      onChange={handleChange}
      className={`reset-textarea text-md h-20 rounded-none border-b bg-inherit font-bold ${
        isEditMode ? 'border-zinc-300' : 'border-transparent'
      }`}
    />
  );
};
export default LinkTitle;
