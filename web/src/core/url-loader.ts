import { SlideBundle } from './SlideBundle';
import { GistSource } from './GistSource';
import { FetchTextSource } from './FetchTextSource';

export function isUrl(u: unknown): u is string {
  try {
    new URL(u as string);
    return true;
  } catch {
    return false;
  }
}

type SourceType = 'gist' | 'unknown' | null;

export function detectSourceUrlType(url: unknown): SourceType {
  if (!isUrl(url)) {
    return null;
  }
  if (GistSource.isGistUrl(url)) {
    return 'gist';
  }
  return 'unknown';
}

export async function loadExternalSourceUrl(url: string): Promise<SlideBundle> {
  if (!isUrl(url)) {
    throw new Error('Invalid URL');
  }
  if (GistSource.isGistUrl(url)) {
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
