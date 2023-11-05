import Router from 'preact-router';
import { IndexPage } from './pages';
import { type VNode } from 'preact';

export const App = ({ path }: { path?: string }) => {
  return (
    <Router url={path}>
      {/* @ts-ignore */}
      <IndexPage path="/" />
      {/*<NotFoundPage default />*/}
    </Router>
  ) as VNode;
};
