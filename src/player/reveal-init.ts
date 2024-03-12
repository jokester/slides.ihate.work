import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import { MathJax3 } from 'reveal.js/plugin/math/math';
// @ts-ignore
import RevealMermaid from 'reveal.js-mermaid-plugin/plugin/mermaid/mermaid';

export async function startReveal(): Promise<Reveal.Api> {
  // mermaid plugin expects this
  (window as any).Reveal ??= Reveal;
  await Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    slideNumber: true,
    hash: true,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, MathJax3, RevealMermaid],
  });
  return Reveal;
}
