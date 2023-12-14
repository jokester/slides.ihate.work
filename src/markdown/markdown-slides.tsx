import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';
import { PropsWithChildren, useEffect } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';

export interface MarkdownSlideProps {
  text: string;
}

export function MarkdownSlides(props: PropsWithChildren<MarkdownSlideProps>) {
  useAsyncEffect(async (running, released) => {
    const { startReveal } = await import('./markdown-reveal');

    await wait(0.1e3);
    if (!running.current) {
      return;
    }
    await startReveal();
  }, []);
  const options = {
    'data-separator': '^\n---\n$',
    'data-separator-vertical': '^\n--\n$',
  };

  return (
    <div className="reveal">
      <div className="slides">
        <section data-markdown="" {...options}>
          <script type="text/template">{props.text}</script>
        </section>
      </div>
    </div>
  );
}
