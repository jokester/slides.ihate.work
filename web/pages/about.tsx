import * as React from 'react';
import { NextPage } from 'next';
import { MarkdownHelp, PageContainer, CreditsFooter, PageHeader } from '../src/layouts';

function RevealjsHelp() {
  return (
    <div id="revealjs-help">
      <MarkdownHelp />
    </div>
  );
}

const AboutPage: NextPage = (props) => {
  return (
    <PageContainer>
      <PageHeader />
      <RevealjsHelp />
      <span className="flex-1" />
      <hr className="my-4" />
      <CreditsFooter />
    </PageContainer>
  );
};

// export const runtime = 'experimental-edge';

export default AboutPage;
