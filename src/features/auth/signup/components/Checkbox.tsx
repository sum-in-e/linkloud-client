'use client';

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

interface Props {
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ value, label, checked, onChange }: Props) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label htmlFor={value} className="flex cursor-pointer items-center gap-1">
        {checked ? (
          <ImCheckboxChecked className="h-4 w-4 fill-gray-700" />
        ) : (
          <ImCheckboxUnchecked className="h-4 w-4 fill-gray-500" />
        )}
        <p className="text-sm text-gray-900">{label}</p>
      </label>
    </div>
  );
};

export default Checkbox;
