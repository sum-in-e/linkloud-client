'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const SearchHandler = () => {
  const router = useRouter();

  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.length === 0) router.push(`/kloud/all`);
    if (value.length > 0) router.push(`/kloud/all?keyword=${value}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목이나 url로 저장한 링크를 검색해 보세요!"
        className="common-input bg-slate-100"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchHandler;
