import { useState, useEffect } from 'react';
import { useChat } from 'ai';
import MessageList from './MessageList';
import InputForm from './InputForm';
import { sendMessage, saveConversationHistory } from '../lib/api';
import { useStore } from '../lib/store';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const { addMessage, setMessages, getConversationHistory } = useStore();

  useEffect(() => {
    // Load conversation history from store when component mounts
    setMessages(getConversationHistory());
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    addMessage(userMessage);

    try {
      const response = await sendMessage(input, getConversationHistory());
      const aiMessage = { role: 'assistant', content: response };
      addMessage(aiMessage);

      // Save conversation history to backend
      await saveConversationHistory(getConversationHistory());
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ role: 'system', content: 'An error occurred while processing your message.' });
    }

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
