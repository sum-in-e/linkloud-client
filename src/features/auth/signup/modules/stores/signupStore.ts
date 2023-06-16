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

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️
// 카카오 회원가입용 가입을 위한 폼 유효성 검사 상태 관리
interface PropertiesForKakaoSignup {
  isVerifiedNickname: boolean;
  isVerifiedTermsOfAgree: boolean;
}

interface KakaoFormsValidationStateType {
  formsValidationState: PropertiesForKakaoSignup;
  setFormsValidationState: (newState: PropertiesForKakaoSignup) => void;
}

export const useKakaoFormsValidationState =
  create<KakaoFormsValidationStateType>((set) => ({
    formsValidationState: {
      isVerifiedNickname: false,
      isVerifiedTermsOfAgree: false,
    },
    setFormsValidationState: (newState) =>
      set({ formsValidationState: newState }),
  }));
