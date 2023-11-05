/**
 * @file Entry point for client-side rendering.
 */
import { App } from './app';
import { hydrate } from 'preact';

console.debug('would hydrate', <App />, document.body);
hydrate(<App />, document.body);
