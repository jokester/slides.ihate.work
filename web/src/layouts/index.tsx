import Link from 'next/link';
import { Fragment, PropsWithChildren } from 'react';
import { Help, Info, PresentToAll, GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';
import { globalStyles } from './theme';
import clsx from 'clsx';

export function PageContainer(props: PropsWithChildren) {
  return <div className="container mx-auto min-h-screen flex flex-col px-2 lg:px-0">{props.children}</div>;
}

export function PageHeader() {
  return (
    <>
      <div className="flex justify-center items-baseline">
        <h1 className="text-lg sm:text-xl my-2 text-center">
          <Link href="/" className="text-blue-500">
            <PresentToAll /> &nbsp; slides.ihate.work
          </Link>
        </h1>
        &nbsp;&nbsp;
        <h2 className="text-xs sm:text-sm ">Present Markdown slides</h2>
      </div>
      <div className="flex justify-center my-1">
        <span className="flex-1" />
        <Link href="/about#revealjs-help">
          <Button size="small">
            <Help />
            Help
          </Button>
        </Link>
        <Link href="/about#works">
          <Button size="small">
            <Info />
            About
          </Button>
        </Link>
        <Link href="https://github.com/jokester/slides.ihate.work" target="_blank">
          <Button size="small">
            <GitHub />
            &nbsp;GitHub
          </Button>
        </Link>
      </div>
      <hr className="my-2" />
    </>
  );
}

export function CreditsFooter() {
  return (
    <footer className="px-4 mb-2 text-center">
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
          href="https://github.com/jokester/slides.ihate.work/blob/main/package-lock.json"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          dependency packages
        </a>
        .
      </p>
    </footer>
  );
}

export function MarkdownHelp() {
  return (
    <div className="my-4">
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
          ].map((v, i, array) => (
            <Fragment key={i}>
              <a className={clsx(globalStyles.linkText, 'ml-1')} href={v.href}>
                {v.title}
              </a>
              {i < array.length - 1 && ' / '}
            </Fragment>
          ))}
          . Please refer to these links for help.
        </li>
      </ul>
    </div>
  );
}
