import { create } from 'zustand';

interface EmailStateType {
  email: string;
  setEmail: (newState: string) => void;
}

export const useEmailState = create<EmailStateType>((set) => ({
  email: '',
  setEmail: (newEmail) => set({ email: newEmail }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface PasswordStateType {
  password: string;
  setPassword: (newState: string) => void;
}

export const usePasswordState = create<PasswordStateType>((set) => ({
  password: '',
  setPassword: (newPassword) => set({ password: newPassword }),
}));

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

interface PropertiesForSignup {
  isVerifiedEmail: boolean;
  isVerifiedPassword: boolean;
  isVerifiedNickname: boolean;
  isVerifiedTermsOfAgree: boolean;
}

interface FormsValidationStateType {
  formsValidationState: PropertiesForSignup;
  setFormsValidationState: (newState: PropertiesForSignup) => void;
}

export const useFormsValidationState = create<FormsValidationStateType>(
  (set) => ({
    formsValidationState: {
      isVerifiedEmail: false,
      isVerifiedPassword: false,
      isVerifiedNickname: false,
      isVerifiedTermsOfAgree: false,
    },
    setFormsValidationState: (newState) =>
      set({ formsValidationState: newState }),
  })
);
