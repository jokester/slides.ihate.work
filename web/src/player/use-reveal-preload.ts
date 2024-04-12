import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';

export function useRevealPreload() {
  useAsyncEffect(async () => {
    await import('./reveal-init');
  }, []);
}
