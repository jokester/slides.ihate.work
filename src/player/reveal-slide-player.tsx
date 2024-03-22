import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import debug from 'debug';
import { SlideBundle } from '../core/SlideBundle';

const logger = debug('src:markdown:markdown-slides');

export interface MarkdownSlideProps {
  bundle: SlideBundle;
  onDestroy?(): void;
}

export function RevealSlidePlayer(props: PropsWithChildren<MarkdownSlideProps>) {
  const divRef = useRef<HTMLDivElement>(null!)
  useAsyncEffect(async (running, released) => {
    const { startReveal } = await import('./reveal-init');

    await wait(0.1e3);
    if (!running.current) { return; }
    const api = await startReveal(divRef.current!);
    logger('reveal initialized', api);
  }, []);
  const options = {
    'data-separator': '^\n---\n$',
    'data-separator-vertical': '^\n--\n$',
  };

  return (
    <div className="reveal" ref={divRef}>
      <div className="slides">
        <section data-markdown="" {...options}>
          <script type="text/template">{props.bundle.slideText}</script>
        </section>
      </div>
    </div>
  );
}
