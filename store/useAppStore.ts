import { create } from 'zustand';

export type Language = 'id' | 'en';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  language: 'id',
  setLanguage: (lang) => set({ language: lang }),
}));
