import React from 'react';
import App, { AppProps } from 'next/app';
import '../src/app.scss';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import { useRevealPreload } from '../src/player/use-reveal-preload';
import { ThemeProvider } from '@mui/material';
import { globalTheme } from '../src/layouts/theme';

const CustomApp: React.FC<AppProps> & Partial<Pick<typeof App, 'getInitialProps'>> = (props) => {
  useRevealPreload();
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta
          key="meta-viewport"
          name="viewport"
          content="width=device-width, initial-scale=1,maximum-scale=3,minimum-scale=1"
        />
      </Head>
      <DefaultMeta />
      <ThemeProvider theme={globalTheme}>
        <SnackbarProvider />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

// CustomApp.getInitialProps = App.getInitialProps;

export default CustomApp;
