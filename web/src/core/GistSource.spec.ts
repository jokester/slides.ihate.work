import { parseGistUrl } from './GistSource';

describe('GistSource', () => {
  describe('parseGistUrl', () => {
    it('should parse gist url', () => {
      for (const url of []) {
        const parsed = parseGistUrl(new URL(url));
        expect(parsed).toBeTruthy();
      }
    });
  });
});
