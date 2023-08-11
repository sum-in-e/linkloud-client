'use client';

import LinkInfoLabel from '@/features/link/components/LinkInfoLabel';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isEditMode: boolean;
}

const LinkDescription = ({ value, onChange, isEditMode }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 초기화한다. (텍스트를 지울 경우 높이가 줄어들지 않는 이슈를 해결하기 위함)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="mt-2">
      <LinkInfoLabel htmlFor="link_description" title="설명" />
      <textarea
        id="link_description"
        ref={textareaRef}
        disabled={!isEditMode}
        value={value}
        placeholder="어떤 내용이 담긴 링크인가요?👀"
        onChange={handleChange}
        maxLength={500}
        className={`reset-textarea rounded-xl bg-zinc-100 px-3 py-2 text-sm`}
      />
    </div>
  );
};
export default LinkDescription;
