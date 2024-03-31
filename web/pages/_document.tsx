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

export default function CustomDocument(): React.ReactElement {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          key="font-roboto"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
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
