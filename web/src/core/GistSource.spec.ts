import { parseGistUrl } from './GistSource';

describe('GistSource', () => {
  describe('parseGistUrl', () => {
    it('should parse gist url', () => {
      for (const url of [
        'https://gist.githubusercontent.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/raw/4676f49e32f95fd76549ce4f7330f0f7aa4662b3/0-rancher-zerotier-k3s-deployment.md',
        'https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8',
        'https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8/4676f49e32f95fd76549ce4f7330f0f7aa4662b3',
      ]) {
        const parsed = parseGistUrl(new URL(url));
        expect(parsed).toBeTruthy();
        expect(parsed).toMatchSnapshot(`parseGistUrl(${url})`);
      }
    });
  });
});
