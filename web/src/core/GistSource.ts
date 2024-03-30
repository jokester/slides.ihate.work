import { Octokit } from '@octokit/rest';
import { SlideBundle } from './SlideBundle';
import { SourceError } from './errors';
import { isUrl } from './url-loader';

interface GistSourceLocator {
  ownerId: string;
  gistId: string;
  revisionId?: string;
}

function parseUrl(u: URL): GistSourceLocator | null {
  const parts = u.pathname.split('/');
  const [_empty, ownerId, gistId, revisionId, ...rest] = parts;
  if (gistId?.length === 32 && !revisionId) {
    return {
      ownerId,
      gistId,
    };
  }
  // TODO: support more patterns
  return null;
}

export class GistSource {
  static isGistUrl(url: string): boolean {
    return isUrl(url) && !!parseUrl(new URL(url));
  }

  readonly locator: Readonly<GistSourceLocator>;

  /**
   * @param gistUrl like:
   * - https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8
   * => page: gist
   * - https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/4676f49e32f95fd76549ce4f7330f0f7aa4662b3
   * => page: gist revision
   * - https://gist.githubusercontent.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/raw/4676f49e32f95fd76549ce4f7330f0f7aa4662b3/0-rancher-zerotier-k3s-deployment.md
   * => an raw file
   * @param client
   */
  constructor(
    readonly gistUrl: string,
    private readonly client = new Octokit(),
  ) {
    this.locator = parseUrl(new URL(gistUrl))!;
  }

  get fetchKey(): string {
    return `gistId=${this.gistUrl}`;
  }

  get pageUrl(): string {
    const parsed = this.locator;

    return `https://gist.github.com/${parsed.ownerId}/${parsed.gistId}`;
  }

  /**
   * @return a asset bundle fetched from github
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
