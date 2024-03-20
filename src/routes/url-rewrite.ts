import { Route } from 'next';
import { GistSource } from '../core/GistSource';
import { SlideBundle } from '../core/SlideBundle';
import { FetchTextSource } from '../core/FetchTextSource';
import { isUrl } from '../core/url-loader';

/**
 * For source URLs we have dedicated support, redirect to appropriate page route
 */
export function rewriteUrlToRoute(url: string): null | Route | Error {
  if (!isUrl(url)) {
    return new Error('Invalid URL');
  }
  if (GistSource.isGistUrl(url)) {
    const parsed = new GistSource(url).locator;
    if (parsed?.gistId && !parsed?.revisionId) {
      return `/gist/${parsed.ownerId}/${parsed.gistId}`;
    }
  }
  return null;
}

export function rewriteSrcToRoute(s: SlideBundle): null | Route | Error {
  if (s.gistSource instanceof GistSource) {
    return `/gist/${s.gistSource.locator.ownerId}/${s.gistSource.locator.gistId}`;
  }
  if (s.fetchTextSource instanceof FetchTextSource) {
    return `/markdown?markdownUrl=${encodeURIComponent(s.fetchTextSource.url)}`;
  }
  return new Error(`unknown source type: ${JSON.stringify(s)}`);
}
