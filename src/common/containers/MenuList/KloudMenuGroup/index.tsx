'use client';

import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import KloudMenuList from '@/common/containers/MenuList/KloudMenuGroup/KloudMenuList';

interface Props {
  kloudList: [] | KloudListKloudType[];
}

const KloudMenuGroup = ({ kloudList }: Props) => {
  const [isShowKloudInput, setIsShowKloudInput] = useState(false);

  const handleClickShowInput = () => {
    setIsShowKloudInput((prev) => !prev);
  };

  const handleCloseCreateForm = () => {
    setIsShowKloudInput(false);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-3">
        <p className="text-sm font-bold text-gray-600">클라우드</p>
        <button
          className="flex items-center justify-center rounded-full bg-primary p-2 hover:bg-primary-lighter"
          onClick={handleClickShowInput}
        >
          <FaPlus size={12} className="fill-white" />
        </button>
      </div>
      {/* 클라우드 리스트 */}
      <div className="flex flex-col gap-2">
        <KloudMenuList />
      </div>
    </div>
  );
};
export default KloudMenuGroup;
