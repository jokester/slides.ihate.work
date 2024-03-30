import React from 'react';
import Head from 'next/head';

export const DefaultMeta: React.FC<{ title?: string }> = (props) => {
  return (
    <Head>
      <title key="head-title">{props.title ?? 'slides.ihate.work'}</title>
    </Head>
  );
};
