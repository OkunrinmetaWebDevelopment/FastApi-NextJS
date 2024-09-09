import axios from 'axios';
import { getAccessToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const sendMessage = async (message, conversationHistory) => {
  const response = await api.post('/llm2/chat/', {
    user_question: message,
    conversation_history: conversationHistory,
  });
  return response.data;
};

export const saveConversationHistory = async (conversationHistory) => {
  const response = await api.post('/llm2/conversation_history/', {
    conversation_history: conversationHistory,
  });
  return response.data;
};
