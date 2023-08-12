import { LinkAnalyzeData } from '@/features/link/modules/apis/link';
import { create } from 'zustand';

interface LinkDataType extends LinkAnalyzeData {
  kloud: null | {
    id: number;
    name: string;
  };
}

interface LinkStateType {
  link: LinkDataType;
  setLink: (newState: Partial<LinkDataType>) => void;
  resetLink: () => void;
}

const initialLink = {
  url: '',
  title: '',
  description: '',
  thumbnailUrl: '',
  kloud: null,
};

export const useLinkState = create<LinkStateType>((set) => ({
  link: initialLink,
  setLink: (newState) =>
    set((prev) => {
      return {
        link: {
          ...prev.link,
          ...newState,
        },
      };
    }),
  resetLink: () =>
    set({
      link: initialLink,
    }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface ShowLinkEditorStateType {
  isShowLinkEditor: boolean;
  setIsShowLinkEditor: (newState: boolean) => void;
}

export const useShowLinkEditorState = create<ShowLinkEditorStateType>(
  (set) => ({
    isShowLinkEditor: false,
    setIsShowLinkEditor: (newState) => set({ isShowLinkEditor: newState }),
  })
);

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface ShowKloudSelectorStateType {
  isShowKloudSelector: boolean;
  setIsShowKloudSelector: (newState: boolean) => void;
}

export const useShowKloudSelectorState = create<ShowKloudSelectorStateType>(
  (set) => ({
    isShowKloudSelector: false,
    setIsShowKloudSelector: (newState) =>
      set({ isShowKloudSelector: newState }),
  })
);
