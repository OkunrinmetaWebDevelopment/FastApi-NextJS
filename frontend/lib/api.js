// lib/api.js
import axios from 'axios';
import { getAccessToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for request and response
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiry or other auth issues
    if (error.response?.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
      // Optionally, you can trigger token refresh logic here
      // For example: refreshToken();
    }
    return Promise.reject(error);
  }
);

export const sendMessage = async (message, conversationHistory) => {
  try {
    const response = await api.post('/llm2/chat/', {
      user_question: message,
      conversation_history: conversationHistory,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
};

export const saveConversationHistory = async (conversationHistory) => {
  try {
    const response = await api.post('/llm2/conversation_history/', {
      conversation_history: conversationHistory,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving conversation history:', error.response?.data || error.message);
    throw error;
  }
};
