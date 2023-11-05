import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { Bindings } from './bindings';
import { serveStatic } from 'hono/cloudflare-workers';
import { ssr } from './src/ssr';
import { App } from './src/app';
import { NotFoundPage } from './src/pages/not-found';

const app = new Hono<{ Bindings: Bindings }>({});
app.use('/*', logger());
app.get('/static/*', serveStatic({ root: /* relative to bucket in wrangler.toml */ '.' }));

app.get(
  '/*',
  ssr(App, {
    indexPath: '_templates/index.html',
    notFound: NotFoundPage,
  }),
);

export default app;
