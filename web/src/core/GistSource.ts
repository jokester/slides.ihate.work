import { Octokit } from '@octokit/rest';
import { SlideBundle } from './SlideBundle';
import { SourceError } from './errors';
import { InternalUrlProvider } from './internal-url-provider';

export interface GistSourceLocator {
  rawUrl: URL;
  ownerId: string;
  gistId: string;
  revisionId?: string;
  filename?: string;
}

export function buildGistSource(url: URL): GistSource | null {
  const l = parseGistUrl(url);
  return l && new GistSource(l);
}

export function parseGistUrl(u: URL): GistSourceLocator | null {
  const parts = u.pathname.split('/');
  const [_empty, ownerId, gistId, ...rest] = parts;
  if (!(ownerId && gistId?.length === 32)) {
    return null;
  }
  if (rest.length === 3 && rest[0] === 'raw') {
    // a raw file like
    // https://gist.githubusercontent.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/raw/4676f49e32f95fd76549ce4f7330f0f7aa4662b3/0-rancher-zerotier-k3s-deployment.md
    return {
      rawUrl: u,
      ownerId,
      gistId,
      revisionId: rest[1],
      filename: rest[2],
    };
  }

  if (rest.length === 1) {
    // a gist like
    // https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8
    return {
      rawUrl: u,
      ownerId,
      gistId,
      revisionId: rest[0],
    };
  }

  if (!rest.length) {
    // a gist revision like:
    // https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/4676f49e32f95fd76549ce4f7330f0f7aa4662b3
    return {
      rawUrl: u,
      ownerId,
      gistId,
    };
  }
  return null;
}

export class GistSource implements InternalUrlProvider {
  readonly locator: Readonly<GistSourceLocator>;
  constructor(
    locator: string | URL | GistSourceLocator,
    private readonly client = new Octokit(),
  ) {
    if (typeof locator === 'string') {
      this.locator = parseGistUrl(new URL(locator))!;
    } else if (locator instanceof URL) {
      this.locator = parseGistUrl(locator)!;
    } else {
      this.locator = locator;
    }
    if (!this.locator) {
      throw new Error(`invalid github URL`);
    }
  }

  get fetchKey(): string {
    return `gistUrl=${this.locator.rawUrl}`;
  }

  asInternalPageUrl(): string {
    const { rawUrl } = this.locator;
    return `/gist${rawUrl.pathname}`;
  }

  asUpstreamUrl(): string {
    return this.locator.rawUrl.toString();
  }

  /**
   * @return a asset bundle fetched from GitHub
   */
  async fetchSource(): Promise<SlideBundle> {
    const res = await this.client.rest.gists.get({
      gist_id: this.locator.gistId,
    });

    const files = Object.values(res.data.files || {});
    const mds = files.filter((file) => file?.filename?.toLowerCase().endsWith('.md'));
    if (!mds.length) {
      throw new SourceError('no markdown file found in gist');
    }
    if (mds.length > 1) {
      throw new SourceError('multiple markdown files found in gist');
    }

    const [mdFile] = mds;

    // TODO: fetch assets (most likely to be images) from gist files or gist comments?
    return {
      slideText: mdFile?.content ?? '',
      gistSource: this,
    };
  }
}
