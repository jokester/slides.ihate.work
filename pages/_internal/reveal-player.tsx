import { useRouter } from 'next/router';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { useState } from 'react';
import { extractErrorMessage } from '../../src/utils';
import { RevealSlidePlayer } from '../../src/player/reveal-slide-player';

export default function RevealPlayerPage() {
  const router = useRouter();
  const [slideSrc, setSlideSrc] = useState('');
  const [error, setError] = useState('');

  useAsyncEffect(async () => {
    if (router.isReady) {
      const query = router.query as { url: string };
      try {
        const text = await fetch(query.url).then((res) => res.text());
        setSlideSrc(text);
      } catch (e: any) {
        console.error(e);
        setError(extractErrorMessage(e));
      }
    }
  }, [router, router.isReady]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (slideSrc) {
    return <RevealSlidePlayer src={slideSrc} />;
  }
  return null;
}
