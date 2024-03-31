import * as React from 'react';
import { NextPage } from 'next';
import { MarkdownHelp, PageContainer, CreditsFooter, PageHeader } from '../src/layouts';
import { globalStyles } from '../src/layouts/theme';

function RevealjsHelp() {
  return (
    <div id="revealjs-help" className="px-4">
      <h2 className="text-lg">About Markdown and Slide Syntax</h2>
      <MarkdownHelp />
    </div>
  );
}

function UsefulTools() {
  return (
    <div className="px-4">
      <h2 className="text-lg">Other useful Markdown + Slide tools</h2>
      <ul className="space-y-2 my-2">
        <li>
          vscode-reveal, to preview Markdown slides in VSCode:&nbsp;
          <br />
          <a className={globalStyles.linkText} href="">
            VSCode Marketplace
          </a>
          {' / '}
          <a className={globalStyles.linkText} href="https://github.com/evilz/vscode-reveal">
            gh/evilz/vscode-reveal
          </a>
        </li>
        <li>
          GistPad, to manage Gist slides in VSCode:&nbsp;
          <br />
          <a
            className={globalStyles.linkText}
            href="https://marketplace.visualstudio.com/items?itemName=vsls-contrib.gistfs"
          >
            VSCode Marketplace
          </a>
          {' / '}
          <a className={globalStyles.linkText} href="https://github.com/lostintangent/gistpad"></a>
        </li>
      </ul>
    </div>
  );
}

const AboutPage: NextPage = (props) => {
  return (
    <PageContainer>
      <PageHeader />
      <RevealjsHelp />
      <hr className="my-4" />
      <UsefulTools />
      <hr className="my-4" />
      <span className="flex-1" />
      <hr className="my-4" />
      <CreditsFooter />
    </PageContainer>
  );
};

// export const runtime = 'experimental-edge';

export default AboutPage;
