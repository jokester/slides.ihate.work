import { Octokit } from '@octokit/rest';
import { SourceBundle } from './SourceBundle';
import { SourceError } from './errors';

interface GistSourceLocator {
  ownerId: string;
  gistId: string;
  revisionId?: string;
}

export class GistSource {
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
  ) {}

  get fetchKey(): string {
    return `gistId=${this.gistUrl}`;
  }

  get pageUrl(): string | null {
    const parsed = this.parseUrl();
    if (!parsed) {
      return null;
    }

    return `https://gist.github.com/${parsed.ownerId}/${parsed.gistId}`;
  }

  parseUrl(): GistSourceLocator | null {
    const u = new URL(this.gistUrl);
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

  /**
   * @return a asset bundle fetched from github
   */
  async fetchSource(): Promise<SourceBundle> {
    const res = await this.client.rest.gists.get({
      gist_id: this.parseUrl()!.gistId,
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
    };
  }
}
