import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MarkdownHelp, PageContainer, CreditsFooter, PageHeader } from '../src/layouts';
import { ExternalSourceInput } from '../src/components/external-src-input';
import debug from 'debug';
import { rewriteUrlToRoute } from '../src/routes/url-rewrite';
import Link from 'next/link';
import { Box, Button, Divider, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const logger = debug('pages:index');

function IndexPageContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('0');
  const onSourceUrlSubmit = (url: string) => {
    const nextPath = rewriteUrlToRoute(url);
    logger('onSourceUrlSubmit', url, nextPath);
    if (nextPath instanceof Error) {
      alert(nextPath.message);
    } else if (nextPath) {
      router.push(nextPath);
    } else {
      router.push(`/markdown?markdownUrl=${encodeURIComponent(url)}`);
    }
  };

  const openTabContent = (
    <>
      <div className="space-y-1">
        <ExternalSourceInput onSubmit={onSourceUrlSubmit} />
      </div>
    </>
  );

  return (
    <PageContainer>
      <PageHeader />

      <span className="flex-1" />
      <div className="shrink-0 h-64">
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_ev, newValue) => setActiveTab(newValue)}>
              <Tab label="Open URL" value="0" />
              <Tab label="Open local file" value="1" />
              <Tab label="Input text" value="2"></Tab>
            </TabList>
          </Box>
          <TabPanel value="0">{openTabContent}</TabPanel>
          <TabPanel value="1">
            <Link href={'/markdown'}>
              <Button variant="outlined">Open local file</Button>
            </Link>
          </TabPanel>
          <TabPanel value="2" className="space-x-2">
            <Link href={'/markdown'}>
              <Button variant="outlined">Input Text</Button>
            </Link>
            &nbsp; or
            <Link href={'/markdown?markdownUrl=example'}>
              <Button variant="outlined">Load Example Text</Button>
            </Link>
          </TabPanel>
        </TabContext>
      </div>
      <span className="flex-1" />
      <span className="flex-1" />
      <Divider className="mt-12 mb-4" />
      <CreditsFooter />
    </PageContainer>
  );
}

const IndexPage: NextPage = (props) => {
  return <IndexPageContent />;
};

// IndexPage.getInitialProps = async ctx => ({});

export default IndexPage;
