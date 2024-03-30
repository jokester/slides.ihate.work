import { rewriteUrlToRoute } from './url-rewrite';

describe(rewriteUrlToRoute.name, () => {
  it('recognized gist page url', () => {
    expect(rewriteUrlToRoute('https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8')).toEqual(
      `/gist/jokester/2ae304016d8c25b09a68a9221f6c07c8`,
    );
  });
});
