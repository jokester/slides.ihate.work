import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { createReveal } from './reveal-init';
import { useState } from 'react';

export function useRevealPreload(): null | typeof createReveal {
  const [f, setF] = useState<null | typeof createReveal>(null);
  useAsyncEffect(async (running) => {
    setF(null);
    const { createReveal } = await import('./reveal-init');
    if (running.current) {
      setF(createReveal);
    }
  }, []);
  return f;
}
