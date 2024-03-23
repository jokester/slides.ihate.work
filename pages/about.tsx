import { ExampleLinks } from '../src/dummy/example-links';
import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { OnlyInBrowser } from '../src/components/OnlyInBrowser';
/**
 *
 */
interface PageProps {
  renderedAt: number;
  renderedBy: string;
}

const AboutPage: NextPage<PageProps> = (props) => {
  const query = useRouter().query;
  return (
    <>
      <h2>AboutPage in {__filename}</h2>
      {/*<PreJson value={props} />*/}
      {/*<PreJson value={query} />*/}
      <OnlyInBrowser>
        <ExampleLinks />
      </OnlyInBrowser>
    </>
  );
};

export const runtime = 'experimental-edge';

// @ts-ignore
AboutPage.DISABLED_getInitialProps = async (ctx) => ({
  renderedAt: 0 && Date.now(),
  renderedBy: ctx.req ? 'server' : 'browser',
});

export default AboutPage;
