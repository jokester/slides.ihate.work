import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { Bindings } from './bindings';
import { serveStatic } from 'hono/cloudflare-workers';
import { ssr } from 'preact-ssr/src/ssr/middleware';
import { App } from './src/app';

const app = new Hono<{ Bindings: Bindings }>({});
app.use('*', logger());
app.get('/static/*', serveStatic({ root: /* relative to bucket in wrangler.toml */ '.' }));

app.get(
  '/*',
  // @ts-ignore
  ssr(App, {
    indexPath: '_templates/index.html',
  }),
);

export default app;
