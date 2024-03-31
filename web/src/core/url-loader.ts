import { parseGistUrl } from './GistSource';

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
