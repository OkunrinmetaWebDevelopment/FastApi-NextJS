import create from 'zustand';

export const useStore = create((set, get) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  getConversationHistory: () => get().messages,
}));