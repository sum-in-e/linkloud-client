'use client';

import KloudSelector from '@/features/kloud/containers/KloudSelector';
import { KloudEntity } from '@/features/kloud/modules/types/kloudType';
import { LinkInfoKloudType } from '@/features/link/modules/apis/link';

interface Props {
  initKloud: LinkInfoKloudType;
  value: number | null;
  isEditMode: boolean;
  onChange: (newKloudId: number | null, newKloudName: string) => void;
}

const LinksKloud = ({ initKloud, value, isEditMode, onChange }: Props) => {
  return (
    <div>
      <p className="text-sm font-bold text-gray-500">클라우드</p>
      {isEditMode ? (
        <KloudSelector kloudId={value} onChange={onChange} />
      ) : (
        <p className="text-sm font-bold">
          {initKloud === null ? '미분류' : initKloud.name}
        </p>
      )}
    </div>
  );
};

export default LinksKloud;
