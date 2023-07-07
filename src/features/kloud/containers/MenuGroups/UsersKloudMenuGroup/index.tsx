'use client';

import { useState } from 'react';
import CreateKloudForm from '@/features/kloud/containers/MenuGroups/UsersKloudMenuGroup/CreateKloudForm';
import { FaPlus } from 'react-icons/fa';
import KloudMenuList from '@/features/kloud/containers/MenuGroups/UsersKloudMenuGroup/KloudMenuList';

const KloudMenuGroup = () => {
  const [isShowKloudInput, setIsShowKloudInput] = useState(false);

  const handleClickShowInput = () => {
    setIsShowKloudInput((prev) => !prev);
  };

  const handleCloseCreateForm = () => {
    setIsShowKloudInput(false);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-600">클라우드</p>
        <button
          className="rounded-full bg-blue-100 p-2"
          onClick={handleClickShowInput}
        >
          <FaPlus size={12} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {isShowKloudInput && (
          <CreateKloudForm onClose={handleCloseCreateForm} />
        )}
        <KloudMenuList />
      </div>
    </div>
  );
};

export default KloudMenuGroup;
