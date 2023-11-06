import { PropsWithChildren, useEffect } from 'preact/compat';
import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';

export interface MarkdownSlideProps {
  text: string;
}

export function MarkdownSlides(props: PropsWithChildren<MarkdownSlideProps>) {
  useEffect(() => {
    let running = true;

    wait(0.1e3).then(() => {
      if (!running) {
        return;
      }
      (window as any).__startReveal();
    });

    return () => {
      running = false;
    };
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
