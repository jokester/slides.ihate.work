import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { SlideBundle } from '../core/SlideBundle';
import { useRevealPreload } from './use-reveal-preload';
import { useRef } from 'react';
import debug from 'debug';
import { SlideSource } from './reveal-slide-player';

const logger = debug('src:player:reveal-slide-preview');

export function RevealSlidePreview(props: { src: SlideBundle }) {
  const createReveal = useRevealPreload();

  const rootRef = useRef<HTMLDivElement>(null);

  useAsyncEffect(
    async (running) => {
      const { createReveal } = await import('./reveal-init');
      if (!(running.current && rootRef.current)) {
        return;
      }

      const f = await createReveal(rootRef.current, {
        embedded: true,
      });
      logger('created', f);
    },
    [props.src],
  );

  return (
    <div ref={rootRef}>
      <SlideSource slideText={props.src.slideText} />
    </div>
  );
}
