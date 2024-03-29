import React from 'react';
import App, { AppProps } from 'next/app';
import '../src/app.scss';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import { useRevealPreload } from '../src/player/use-reveal-preload';

const CustomApp: React.FC<AppProps> & Partial<Pick<typeof App, 'getInitialProps'>> = (props) => {
  useRevealPreload();
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta
          key="meta-viewport"
          name="viewport"
          content="width=device-width, initial-scale=1,maximum-scale=1.5,minimum-scale=1"
        />
      </Head>
      <DefaultMeta />
      <SnackbarProvider />
      <Component {...pageProps} />
    </>
  );
};

// CustomApp.getInitialProps = App.getInitialProps;

export default CustomApp;
