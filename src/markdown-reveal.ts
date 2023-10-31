import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealMath from 'reveal.js/plugin/math/math';
import { allComponents, provideFluentDesignSystem } from '@fluentui/web-components';
import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';

provideFluentDesignSystem().register(allComponents);

async function tryReveal2() {
  const slides = document.querySelector('div.reveal') as HTMLDivElement;
  const f = document.querySelector('form#markdown-form') as HTMLFormElement;

  const startButton = f.querySelector('*[type=submit]') as HTMLButtonElement;
  startButton.textContent = 'Start';
  startButton.disabled = false;

  const textArea = f.querySelector('textarea[name=text]') as HTMLTextAreaElement;
  const fileInput = f.querySelector('input[name=file]') as HTMLInputElement;

  f.onsubmit = (ev) => {
    ev.preventDefault();
    f.remove();

    wait(0.1e3).then(() => {
      slides.hidden = false;
      tryReveal(textArea.value);
    });
  };
}

async function tryReveal(text: string) {
  const revealSlideSource = document.querySelector('script#reveal-slide-source') as HTMLScriptElement;
  revealSlideSource.textContent = text;
  await Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    hash: false,
    center: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealSearch, RevealMath],
  });
}

setTimeout(tryReveal2, 1000);
