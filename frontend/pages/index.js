import { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import { getAccessToken } from '../lib/auth';
import { useRouter } from 'next/router';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Redirecting to login...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Chat</h1>
      <Chat />
    </div>
  );
}
