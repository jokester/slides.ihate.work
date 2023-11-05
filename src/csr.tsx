/**
 * @file Entry point for client-side rendering.
 */
import { App } from './app';
import { hydrate } from 'preact';

hydrate(<App />, document.getElementById('root') as HTMLDivElement);
