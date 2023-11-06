import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { Bindings } from './bindings';
import { etag } from 'hono/etag';
import { cache } from 'hono/cache';
import { serveStatic } from 'hono/cloudflare-workers';
import { ssrStatic } from './src/ssr';
import { Html } from './src/pages/_document';
import { jsLinks, revealCodeThemes, revealThemes } from './src/pages/cdn_assets';
import { MarkdownPage } from './src/pages/markdown';

const app = new Hono<{ Bindings: Bindings }>({});
app.use('/*', logger());
app.get(
  '/static/*',
  etag({}),
  cache({
    cacheName: 'static',
    cacheControl: 'public, max-age=300, must-revalidate',
  }),
  serveStatic({ root: /* relative to bucket in wrangler.toml */ '.' }),
);

app.get('/', async (c, next) => {
  return c.redirect('/markdown', 302);
});

app.get(
  '/markdown',
  ssrStatic(
    <Html
      title="slides.ihate.work"
      header={
        <>
          {revealThemes.reset}
          {revealThemes.base}
          {revealThemes.simple}
          {revealCodeThemes.docco}
          {jsLinks.markdown}
          {jsLinks.csr}
        </>
      }
    >
      <MarkdownPage />
    </Html>,
  ),
);

export default app;
