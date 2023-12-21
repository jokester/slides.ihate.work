// @ts-ignore
import Reveal from 'reveal.js';
// @ts-ignore
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// @ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// @ts-ignore
import RevealSearch from 'reveal.js/plugin/search/search';
// @ts-ignore
import RevealMath from 'reveal.js/plugin/math/math';
// @ts-ignore
import RevealMermaid from 'reveal.js-mermaid-plugin/plugin/mermaid/mermaid';

export async function startReveal() {
  // mermaid plugin expects this
  (window as any).Reveal ??= Reveal;
  await Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    slideNumber: true,
    hash: true,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, RevealMath.MathJax3, RevealMermaid],
  });
}
