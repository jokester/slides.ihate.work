import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealMath from 'reveal.js/plugin/math/math';

async function tryReveal2() {
  const f = document.querySelector('form#markdown-form') as HTMLFormElement;

  (f.querySelector('button[type=submit]') as HTMLButtonElement).disabled = false;

  f.onsubmit = (ev) => {
    ev.preventDefault();
    console.debug(ev.target);
  };
}

async function tryReveal() {
  await Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, RevealMath],
  });
}

setTimeout(tryReveal, 1000);
