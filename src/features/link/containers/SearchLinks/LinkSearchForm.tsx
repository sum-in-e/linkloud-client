'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

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
export default LinkSearchForm;
