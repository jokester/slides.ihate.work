/**
 * SPA entrypoint for CSR + SSR
 */
import Router from 'preact-router';
import { IndexPage } from './pages';
import { type VNode } from 'preact';
import { MarkdownPage } from './pages/markdown';
import { AboutPage } from './pages/about';

export const App = ({ path }: { path?: string }) => {
  // should match server routes in hono-server.tsx
  return (
    <Router url={path}>
      {/* @ts-ignore */}
      <IndexPage path="/" />
      {/* @ts-ignore */}
      <MarkdownPage path="/markdown" />
      {/* @ts-ignore */}
      <AboutPage path="/about" />
      {/*<NotFoundPage default />*/}
    </Router>
  ) as VNode;
};
