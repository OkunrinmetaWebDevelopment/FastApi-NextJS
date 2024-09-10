import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAccessToken } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
