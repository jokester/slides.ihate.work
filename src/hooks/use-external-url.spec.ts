import { buildInternalRedirectDest } from './use-external-url';

describe(buildInternalRedirectDest.name, () => {
  it('recognized gist page url', () => {
    expect(buildInternalRedirectDest('https://gist.github.com/jokester/2ae304016d8c25b09a68a9221f6c07c8')).toEqual(
      `/gist/jokester/2ae304016d8c25b09a68a9221f6c07c8`,
    );
  });
});
