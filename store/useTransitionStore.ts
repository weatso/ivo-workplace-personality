import { create } from "zustand";

interface TransitionState {
  isTransitioning: boolean;
  callback: (() => void) | null;
  triggerTransition: (cb: () => void) => void;
  reset: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  isTransitioning: false,
  callback: null,
  triggerTransition: (cb) => set({ isTransitioning: true, callback: cb }),
  reset: () => set({ isTransitioning: false, callback: null }),
}));
