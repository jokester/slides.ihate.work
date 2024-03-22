import type Reveal from 'reveal.js'
import { SlideBundle } from '../core/SlideBundle';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';

/**
 * A JS API for parent document to control (reveal.js instance inside iframe)
 */
export interface RevealController {

    init(options: Reveal.Options, bundle: SlideBundle): void
    updateOptions(options: Reveal.Options)
    updateSrc(b: SlideBundle)
    destroy(): void



}
  const defaultOptions = {
    'data-separator': '^\n---\n$',
    'data-separator-vertical': '^\n--\n$',
  };

export function ReactPlayer2(props: {options: Reveal.Options, bundle: SlideBundle}) {
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