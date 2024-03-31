import { Route } from 'next';
import { parseGistUrl, buildGistSource } from '../core/GistSource';

/**
 * For source URLs we have dedicated support, redirect to appropriate page route
 */
export function rewriteUrlToRoute(url: string): null | Route | Error {
  let u, t;

  try {
    u = new URL(url);
  } catch (e) {
    return e as Error;
  }

  if ((t = parseGistUrl(u))) {
    return buildGistSource(u)!.asInternalPageUrl();
  }
  return null;
}
