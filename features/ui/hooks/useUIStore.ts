import { create } from "zustand";

interface UIState {
  isStarted: boolean;
  setStarted: (started: boolean) => void;
}

/**
 * Global state for the landing experience.
 */
export const useUIStore = create<UIState>((set) => ({
  isStarted: false,
  setStarted: (started: boolean) => set({ isStarted: started }),
}));
