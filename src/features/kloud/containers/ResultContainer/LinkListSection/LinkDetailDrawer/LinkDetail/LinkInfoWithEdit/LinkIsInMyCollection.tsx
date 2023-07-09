'use client';

import Checkbox from '@/features/auth/signup/components/Checkbox';

interface Props {
  initValue: boolean;
  value: boolean;
  isEditMode: boolean;
  onChange: () => void;
}

const LinkIsInMyCollection = ({
  initValue,
  value,
  onChange,
  isEditMode,
}: Props) => {
  const handleChange = () => {
    onChange();
  };

  return (
    <div>
      {isEditMode ? (
        <Checkbox
          checked={value}
          label="내 컬렉션에 저장"
          onChange={handleChange}
          value="내 컬렉션 등록"
        />
      ) : (
        <p className="text-sm font-bold">
          {initValue
            ? '내 컬렉션으로 등록된 링크입니다.'
            : '내 컬렉션으로 등록되지 않은 링크입니다.'}
        </p>
      )}
    </div>
  );
};

export default LinkIsInMyCollection;
