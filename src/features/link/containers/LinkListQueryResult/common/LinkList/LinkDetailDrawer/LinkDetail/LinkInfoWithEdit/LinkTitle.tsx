'use client';

interface Props {
  initValue: string;
  value: string;
  isEditMode: boolean;
  onChange: (value: string) => void;
}

const LinkTitle = ({ initValue, value, onChange, isEditMode }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <p className="text-sm font-bold text-gray-500">제목</p>
      {isEditMode ? (
        <input
          type="text"
          className="common-input w-full bg-slate-100 px-3 text-sm font-bold outline-none"
          placeholder={initValue}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <p className="text-sm font-bold">{initValue}</p>
      )}
    </div>
  );
};

export default LinkTitle;
