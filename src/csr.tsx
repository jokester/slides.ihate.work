/**
 * @file Entry point for client-side rendering.
 */
import { App } from './app';
import { hydrate } from 'preact';

import { allComponents, provideFluentDesignSystem } from '@fluentui/web-components';
provideFluentDesignSystem().register(allComponents);

hydrate(<App />, document.getElementById('root') as HTMLDivElement);
