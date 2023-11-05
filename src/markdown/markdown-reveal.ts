import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealMath from 'reveal.js/plugin/math/math';
// @ts-ignore
import RevealMermaid from 'reveal.js-mermaid-plugin/plugin/mermaid/mermaid';

export async function startReveal() {
  await Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    slideNumber: true,
    hash: true,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, RevealMath, RevealMermaid],
  });
}
