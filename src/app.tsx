import Router from 'preact-router';
import { IndexPage } from './pages';
import { FunctionComponent, VNode } from 'preact';

export const App: FunctionComponent = ({ path }: { path?: string }) => {
  return (
    <Router url={path}>
      {/* @ts-ignore */}
      <IndexPage path="/" />
    </Router>
  ) as VNode;
};
