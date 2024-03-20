import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MarkdownHelp, PageContainer, PageFooter, PageHeader } from '../src/layouts';
import { ExternalSourceInput } from '../src/components/external-src-input';
import debug from 'debug';
import { rewriteUrlToRoute } from '../src/routes/url-rewrite';
import Link from 'next/link';
import { Button } from '@mui/material';

const logger = debug('pages:index');

function IndexPageContent() {
  const router = useRouter();
  const onSourceUrlSubmit = (url: string) => {
    const nextPath = rewriteUrlToRoute(url);
    if (nextPath instanceof Error) {
      alert(nextPath.message);
    } else if (nextPath) {
      router.push(nextPath);
    }
  };
  return (
    <PageContainer>
      <PageHeader />

      <div>
        <ExternalSourceInput onSubmit={onSourceUrlSubmit} />
      </div>
      <p className="my-8 text-center">or</p>
      <div className="text-center">
        <Link href={'/markdown'}>
          <Button variant="outlined">Paste markdown text or file</Button>
        </Link>
      </div>
      <div className="flex-1" />
      <MarkdownHelp />
      <PageFooter />
    </PageContainer>
  );
}

const IndexPage: NextPage = (props) => {
  return <IndexPageContent />;
};

// IndexPage.getInitialProps = async ctx => ({});

export default IndexPage;
