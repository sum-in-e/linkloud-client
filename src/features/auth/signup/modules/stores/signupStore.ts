import { create } from 'zustand';

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface NicknameStateType {
  nickname: string;
  setNickname: (newState: string) => void;
}

export const useNicknameState = create<NicknameStateType>((set) => ({
  nickname: '',
  setNickname: (newNickname) => set({ nickname: newNickname }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

export interface PropertiesForSignup {
  isVerifiedEmail: boolean;
  isVerifiedPassword: boolean;
  isVerifiedNickname: boolean;
}

interface FormsValidationStateType {
  formsValidationState: PropertiesForSignup;
  setFormsValidationState: (newState: Partial<PropertiesForSignup>) => void;
}

export const useFormsValidationState = create<FormsValidationStateType>(
  (set) => ({
    formsValidationState: {
      isVerifiedEmail: false,
      isVerifiedPassword: false,
      isVerifiedNickname: false,
    },
    setFormsValidationState: (newState) =>
      set((prev) => {
        return {
          formsValidationState: {
            ...prev.formsValidationState,
            ...newState,
          },
        };
      }),
  })
);
