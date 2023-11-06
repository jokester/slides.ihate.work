import { useState } from 'preact/compat';
import { MarkdownForm } from '../markdown/markdown-form';
import { MarkdownSlides } from '../markdown/markdown-slides';

function PageHeader() {
  return (
    <>
      <h1 className="text-xl my-2 text-center">slides.ihate.work</h1>
      <h2 className="text-lg my-1 text-center">A site to present Markdown slides</h2>
      <hr className="my-4" />
      <p class="text-lg">Starting a presentation is as simple like</p>
    </>
  );
}

function PageFooter() {
  return (
    <footer className="w-full p-4">
      <p>
        This site is powered by{' '}
        <a className="underline" href="https://github.com/honojs/hono">
          🔥Hono
        </a>
        {', '}
        <a className="underline" href="https://revealjs.com/">
          reveal.js
        </a>
        {', '}
        and many more open source packages.
      </p>
      <p>
        If this site appeases you, please consider buying a beer for the great authors of the {' '}
        <a
          href="https://github.com/jokester/slides.ihate.work/blob/main/package.json"
          target="_blank"
          className="underline"
        >
          dependency packages
        </a>.
      </p>
      <ul className="space-x-4 px-8 my-3">
        <a className="underline" href="https://github.com/jokester/slides.ihate.work">
          Github
        </a>
        {/* <a className="underline" href="/about"> About </a> */}
      </ul>
    </footer>
  );
}

export function MarkdownPage() {
  const [text, setText] = useState('');

  if (!text) {
    return (
      <div className="container mx-auto px-2 py-4 flex flex-col min-h-screen">
        <PageHeader />
        <MarkdownForm onStart={setText} />
        <div className="flex-grow flex-shrink-0" />
        <PageFooter />
      </div>
    );
  }

  return (
    <>
      <MarkdownSlides text={text} />
    </>
  );
}
