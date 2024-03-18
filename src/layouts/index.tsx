import { Fragment } from 'react';

export function PageHeader() {
  return (
    <>
      <h1 className="text-xl my-2 text-center">slides.ihate.work</h1>
      <h2 className="text-lg my-1 text-center">A site to present Markdown slides</h2>
      <hr className="my-4" />
    </>
  );
}

export function PageFooter() {
  return (
    <footer className="px-4 text-center">
      <p>
        This site is powered by
        <a className="underline mx-1" href="https://revealjs.com/">
          reveal.js
        </a>
        and many more open source packages.
      </p>
      <p>
        If this site appeased you, please consider buying a beer for the great authors of the{' '}
        <a
          href="https://github.com/jokester/slides.ihate.work/blob/main/package.json"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          dependency packages
        </a>
        .
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

export function MarkdownHelp() {
  return (
    <div className="my-4 px-4">
      <ul>
        <li>
          Your Markdown slides are presented with
          {[
            {
              title: 'reveal.js',
              href: 'https://revealjs.com/',
            },
            {
              title: 'Markdown plugin',
              href: 'https://revealjs.com/plugins/#built-in-plugins',
            },
            {
              title: 'Math.KaTeX plugin',
              href: 'https://revealjs.com/math/',
            },
            {
              title: 'Code Highlight plugin',
              href: 'https://revealjs.com/plugins/#built-in-plugins',
            },
            {
              title: 'Search plugin',
              href: 'https://revealjs.com/plugins/#built-in-plugins',
            },
            {
              title: 'Mermaid plugin',
              href: 'https://github.com/zjffun/reveal.js-mermaid-plugin',
            },
          ].map((v, i) => (
            <Fragment key={i}>
              <a className="underline ml-1" href={v.href}>
                {v.title}
              </a>
            </Fragment>
          ))}
          . Please refer to these links for help.
        </li>
      </ul>
    </div>
  );
}
