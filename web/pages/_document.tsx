import React, { cloneElement, memo, ReactElement } from 'react';
import { Html, Main, NextScript, Head } from 'next/document';
import { revealCodeThemes, revealThemes } from '../src/components/cdn_assets';

const stylesheetPreloads = [
  ...Object.entries(revealThemes).map(([key, value]) =>
    cloneElement(value, { key: `reveal-css-preload-${key}`, rel: 'prefetch', as: 'style', crossOrigin: 'anonymous' }),
  ),
  ...Object.entries(revealCodeThemes).map(([key, value]) =>
    cloneElement(value, {
      key: `reveal-code-css-preload-${key}`,
      rel: 'prefetch',
      as: 'style',
      crossOrigin: 'anonymous',
    }),
  ),
];

const defaultStyleSheets = [
  // <link key="font-material-icons" rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />,
] as const;

export default function CustomDocument(): React.ReactElement {
  return (
    <Html>
      <Head>
        <link
          key="font-roboto"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          crossOrigin="anonymous"
        />
        {stylesheetPreloads}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
