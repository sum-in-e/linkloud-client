'use client';

import LinkInfoLabel from '@/features/link/components/LinkInfoLabel';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isEditMode: boolean;
}

const LinkMemo = ({ value, onChange, isEditMode }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="mt-2">
      <LinkInfoLabel htmlFor="link_memo" title="메모" />
      <textarea
        id="link_memo"
        ref={textareaRef}
        disabled={!isEditMode}
        value={value}
        placeholder="링크에 대한 기록을 남겨보세요."
        onChange={handleChange}
        maxLength={1000}
        className={`reset-textarea rounded-xl bg-zinc-100 px-3 py-2 text-sm`}
      />
    </div>
  );
};
export default LinkMemo;
