import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { SlideBundle } from '../core/SlideBundle';
import { useRevealPreload } from './use-reveal-preload';
import { useRef } from 'react';

export function RevealSlidePreview(props: { src: SlideBundle }) {
  const createReveal = useRevealPreload();

  const rootRef = useRef<HTMLDivElement>(null);

  useAsyncEffect(
    async (running) => {
      const { createReveal } = await import('./reveal-init');
      if (!(running.current && rootRef.current)) {
        return;
      }

      createReveal(rootRef.current, {
        embedded: true,
      });
    },
    [props.src],
  );

  return <div ref={rootRef}></div>;
}
