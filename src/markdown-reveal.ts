import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealMath from 'reveal.js/plugin/math/math';
// @ts-ignore
import RevealMermaid from 'reveal.js-mermaid-plugin/plugin/mermaid/mermaid';
import { allComponents, provideFluentDesignSystem } from '@fluentui/web-components';
import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';

provideFluentDesignSystem().register(allComponents);

const slides = document.querySelector('div.reveal') as HTMLDivElement;
const f = document.querySelector('form#markdown-form') as HTMLFormElement;

async function initControl() {
  const startButton = f.querySelector('*[type=submit]') as HTMLButtonElement;
  startButton.textContent = 'Start';
  startButton.disabled = false;

  const textArea = f.querySelector('textarea[name=text]') as HTMLTextAreaElement;
  const fileInput = f.querySelector('input[name=file]') as HTMLInputElement;

  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const file0 = fileInput.files?.[0];
    const slideSource = file0 ? await file0.text() : textArea.value;

    wait(0.1e3).then(() => {
      startReveal(slideSource);
    });
  };
}

async function DEBUG_example() {
  const md = await fetch('/example.md').then((r) => r.text());
  await startReveal(md);
}

async function startReveal(text: string) {
  f.remove();
  slides.hidden = false;
  const revealSlideSource = document.querySelector('script#reveal-slide-source') as HTMLScriptElement;
  revealSlideSource.textContent = text;
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

setTimeout(initControl);
