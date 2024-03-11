import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';
import { PropsWithChildren, useEffect } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import debug from 'debug';

const logger = debug('src:markdown:markdown-slides');

export interface MarkdownSlideProps {
  src: string;
  onDestroy?(): void;
}

export function RevealSlidePlayer(props: PropsWithChildren<MarkdownSlideProps>) {
  useAsyncEffect(async (running, released) => {
    const { startReveal } = await import('./reveal-init');

    await wait(0.1e3);
    if (!running.current) {
      return;
    }
    const api = await startReveal();
    logger('reveal initialized', api);
  }, []);
  const options = {
    'data-separator': '^\n---\n$',
    'data-separator-vertical': '^\n--\n$',
  };

  return (
    <div className="reveal">
      <div className="slides">
        <section data-markdown="" {...options}>
          <script type="text/template">{props.src}</script>
        </section>
      </div>
    </div>
  );
}
