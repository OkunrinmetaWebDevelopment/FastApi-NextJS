import { useEffect, useRef } from 'react';

export default function MessageList({ messages }) {
  const messageEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {message.content}
          </div>
        </div>
      ))}
      {/* Scroll anchor */}
      <div ref={messageEndRef} />
    </div>
  );
}
