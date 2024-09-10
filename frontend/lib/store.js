import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (messages) => set({ messages }),
      getConversationHistory: () => get().messages,
      clearMessages: () => set({ messages: [] }), // Add clear functionality
    }),
    {
      name: 'chat-messages', // name of the key in localStorage
      getStorage: () => localStorage, // defaults to localStorage
    }
  )
);
