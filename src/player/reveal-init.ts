import Reveal, { PluginFunction } from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import { KaTeX } from 'reveal.js/plugin/math/math';
import debug from 'debug';
const logger = debug('src:player:reveal-init');
import { lazyThenable } from '@jokester/ts-commonutil/lib/concurrency/lazy-thenable';

const MermaidP: PromiseLike<import('mermaid').Mermaid> = lazyThenable(async () => {
  const { default: Mermaid } = await import('mermaid');
  Mermaid.initialize({ startOnLoad: false });
  logger('mermaid loaded');
  return Mermaid;
});

/**
 * stolen from
 * with maybe smaller bundle size
 * and workaround of next.js hot reload
 */
const MermaidPlugin: PluginFunction = () => ({
  id: 'mermaid-in-house',
  init(deck: Reveal.Api) {
    const renderNodes = () =>
      MermaidP.then((Mermaid) => {
        const nodes = Array.from(deck.getRevealElement()?.querySelectorAll('.mermaid') || []);
        nodes.forEach((n) => {
          if (n.firstElementChild instanceof SVGElement) {
            return;
          }
          const code = n.textContent?.trim() || '';
          logger('rendering mermaid', n, code);
          Mermaid.render(`mermaid-${Math.random().toString(36).slice(2, 10)}`, code)
            .then((renderResult) => (n.innerHTML = renderResult.svg))
            .catch((e) => {
              logger('mermaid render error', e, n, code);
            });
        });
        logger('mermaid nodes', nodes);
      });
    deck.on('ready', renderNodes);
    deck.on('slidechanged', renderNodes);
  },
});

export async function createReveal(elem: HTMLElement, options?: Reveal.Options): Promise<Reveal.Api> {
  // math / mermaid plugin expects this
  // (window as any).Reveal ??= Reveal;
  const f = new Reveal(elem, {
    // embedded: false,
    controls: true,
    progress: true,
    history: false,
    slideNumber: true,
    hash: false,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, KaTeX, MermaidPlugin],
    ...options,
  });
  // f.sync()
  // f.next()
  return f;
}
