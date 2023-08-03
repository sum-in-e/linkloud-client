'use client';

import CreateKloudForm from '@/features/kloud/containers/KloudSelector/CreateKloudForm';
import KloudList from '@/features/kloud/containers/KloudSelector/KloudList';

interface Props {
  kloudId: number | null;
  onChange: (kloudId: number | null, kloudName: string) => void;
  onClose: () => void;
}

const KloudSelector = ({ kloudId, onChange, onClose }: Props) => {
  const handleSelect = (id: number | null, name: string) => {
    onChange(id, name);
    onClose();
  };

  return (
    <div className="flex flex-col gap-5 px-3 pb-5 md:px-5">
      <CreateKloudForm onSelect={handleSelect} />
      <KloudList kloudId={kloudId} onSelect={handleSelect} />
    </div>
  );
};

export default KloudSelector;
