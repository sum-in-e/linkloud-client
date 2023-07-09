'use client';

interface Props {
  initValue: string;
  value: string;
  isEditMode: boolean;
  onChange: (value: string) => void;
}

const LinkDescription = ({ initValue, value, onChange, isEditMode }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <p className="text-sm font-bold text-gray-500">설명</p>
      {isEditMode ? (
        <textarea
          value={value}
          onChange={handleChange}
          className="w-full resize-none rounded-xl bg-slate-100 px-3 py-2 text-sm text-black outline-none"
          placeholder={initValue}
        />
      ) : (
        <p className="text-sm font-bold">
          {initValue === '' ? '설명이 없습니다.' : initValue}
        </p>
      )}
    </div>
  );
};

export default LinkDescription;
