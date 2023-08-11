'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsX } from 'react-icons/bs';

const LinkSearchForm = () => {
  const router = useRouter();

  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/link/search?keyword=${value}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2 rounded-full bg-zinc-100 px-2 py-3"
    >
      <input
        type="text"
        placeholder="제목이나 url로 저장한 링크를 검색해 보세요!"
        className="reset-input bg-transparent text-sm"
        onChange={handleChange}
        value={value}
      />
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-zinc-300 p-[2px] md:hidden"
        onClick={handleClear}
      >
        <BsX size={16} />
      </button>
    </form>
  );
};
export default LinkSearchForm;
