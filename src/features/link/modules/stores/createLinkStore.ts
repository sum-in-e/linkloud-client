import { LinkAnalyzeData } from '@/features/link/modules/apis/link';
import { create } from 'zustand';

interface LinkStateType {
  link: LinkAnalyzeData;
  setLink: (newState: LinkAnalyzeData) => void;
  resetLink: () => void;
}

const initialLink = {
  url: '',
  title: '',
  description: '',
  thumbnailUrl: '',
};

export const useLinkState = create<LinkStateType>((set) => ({
  link: initialLink,
  setLink: (newLink) =>
    set({
      link: newLink,
    }),
  resetLink: () =>
    set({
      link: initialLink,
    }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface KloudIdStateType {
  kloudId: number | null;
  setKloudId: (newState: number | null) => void;
  resetKloudId: () => void;
}

export const useKloudIdState = create<KloudIdStateType>((set) => ({
  kloudId: null,
  setKloudId: (newKloudId) =>
    set({
      kloudId: newKloudId,
    }),
  resetKloudId: () => set({ kloudId: null }),
}));
