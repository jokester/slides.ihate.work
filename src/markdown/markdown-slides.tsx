import { PropsWithChildren, useEffect } from 'preact/compat';

export interface MarkdownSlideProps {
  text: string;
}

export function MarkdownSlides(props: PropsWithChildren<MarkdownSlideProps>) {
  useEffect(() => {
    let running = true;

    import('./markdown-reveal').then((m) => {
      if (!running) {
        return;
      }
      m.startReveal();
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
          <script type="text/template">
            {props.text}
          </script>
        </section>
      </div>
    </div>
  );
}
