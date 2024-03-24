import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5e3);
    return () => clearTimeout(timer);
  }, [router]);
  return <div>Page not found. You will be redirected to site root shortly.</div>;
}
