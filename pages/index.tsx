import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageContainer, PageHeader } from '../src/layouts';
import { ExternalSourceInput } from '../src/components/external-src-input';
import debug from 'debug';

const logger = debug('pages:index');

function IndexPageContent() {
  return (
    <PageContainer>
      <PageHeader />

      <div>
        <ExternalSourceInput onSubmit={(v) => logger(v)} />
      </div>
    </PageContainer>
  );
}

const IndexPage: NextPage = (props) => {
  return <IndexPageContent />;
};

// IndexPage.getInitialProps = async ctx => ({});

export default IndexPage;
