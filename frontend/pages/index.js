import { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import { getAccessToken } from '../lib/auth';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to access the chat.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Chat</h1>
      <Chat />
    </div>
  );
}
