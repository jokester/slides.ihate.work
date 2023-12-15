import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const IndexPage: NextPage = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      router.replace('/markdown');
    }
  }, [router.isReady]);

  return <div>redirecting you...</div>;
};

// IndexPage.getInitialProps = async ctx => ({});

export default IndexPage;
