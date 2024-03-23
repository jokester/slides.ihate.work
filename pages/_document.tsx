import React from 'react';
import Document, { Html, Main, NextScript, Head } from 'next/document';

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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
