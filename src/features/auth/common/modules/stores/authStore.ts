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
