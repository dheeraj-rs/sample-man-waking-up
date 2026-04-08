import { create } from "zustand";

interface ChatState {
  currentMessage: string;
  isTyping: boolean;
  questStatus: "idle" | "delivering" | "completed";
  messages: string[];
  messageIndex: number;
  nextMessage: () => void;
  setMessage: (msg: string) => void;
}

const DEFAULT_MESSAGES = [
  "Hey! Welcome to Dheeraj's World.",
  "I'm a Full-stack Developer building immersive 3D experiences.",
  "You can use WASD or Arrow keys to walk around this low-poly island.",
  "Go ahead, explore the docks and the city!",
];

/**
 * Global state for the messenger UI and storytelling.
 */
export const useChatStore = create<ChatState>((set) => ({
  currentMessage: DEFAULT_MESSAGES[0],
  isTyping: false,
  questStatus: "idle",
  messages: DEFAULT_MESSAGES,
  messageIndex: 0,
  nextMessage: () =>
    set((state) => {
      const nextIndex = (state.messageIndex + 1) % state.messages.length;
      return {
        messageIndex: nextIndex,
        currentMessage: state.messages[nextIndex],
      };
    }),
  setMessage: (msg: string) => set({ currentMessage: msg }),
}));
