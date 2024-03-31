import { Route } from 'next';
import { buildGistSource } from '../core/GistSource';

/**
 * For source URLs we have dedicated support, redirect to appropriate page route
 */
export function rewriteUrlToRoute(url: string): null | Route | Error {
  let u;
  try {
    u = new URL(url);
  } catch (e) {
    return e as Error;
  }

  return buildGistSource(u)?.asInternalPageUrl() ?? null;
}
