import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageContainer, PageHeader } from '../src/layouts';
import { ExternalSourceInput } from '../src/components/external-src-input';
import debug from 'debug';
import { SlideBundle } from '../src/core/SlideBundle';
import { rewriteSrcToRoute } from '../src/routes/url-rewrite';
import Link from 'next/link';
import { Button } from '@mui/material';

const logger = debug('pages:index');

function IndexPageContent() {
  const router = useRouter();
  const onSrcLoaded = (b: SlideBundle) => {
    logger('onSrcLoaded', b);
    const newRoute = rewriteSrcToRoute(b);
    if (!newRoute) {
      alert('unsupported source');
    } else if (newRoute instanceof Error) {
      alert(newRoute.message);
    } else {
      router.push(newRoute);
    }
  };
  return (
    <PageContainer>
      <PageHeader />

      <div>
        <ExternalSourceInput onLoad={onSrcLoaded} />
      </div>
      <p className="my-8 text-center">or</p>
      <div className="text-center">
        <Link href={'/markdown'}>
          <Button variant="outlined">Paste markdown text</Button>
        </Link>
      </div>
    </PageContainer>
  );
}

const IndexPage: NextPage = (props) => {
  return <IndexPageContent />;
};

// IndexPage.getInitialProps = async ctx => ({});

export default IndexPage;
