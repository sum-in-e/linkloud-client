'use client';

import KloudSelector from '@/features/kloud/containers/KloudSelector';
import { useKloudIdState } from '@/features/link/modules/stores/createLinkStore';
import { useEffect } from 'react';

const KloudHandler = () => {
  const { kloudId, setKloudId, resetKloudId } = useKloudIdState();

  const handleChange = (newKloudId: number | null) => {
    setKloudId(newKloudId);
  };

  useEffect(() => {
    resetKloudId(); // 전역상태인 KloudId 리셋
  }, [resetKloudId]);

  return (
    <div className="mt-2 w-full">
      <KloudSelector kloudId={kloudId} onChange={handleChange} />
    </div>
  );
};

export default KloudHandler;
