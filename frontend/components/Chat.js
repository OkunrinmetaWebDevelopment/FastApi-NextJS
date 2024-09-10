import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import InputForm from './InputForm';
import { sendMessage, saveConversationHistory } from '../lib/api';
import { useStore } from '../lib/store';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage, setMessages, getConversationHistory } = useStore();

  useEffect(() => {
    setMessages(getConversationHistory());
  }, [setMessages, getConversationHistory]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input, getConversationHistory());

      if (response && response.content) {
        addMessage({ role: 'assistant', content: response.content });
      } else {
        addMessage({ role: 'system', content: 'Invalid server response.' });
      }

      await saveConversationHistory(getConversationHistory());
    } catch (error) {
      addMessage({ role: 'system', content: 'Error processing message.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
