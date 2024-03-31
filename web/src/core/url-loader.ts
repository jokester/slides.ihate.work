import { SlideBundle } from './SlideBundle';
import { GistSource, parseGistUrl } from './GistSource';
import { FetchTextSource } from './FetchTextSource';

export function isUrl(u: unknown): u is string {
  return typeof u === 'string' && URL.canParse(u);
}

type SourceType = 'gist' | 'unknown' | 'invalid';

export function detectSourceUrlType(url: unknown): SourceType {
  if (!isUrl(url)) {
    return 'invalid';
  }
  if (parseGistUrl(new URL(url))) {
    return 'gist';
  }
  return 'unknown';
}

export async function loadExternalSourceUrl(url: string): Promise<SlideBundle> {
  if (!isUrl(url)) {
    throw new Error('Invalid URL');
  }
  if (parseGistUrl(new URL(url))) {
    const src = new GistSource(url);
    return await src.fetchSource();
  }

  // fallback: assuming the URL is a CORS-capable markdown file
  const res = await fetch(url).then((res) => res.text());
  return {
    slideText: res,
    fetchTextSource: new FetchTextSource(url),
  };
}
